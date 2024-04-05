import { useEffect } from 'react';
import styles from '../styles/home.module.scss';
import { useState } from 'react';

export default function Home() {

	const [images, setImages] = useState([]);

	useEffect(() => {
		const gallery = Object.values(import.meta.glob('/src/assets/images/*.webp', {query: '?url', import: 'default'}));
		const mySet = new Set();
		const myArray = [];
		while (mySet.size < 3) {
			const randomNumber = Math.floor(Math.random() * gallery.length);
			if (!mySet.has(randomNumber)) {
				mySet.add(randomNumber);
				myArray.push(gallery[randomNumber].name);
			}
		}
		setImages(myArray);
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.background}>
				<div className={styles.photo} style={{backgroundImage: `url(${images[0]})`}} />
				<div className={styles.photo} style={{backgroundImage: `url(${images[1]})`}} />
				<div className={styles.photo} style={{backgroundImage: `url(${images[2]})`}} />
			</div>
			<div className={styles.intro}>
				<h1>hello there!</h1>
				<h1>i&apos;m vishesh.</h1>
				<p>software engineer &middot; computer science student &middot; eager to learn</p>
			</div>
		</div>
	)
}