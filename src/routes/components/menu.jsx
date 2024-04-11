import styles from '../styles/menu.module.scss';

export default function Menu({toggle}) {
	<div className={`${styles.main} ${toggle ? styles.open : styles.close}`}>
		<p>Hello!</p>
	</div>
}