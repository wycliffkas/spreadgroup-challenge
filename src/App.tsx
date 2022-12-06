import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DogList from "./Pages/DogList";
import DogDetails from "./Pages/DogDetails";
import NotFound from "./Pages/NotFound";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<DogList />} />
				<Route path="/:id" element={<DogDetails />} />
        <Route path="*" element={<NotFound/>} />

			</Routes>
		</Router>
	);
}

export default App;
