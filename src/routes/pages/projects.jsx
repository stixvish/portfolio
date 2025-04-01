import styles from '../styles/projects.module.scss';
import { useEffect, useState } from 'react';

export default function Projects() {

	const [accounts, setAccounts] = useState([])

	useEffect(() => {
		fetch('http://localhost:8000/api/accounts/')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not OK')
				}
				return response.json()
			})
			.then(data => {
				setAccounts(data)
			})
			.catch(error => {
				console.error("There was a problem with the fetch operation:", error);
			})
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.trisection}>

			</div>
			<div className={styles.trisection}>

			</div>
			<div className={styles.trisection}>
				<div className={styles.graph}>
					
				</div>
				<div className={styles.transactions}>
					<div className={styles.headers}>
						<h3>description</h3>
						<h3>amount</h3>
					</div>
					<div className={styles.content}>
						{accounts.map(account => (
							<div key={account.aid} className={styles.row}>
								<p>{account.aname}</p>
								<p>{account.balance}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
