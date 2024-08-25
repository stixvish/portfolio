import { useEffect } from "react"

export default function Fantasy() {
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://nba-stats-db.herokuapp.com/api/playerdata/season/2024');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const jsonData = await response.json();
				console.log(jsonData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} 
		}

		fetchData();

	}, [])

	return (
		<>
		</>
	)
}