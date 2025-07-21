import {useEffect, useState} from 'react'
import styles from './home.module.scss'

// grab everything in the images folder
const modules = import.meta.glob(
	'../../assets/images/*.{jpg,png,jpeg,svg,webp}',
	{eager: true, import: 'default'}
)
const allImages = Object.values(modules)

function pickThree(images) {
	const copy = [...images], picks = []
	for (let i = 0; i < 3; i++) {
		picks.push(copy.splice(Math.random() * copy.length | 0, 1)[0])
	}
	return picks
}

function Home() {

	const [photos, setPhotos] = useState([])

	useEffect(() => {
		setPhotos(pickThree(allImages))
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.background}>
				{photos.map((src, i) => (
					<div key={i} className={styles.photo} style={{backgroundImage: `url(${src})`}} />
				))}
			</div>
			<div className={styles.intro}>
				<h1>hello there!</h1>
				<h1>i'm vishesh.</h1>
				<div className={styles.desc}>
					<p>software engineer</p>
					<p>&middot;</p>
					<p>computer science student</p>
					<p>&middot;</p>
					<p>eager to learn</p>
				</div>
			</div>
		</div>
	)
}

export default Home
