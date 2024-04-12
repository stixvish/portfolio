import styles from '../styles/error.module.scss';
import Header from '../components/header';

export default function Error() {

	return (
		<>
			<Header />
			<div className={styles.main}>
				<h2>Hello! You&apos;ve found a page that doesn&apos;t exist.</h2>
				<h2>Please navigate to to a page that does.</h2>
			</div>
		</>
	)

}