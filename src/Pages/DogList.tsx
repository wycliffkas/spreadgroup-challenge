import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import PaginationItem from "../components/PaginationItem";
import DogItem from "../components/DogItem";
import { Dog } from "../constants/types";

const DogList = () => {
	const [dogs, setDogs] = useState([]);
	const [page, setPage] = useState(1);
	const [isloading, setIsLoading] = useState(false);

	const fetchDogs = () => {
		setIsLoading(true);
		axios(`https://api.thedogapi.com/v1/images/search?${page}&limit=10`)
			.then((results) => {
				setDogs(results.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log("error", error);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchDogs();
	}, [page]);

	const onHandlePageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		page: number
	) => {
		setPage(page);
	};

	if (isloading) {
		return (
			<Box mt={3} display="flex" justifyContent="center">
				Loading...
			</Box>
		);
	}

	return (
		<>
			<Box className="wrapper">
				<Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
					{dogs?.map((dog: Dog) => (
						<DogItem dog={dog} key={dog?.id} />
					))}
				</Grid>

				{!isloading && (
					<Box mt={3} display="flex" justifyContent="center">
						<PaginationItem page={page} handlePageChange={onHandlePageChange} />
					</Box>
				)}
			</Box>
		</>
	);
};

export default DogList;
