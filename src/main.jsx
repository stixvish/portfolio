import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Home from './routes/pages/home';
import Error from './routes/pages/error';
import Resume from './routes/pages/resume';
import Root from './routes/root';
import './routes/styles/globals.scss';
import Contact from './routes/pages/contact';
import Projects from './routes/pages/projects';
import Fantasy from './routes/pages/fantasy';
import About from './routes/pages/about';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{path: '/', element: <Home />},
			{path: '/resume', element: <Resume />},
			{path: '/contact', element: <Contact />},
			{path: '/projects', element: <Projects />},
			{path: '/fantasy', element: <Fantasy />},
			{path: '/about', element: <About />}
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);