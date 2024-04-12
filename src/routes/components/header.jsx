import { useEffect, useState } from 'react';
import styles from '../styles/header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import Menu from './menu';

export default function Header() {

	const [toggle, setToggle] = useState(false);

	const location = useLocation();

	useEffect(() => {
		setToggle(false);
	}, [location])
	
	return (
		<>
			<Menu toggle={toggle} />
			<div className={styles.main}>
				<div className={`${styles.logo} ${toggle ? styles.change : ''}`}>
					<Link to='/'>stix</Link>
				</div>
				<div className={`${toggle ? styles.close : styles.open}`} onClick={() => setToggle(true)}>
					<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 1L16 1" stroke="currentColor" strokeWidth="2" />
						<path d="M0 6L16 6" stroke="currentColor" strokeWidth="2" />
						<path d="M0 11L16 11" stroke="currentColor" strokeWidth="2" />
					</svg>
				</div>
				<div className={`${toggle ? styles.open : styles.close}`} onClick={() => setToggle(false)}>
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.757812 9.24268L9.24309 0.757393" stroke="currentColor" strokeWidth="2" />
						<path d="M0.757812 0.757324L9.24309 9.24261" stroke="currentColor" strokeWidth="2" />
					</svg>
				</div>
			</div>
		</>
	)
}``