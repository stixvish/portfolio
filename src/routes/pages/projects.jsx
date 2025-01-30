import styles from '../styles/projects.module.scss';
import { useEffect, useState } from 'react';

export default function Projects() {

	const [transactions, setTransactions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [balances, setBalances] = useState([]);

	const itemsPerPage = 6;
	const [currentPage, setCurrentPage] = useState(0);

	const colors = [
		"red", "orange", "yellow", "green",
		"blue", "indigo", "violet", "cyan",
		"magenta", "lime", "teal", "pink",
		"brown", "black", "gray", "white"
	];

    useEffect(() => {
        fetch('http://localhost:8000/api/transactions/')
			.then(response => response.json())
			.then((data) => {
				setTransactions(data.reverse());
			})
			.catch(error => console.error('Error:', error));
		fetch('http://localhost:8000/api/category-spending/')
			.then(response => response.json())
			.then((data) => {
				setCategories(data);
			})
			.catch(error => console.error('Error:', error));
    }, []);

	useEffect(() => {
        console.log('Categories:', categories);
        console.log('Transactions:', transactions);
		console.log(categories.reduce((sum, item) => sum + item.total, 0))
    }, [categories, transactions]);

	const totalPages = Math.ceil(transactions.length / itemsPerPage);

	const generatePieSlices = () => {
		const totalSpending = categories.reduce((sum, category) => sum + category.total, 0);
		let startAngle = 0;
		const radius = 20;

		return categories.map((category, index) => {
			const percentage = category.total / totalSpending;
			const angle = percentage * 360;
			const endAngle = startAngle + angle;

			// Convert angles to radians
			const startRad = (Math.PI / 180) * startAngle;
			const endRad = (Math.PI / 180) * endAngle;

			// Calculate start and end points
			const x1 = radius * Math.cos(startRad);
			const y1 = radius * Math.sin(startRad);
			const x2 = radius * Math.cos(endRad);
			const y2 = radius * Math.sin(endRad);

			// Determine if the arc should be large (over 180 degrees)
			const largeArc = angle > 180 ? 1 : 0;

			// Construct SVG path
			const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L 0 0`;

			const fillColor = colors[index % colors.length];

			// Update startAngle for the next segment
			startAngle = endAngle;

			return <path key={category.id} d={pathData} fill={fillColor} />;
		});
	};

	return (
		<div className={styles.main}>
			<div className={styles['top-container']}>
				<h1 className={styles.liabilities}>Total Liabilities: $</h1>
			</div>
			<div className={styles['middle-container']}>
				<div className={styles['middle-left']}>
					<svg viewBox="-25 -25 50 50" style={{backgroundColor: "#1d1d1d"}}>
						{generatePieSlices()}
						<circle cx="0" cy="0" r="15" fill="#1d1d1d" />
					</svg>
				</div>
				<div className={styles['middle-right']}>
					<div className={styles.transaction}>
						<h3>Date</h3>
						<h3 className={styles.desc}>Description</h3>
						<h3>Amount</h3>
						<h3>Category</h3>
						<h3>Lent</h3>
						<h3>Repaid</h3>
						<h3>Card</h3>
					</div>
					{transactions.slice((currentPage * itemsPerPage), (currentPage * itemsPerPage + itemsPerPage)).map((row) => (
					<div key={row.transactionid} className={styles.transaction}>
						<p>{row.transactiondate}</p>
						<p className={styles.desc}>{row.description}</p>
						<p>${row.amount}</p>
						<p>{row.category}</p>
						<p>${row.lent}</p>
						<p>${row.repaid}</p>
						<p>{row.card}</p>
					</div>
					))}
					<div className={styles.pagination}>
						<button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                            disabled={currentPage === 0}
							>
                            Previous
                        </button>
						<p>Page: {currentPage + 1}</p>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} 
                            disabled={currentPage === totalPages - 1}
                        >
                            Next
                        </button>
						<p>Items per page: {itemsPerPage}</p>
					</div>
				</div>
			</div>
			<div className={styles['bottom-container']}>
				<div className={styles['bottom-left']}>
					<div className={styles['legend-left']}>
						{categories.slice(0, 5).map((category, index) => (
							<div key={index} className={styles['legend-item']}>
								<svg viewBox="0 0 1 1">
									<circle cx="0.5" cy="0.5" r="0.5" fill={colors[index]} />
								</svg>
								<p>{category.category}:</p>
								<p>${category.total}</p>
						</div>
						))}
					</div>
					<div className={styles['legend-right']}>
						{categories.slice(5, 10).map((category, index) => (
							<div key={index} className={styles['legend-item']}>
								<svg viewBox="0 0 1 1">
									<circle cx="0.5" cy="0.5" r="0.5" fill={colors[index + 5]} />
								</svg>
								<p>{category.category}:</p>
								<p>${category.total}</p>
						</div>
						))}
					</div>
					<div className={styles['legend-right']}>
						{categories.slice(10, 15).map((category, index) => (
							<div key={index} className={styles['legend-item']}>
								<svg viewBox="0 0 1 1">
									<circle cx="0.5" cy="0.5" r="0.5" fill={colors[index + 10]} />
								</svg>
								<p>{category.category}:</p>
								<p>${category.total}</p>
						</div>
						))}
					</div>
				</div>
				<div className={styles['bottom-right']}>
				</div>
			</div>
		</div>
	);
}
