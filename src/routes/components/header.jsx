import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/header.module.scss';

export default function Header() {

	const [open, setOpen] = useState(false)
	const location = useLocation();

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden"; // Disable scrolling
		} else {
			document.body.style.overflow = ""; // Revert to default
		}
		return () => {
			document.body.style.overflow = ""; // Clean up on unmount
		};
	}, [open]);

	useEffect(() => {
		setOpen(false)
	}, [location])

	return (
		<>	
			<div className={styles.menu} style={{ height: open ? "100dvh" : "0" }}>
				<div className={styles.side}>
					<div className={styles.infoContainer}>
						<p style={{color: "#a374ff"}}>GET IN TOUCH</p>
						<a href='mailto:gupta.v.vishesh@gmail.com'>gupta.v.vishesh@gmail.com</a>
						<a href='tel:6309464449'>(630) 946-4449</a>
					</div>
				</div>
				<div className={styles.side}>
					<div className={styles.linkContainer}>
						<Link to='/about'>about me</Link>
						<Link to='/resume'>resume</Link>
						<Link to='/projects'>projects</Link>
						<Link to='/fantasy'>fantasy</Link>
						<Link to='/contact'>contact</Link>
					</div>
				</div>
			</div>
			<div className={styles.main}>
				<Link to='/' style={{ color: open ? "#a374ff" : "white"  }}>stix</Link>
				<svg className={styles.icon} viewBox='0 0 10 10' height={`100%`} onClick={() => setOpen(!open)} style={{ display: open ? "none" : "block" }}>
					<circle id='border' cx="5" cy="5" r="4.5" fill='white'/>
					<line x1='3.5' y1='4.2' x2='6.5' y2='4.2' stroke='black' strokeWidth='0.3'/>
					<line x1='3.5' y1='5' x2='6.5' y2='5' stroke='black' strokeWidth='0.3'/>
					<line x1='3.5' y1='5.8' x2='6.5' y2='5.8' stroke='black' strokeWidth='0.3'/>
				</svg>
				<svg className={styles.icon} viewBox='0 0 10 10' height={`100%`} onClick={() => setOpen(!open)} style={{ display: open ? "block" : "none" }}>
					<circle id='border' cx="5" cy="5" r="4.5" fill='white' stroke='#a374ff' strokeWidth='0.1'/>
					<line x1='4' y1='4' x2='6' y2='6' stroke='black' strokeWidth='0.5'/>
					<line x1='4' y1='6' x2='6' y2='4' stroke='black' strokeWidth='0.5'/>
				</svg>
			</div>
		</>
	)
	
}