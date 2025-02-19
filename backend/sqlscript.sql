DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
    aid SERIAL PRIMARY KEY,
    aname VARCHAR(100) NOT NULL,
    atype VARCHAR(50) NOT NULL,
    balance DECIMAL(12,2) NOT NULL DEFAULT 0.00
);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category (
    cid SERIAL PRIMARY KEY,
    cname VARCHAR(100) UNIQUE NOT NULL,
    ctype VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS pointrule CASCADE;
CREATE TABLE pointrule (
    aid INT NOT NULL,
    cid INT NOT NULL,
    pointsPerDollar DECIMAL(5,2) NOT NULL DEFAULT 1.0,
	primary key (aid, cid),
    FOREIGN KEY (aid) REFERENCES account(aid) ON DELETE CASCADE,
    FOREIGN KEY (cid) REFERENCES category(cid) ON DELETE CASCADE
);

DROP TABLE IF EXISTS transaction CASCADE;
CREATE TABLE transaction (
    tid SERIAL PRIMARY KEY,
    aid INT NOT NULL,
    cid INT NOT NULL,
    tdate DATE NOT NULL DEFAULT CURRENT_DATE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    description TEXT,
    pointsEarned DECIMAL(12,2) DEFAULT 0,
	isShared BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (aid) REFERENCES account(aid) ON DELETE CASCADE,
    FOREIGN KEY (cid) REFERENCES category(cid) ON DELETE CASCADE
);

DROP TABLE IF EXISTS debt CASCADE;
CREATE TABLE debt (
    tid INT NOT NULL,
    borrowerName VARCHAR(100) NOT NULL,
    amountOwed DECIMAL(12,2) NOT NULL,
    amountRepaid DECIMAL(12,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (tid, borrowerName),
    FOREIGN KEY (tid) REFERENCES transaction(tid) ON DELETE CASCADE
);

drop table if exists payment CASCADE;
CREATE TABLE payment (
    pid SERIAL PRIMARY KEY,
    aidFrom INT NOT NULL,
    aidTo INT NOT NULL,
    pdate DATE NOT NULL DEFAULT CURRENT_DATE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    FOREIGN KEY (aidFrom) REFERENCES account(aid) ON DELETE CASCADE,
    FOREIGN KEY (aidTo) REFERENCES account(aid) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION updateBalance_insert()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE account SET balance = balance + NEW.amount WHERE aid = NEW.aid;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateBalance_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.aid <> NEW.aid THEN
        UPDATE account SET balance = balance - OLD.amount WHERE aid = OLD.aid;
        UPDATE account SET balance = balance + NEW.amount WHERE aid = NEW.aid;
    ELSE
        UPDATE account SET balance = balance + (NEW.amount - OLD.amount) WHERE aid = OLD.aid;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculatePoints()
RETURNS TRIGGER AS $$
DECLARE
    rate DECIMAL(5,2);
BEGIN
    SELECT pointsPerDollar INTO rate 
    FROM pointrule 
    WHERE cid = NEW.cid AND aid = NEW.aid
    LIMIT 1;

    IF rate IS NOT NULL THEN
        NEW.pointsEarned := NEW.amount * rate;
    ELSE
        NEW.pointsEarned := NEW.amount;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION moneyTransfer_insert()
RETURNS TRIGGER AS $$
DECLARE
    to_account_type VARCHAR(50);
BEGIN
    UPDATE account 
    SET balance = balance - NEW.amount 
    WHERE aid = NEW.aidFrom;

    SELECT atype INTO to_account_type 
    FROM account 
    WHERE aid = NEW.aidTo;

    IF to_account_type = 'Credit Card' THEN
        UPDATE account
        SET balance = balance - NEW.amount
        WHERE aid = NEW.aidTo;
    ELSE
        UPDATE account
        SET balance = balance + NEW.amount
        WHERE aid = NEW.aidTo;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION moneyTransfer_update()
RETURNS TRIGGER AS $$
DECLARE
    to_account_type VARCHAR(50);
BEGIN
    UPDATE account 
    SET balance = balance + old.amount - NEW.amount 
    WHERE aid = NEW.aidFrom;

    SELECT atype INTO to_account_type 
    FROM account 
    WHERE aid = NEW.aidTo;

    IF to_account_type = 'Credit Card' THEN
        UPDATE account
        SET balance = balance + old.amount - NEW.amount
        WHERE aid = NEW.aidTo;
    ELSE
        UPDATE account
        SET balance = balance - old.amount + NEW.amount
        WHERE aid = NEW.aidTo;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION balanceIncrease_insert()
RETURNS TRIGGER AS $$
DECLARE
    repaid_amount DECIMAL(12,2);
BEGIN
    SELECT amountRepaid INTO repaid_amount 
    FROM debt 
    WHERE tid = NEW.tid AND borrowerName = NEW.borrowerName
    LIMIT 1;

    UPDATE account 
    SET balance = balance + repaid_amount
    WHERE aid = 6;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION balanceIncrease_update()
RETURNS TRIGGER AS $$
DECLARE
    old_repaid DECIMAL(12,2);
    new_repaid DECIMAL(12,2);
BEGIN
    -- Store the old and new repaid amounts
    old_repaid := OLD.amountRepaid;
    new_repaid := NEW.amountRepaid;

    -- First, subtract the old amountRepaid from the account balance
    UPDATE account 
    SET balance = balance - old_repaid + new_repaid
    WHERE aid = 6;

    RETURN NULL;  -- No need to return NEW in an AFTER trigger
END;
$$ LANGUAGE plpgsql;

drop trigger if exists trigger_updatebalance_insert on transaction;
create trigger trigger_updateBalance_insert
after insert on transaction
for each row
execute function updateBalance_insert();

drop trigger if exists trigger_updatebalance_update on transaction;
create trigger trigger_updateBalance_update
AFTER UPDATE OF amount, aid ON transaction
FOR EACH ROW
EXECUTE FUNCTION updateBalance_update();

drop trigger if exists trigger_calculatePoints on transaction;
CREATE TRIGGER trigger_calculatePoints
BEFORE INSERT OR UPDATE OF amount, cid, aid ON transaction
FOR EACH ROW
EXECUTE FUNCTION calculatePoints();

drop trigger if exists trigger_moneyTransfer_insert on payment;
create trigger trigger_moneyTransfer_insert
after insert on payment
for each row
execute function moneyTransfer_insert();

drop trigger if exists trigger_moneyTransfer_update on payment;
create trigger trigger_moneyTransfer_update
after update on payment
for each row
execute function moneyTransfer_update();

drop trigger if exists trigger_balanceIncrease_insert on debt;
create trigger trigger_balanceIncrease_insert
after insert on debt
for each row
execute function balanceIncrease_insert();

drop trigger if exists trigger_balanceIncrease_update on debt;
create trigger trigger_balanceIncrease_update
after update on debt
for each row
execute function balanceIncrease_update();

INSERT INTO account (aname, atype, balance) VALUES
('Chase Freedom Unlimited', 'Credit Card', 0.00),
('Chase Sapphire Reserve', 'Credit Card', 0.00),
('Chase Freedom Flex', 'Credit Card', 0.00),
('Bilt Mastercard', 'Credit Card', 0.00),
('American Express Blue Cash Everyday', 'Credit Card', 0.00),
('Chase Bank', 'Bank Account', 2000.00);

INSERT INTO category (cname, ctype) VALUES
('Automotive', 'Expense'),
('Bills & utilities', 'Expense'),
('Education', 'Expense'),
('Entertainment', 'Expense'),
('Fees & adjustments', 'Expense'),
('Food & drink', 'Expense'),
('Gas', 'Expense'),
('Gifts & donations', 'Expense'),
('Groceries', 'Expense'),
('Health & wellness', 'Expense'),
('Home', 'Expense'),
('Miscellaneous', 'Expense'),
('Personal', 'Expense'),
('Professional Services', 'Expense'),
('Shopping', 'Expense'),
('Travel', 'Expense');

INSERT INTO pointrule (aid, cid, pointsPerDollar) VALUES
(1, 1, 1.5),
(1, 2, 1.5),
(1, 3, 1.5),
(1, 4, 1.5),
(1, 5, 1.5),
(1, 6, 3.0),
(1, 7, 1.5),
(1, 8, 1.5),
(1, 9, 1.5),
(1, 10, 1.5),
(1, 11, 1.5),
(1, 12, 1.5),
(1, 13, 1.5),
(1, 14, 1.5),
(1, 15, 1.5),
(1, 16, 1.5),
(2, 6, 3.0),
(2, 16, 3.0),
(5, 7, 3.0),
(5, 9, 3.0),
(5, 15, 3.0);

insert into transaction (aid, cid, tdate, amount, description, isShared) values
(1, 2, '2025-02-01', 30, 'Zentro', FALSE),
(1, 2, '2025-02-01', 25.51, 'ComEd', FALSE),
(1, 6, '2025-02-01', 14.75, 'Taco Bell', TRUE),
(4, 2, '2025-02-01', 1221, 'Rent', FALSE),
(2, 6, '2025-02-02', 21.62, 'Doordash', TRUE),

insert into debt (tid, borrowername, amountowed, amountrepaid)
values
(3, 'Giridhar Patri', 3.47, 3.50),
(3, 'Naveen Bagchi', 8.03, 8.03);

insert into payment (aidFrom, aidTo, pdate, amount)
values
(6, 4, '2025-02-03', 1221.00);