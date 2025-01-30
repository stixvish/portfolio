import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './routes/pages/home';
import Error from './routes/pages/error';
import Resume from './routes/pages/resume';
import Contact from './routes/pages/contact';
import Projects from './routes/pages/projects';
import Fantasy from './routes/pages/fantasy';
import About from './routes/pages/about';
import Layout from './routes/layout';
import './routes/styles/globals.scss';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{path: '/', element: <Home />},
			{path: '/about', element: <About />},
			{path: '/resume', element: <Resume />},
			{path: '/projects', element: <Projects />},
			{path: '/fantasy', element: <Fantasy />},
			{path: '/contact', element: <Contact />},
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);