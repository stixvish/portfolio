import styles from '../styles/resume.module.scss';

export default function Resume() {
	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<h1>resume</h1>
			</div>
			<div className={styles.content}>
				<div className={styles.section}>
					<h2>education</h2>
					<div className={styles.place}>
						<img src="https://pbs.twimg.com/profile_images/920025455079710720/u2eU7QCT_400x400.jpg" alt="COD Logo" />
						<div className={styles.info}>
							<h3>College of DuPage</h3>
							<p>Associate of Science (A.S.)</p>
							<p>May 2023 - May 2024 (expected)</p>
							<p>Glen Ellyn, IL</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							Relevant Coursework:
							C++ Language Programming,
							Calculus III,
							Discrete Mathematics
						</p>
					</div>
					<div className={styles.place}>
						<img src="https://pbs.twimg.com/profile_images/1276630009793245184/_5QTqo7X_400x400.jpg" className={styles.image} alt="ASU Crest" />
						<div className={styles.info}>
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
					<div className={styles.place}>
						<img src="https://image.maxpreps.io/school-mascot/f/1/1/f11e80d5-6129-4ca3-a64b-494007c79230.gif?version=637672846800000000&width=1024&height=1024" className={styles.image} alt="Neuqua Logo" />
						<div className={styles.info}>
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
				<div className={styles.section}>
					<h2>professional experience</h2>
					<div className={styles.place}>
						<img src="https://pbs.twimg.com/profile_images/1476237803763773447/bL1_CQLe_400x400.jpg" className={styles.image} alt="NSF Image" />
						<div className={styles.info}>
							<h3>College of DuPage</h3>
							<p>Associate of Science (A.S.)</p>
							<p>May 2023 - May 2024 (expected)</p>
							<p>Glen Ellyn, IL</p>
						</div>
					</div>
					<div className={styles.description}>
						<p>
							I contributed to a data analysis of differing communities in the Boston area to understand the disparity between communities, and engineered an application to display findings using tools such as MongoDB and React.js.
						</p>
					</div>
					<div className={styles.place}>
						<img src="https://pbs.twimg.com/profile_images/1011304005710987267/emBfUZKK_400x400.jpg" className={styles.image} alt="Isos Image" />
						<div className={styles.info}>
							<h3>Development Intern</h3>
							<p>Associate of Science (A.S.)</p>
							<p>May 2023 - May 2024 (expected)</p>
							<p>Glen Ellyn, IL</p>
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