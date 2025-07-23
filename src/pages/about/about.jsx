import styles from './about.module.scss'
import profile from '../../assets/images/profile.jpeg'

function About() {

	return (
		<div className={styles.main}>
			<div className={styles.title}>
				<h1>about me</h1>
			</div>
			<div className={styles.photo} style={{ backgroundImage: `url(${profile})`}} />
			<div className={styles.icons}>
				<a href='https://www.linkedin.com/in/vishgupta404/'>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="#0077b5" className={styles.icon} id={styles.linkedin}>
						<g clip-path="url(#clip0_156_4474)">
							<path d="M12.88 0H1.19612C0.557365 0 0 0.459377 0 1.09025V12.8004C0 13.4347 0.557365 14 1.19612 14H12.8765C13.5187 14 14 13.4312 14 12.8004V1.09025C14.0026 0.459377 13.5179 0 12.88 0ZM4.33912 11.6699H2.33362V5.43374H4.33912V11.6699ZM3.4055 4.48611H3.39149C2.74924 4.48611 2.33362 4.00838 2.33362 3.40988C2.33362 2.80088 2.76062 2.3345 3.41687 2.3345C4.07312 2.3345 4.47474 2.79738 4.48874 3.40988C4.48874 4.00838 4.07312 4.48611 3.4055 4.48611ZM11.669 11.6699H9.66349V8.26C9.66349 7.44275 9.37125 6.88536 8.64587 6.88536C8.09112 6.88536 7.76299 7.26075 7.61774 7.62562C7.56349 7.75687 7.54862 7.93536 7.54862 8.11824V11.6699H5.54312V5.43374H7.54862V6.30175C7.84087 5.88612 8.29675 5.28762 9.35725 5.28762C10.6741 5.28762 11.6699 6.15563 11.6699 8.02638L11.669 11.6699Z" />
						</g>
						<defs>
							<clipPath id="clip0_156_4474">
								<rect width="14" height="14"></rect>
							</clipPath>
						</defs>
					</svg>
				</a>
				<a href='https://github.com/stixvish'>
					<svg height="32" aria-hidden="true" viewBox="-1 -1 17 17" version="1.1" width="32" xmlns="http://www.w3.org/2000/svg" fill="white" className={styles.icon} id={styles.github}>
						<path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
					</svg>
				</a>
			</div>
			<div className={styles.desc}>
				<p>Hi! My name is Vishesh Gupta, and I'm currently a student studying Computer Science at Illinois Tech.</p>
				<p>Located in the suburbs of Chicago, I enjoy creating through code and learning about the tech field.</p>
				<p>I'm currently looking for internship/employment opportunities in Software Engineering.</p>
			</div>
		</div>
	)

}

export default About