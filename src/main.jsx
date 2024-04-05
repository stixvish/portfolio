import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Home from './routes/pages/home';
import Error from './routes/pages/error';
import Resume from './routes/pages/resume';
import Root from './routes/pages/root';
import './routes/styles/globals.scss';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{path: '/', element: <Home />},
			{path: '/resume', element: <Resume />},
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);