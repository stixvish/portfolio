import styles from '../styles/resume.module.scss';

export default function Resume() {
	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<h1>resume</h1>
				<a href="src\assets\resume\vishResume_S.pdf" download>
					<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1Z" fill="#FFFFFF"/>
						<path d="M6 17a1 1 0 1 0-2 0v.6C4 19.482 5.518 21 7.4 21h9.2c1.882 0 3.4-1.518 3.4-3.4V17a1 1 0 1 0-2 0v.6c0 .778-.622 1.4-1.4 1.4H7.4c-.778 0-1.4-.622-1.4-1.4V17Z" fill="#FFFFFF"/>
					</svg>
				</a>
			</div>
			<div className={styles.content}>
				<div className={styles.category}>
					<h2 className={styles.title}>Education</h2>
					<div className={styles.info}>
						<img src="https://pbs.twimg.com/profile_images/920025455079710720/u2eU7QCT_400x400.jpg" className={styles.image} alt="COD Logo" />
						<div>
							<h3>College of DuPage</h3>
							<p>Associate of Science (A.S.)</p>
							<p>May 2023 - May 2024 (expected)</p>
							<p>Glen Ellyn, IL</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							Relevant Coursework:
							Calculus III,
							Differential Equations
						</p>
					</div>
					<div className={styles.info}>
						<img src="https://pbs.twimg.com/profile_images/1276630009793245184/_5QTqo7X_400x400.jpg" className={styles.image} alt="ASU Crest" />
						<div>
							<h3>Arizona State University</h3>
							<p>Ira A. Fulton Schools of Engineering</p>
							<p>August 2021 - December 2022</p>
							<p>Tempe, AZ</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							Relevant Coursework: 
							Principles of Programming, 
							Introduction to Engineering, 
							Object-Oriented Programming and Data, 
							Introduction to Programming Languages, 
							Digital Design
						</p>
					</div>
					<div className={styles.info}>
						<img src="https://image.maxpreps.io/school-mascot/f/1/1/f11e80d5-6129-4ca3-a64b-494007c79230.gif?version=637672846800000000&width=1024&height=1024" className={styles.image} alt="Neuqua Logo" />
						<div>
							<h3>Neuqua Valley High School</h3>
							<p>High School Diploma</p>
							<p>August 2017 - June 2021</p>
							<p>Naperville, IL</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							Relevant Coursework:
							AP Computer Science A,
							AP Computer Science Principles,
							AP Statistics
						</p>
					</div>
				</div>
				<div className={styles.category}>
					<h2 className={styles.title}>Experience</h2>
					<div className={styles.info}>
						<img src="https://pbs.twimg.com/profile_images/1476237803763773447/bL1_CQLe_400x400.jpg" className={styles.image} alt="NSF Image" />
						<div>
							<h3>NSF-Funded 311 Lab</h3>
							<p>National Science Foundation</p>
							<p>June 2022 - August 2022</p>
							<p>Tempe, AZ</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							I contributed to a data analysis of differing communities in the Boston area to understand the disparity between communities, and engineered an application to display findings using tools such as MongoDB and React.js.
						</p>
					</div>
					<div className={styles.info}>
						<img src="https://pbs.twimg.com/profile_images/1011304005710987267/emBfUZKK_400x400.jpg" className={styles.image} alt="Isos Image" />
						<div>
							<h3>Development Intern</h3>
							<p>Isos Technology</p>
							<p>June 2022 - August 2022</p>
							<p>Tempe, AZ</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							I developed a plugin for the Atlassian product Jira, which would remove inactive issues and declutter a user’s environment, as well as learned how to work within a team of developers and communicate with others in a professional environment.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}