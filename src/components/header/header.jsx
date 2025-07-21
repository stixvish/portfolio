import { useState } from 'react'
import styles from './header.module.scss'

function Header() {

	const [open, setOpen] = useState(false)

	return (
		<div className={styles.main}>
			<a href='/' style={{ color: open ? "#a374ff" : "white"  }}>stix</a>
			<svg className={styles.icon} viewBox='0 0 10 10' height={`100%`} onClick={() => setOpen(!open)} style={{ display: open ? "none" : "block" }}>
				<circle id='border' cx="5" cy="5" r="4.5" fill='white' stroke='#1d1d1d' strokeWidth='0.1' />
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
	)
}

export default Header