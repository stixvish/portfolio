import { Link } from 'react-router-dom';
import styles from '../styles/menu.module.scss';

// eslint-disable-next-line react/prop-types
export default function Menu({toggle}) {
	return (
		<div className={`${styles.main} ${toggle ? styles.open : ''}`}>
			<div className={styles.section}>
				<div className={styles.info}>
					<a href="mailto:gupta.v.vishesh@gmail.com">gupta.v.vishesh&#64;gmail.com</a>
					<a href="tel:+1 630 946 4449">&#40;630&#41; 946&#45;4449</a>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.routes}>
					<Link to={`/`}>home</Link>
					<Link to={`/about`}>about me</Link>
					<Link to={`/resume`}>resume</Link>
					<Link to={`/projects`}>projects</Link>
					<Link to={`/fantasy`}>fantasy</Link>
					<Link to={`/contact`}>contact</Link>
				</div>
			</div>
		</div>
	)
}