import styles from '../styles/projects.module.scss'

export default function Projects() {
	return (
		<>
			<div className={styles.main}>
				<div className={styles.header}>
					<h1>projects</h1>
				</div>
				<div className={styles.content}>
					<div className={styles.category}>
						<div className={styles.info}>
							<a href="https://github.com/stixvish/portfolio-react">
								<img src="src/assets/icons/favicon.png" className={styles.image} alt="Website Favicon" />
							</a>
							<div>
								<a href="https://github.com/stixvish/portfolio-react">
									<h3>Personal Portfolio</h3>
								</a>
								<p>Personal Project</p>
								<div className={styles.frameworks}>
									<p>MongoDB</p>
									<p>Express</p>
									<p>React.js</p>
									<p>Node.js</p>
								</div>
							</div>
						</div>
						<div className={styles.description}>
							<p>
								I used a JavaScript framework to make a website that displayed information about me.
							</p>
						</div>
						<div className={styles.info}>
							<a href="https://github.com/rtwoo/project-spyn">
								<img src="src/assets/icons/ev3.jpg" className={styles.image} alt="Website Favicon" />
							</a>
							<div>
								<a href="https://github.com/rtwoo/project-spyn">
									<h3>Maze Robot</h3>
								</a>
								<p>Course Project</p>
								<div className={styles.frameworks}>
									<p>MATLAB</p>
									<p>LEGO Mindstorms</p>
								</div>
							</div>
						</div>
						<div className={styles.description}>
							<p>
								I used MATLAB and LEGO Mindstorms to create a robot that traversed a maze autonomously,
								picking up and dropping off a person at designated spots along the way.
							</p>
						</div>
						<div className={styles.info}>
							<a href="https://github.com/stixvish/discordBot">
								<img src="src/assets/icons/discord.png" className={styles.image} alt="Website Favicon" />
							</a>
							<div>
								<a href="https://github.com/stixvish/discordBot">
									<h3>Discord Bot</h3>
								</a>
								<p>Personal Project</p>
								<div className={styles.frameworks}>
									<p>Python</p>
									<p>Discord.py</p>
								</div>
							</div>
						</div>
						<div className={styles.description}>
							<p>
								I made a bot for the platform Discord that performed
								simple server maintainance and poked fun at my friends.
							</p>
						</div>
					</div>
				</div>
			</div>	
		</>
	)
}