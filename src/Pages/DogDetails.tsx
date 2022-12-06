import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type Measurements = {
	imperial: string;
	metric: string;
};

interface Dog {
	name: string;
	temperament: string;
	bred_for: string;
	life_span: string;
	weight: Measurements;
	height: Measurements;
	image_url: string;
}

const DogDetails = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const [dog, setDog] = useState<null | Dog>(null);
	const [isloading, setIsLoading] = useState(false);

	const fetchDogDetails = () => {
		setIsLoading(true);
		axios(`https://api.thedogapi.com/v1/images/${id}/breeds`)
			.then((results) => {
				if (results.data[0]) {
					setDog(results.data[0]);
					return results.data[0].reference_image_id;
				} else {
					alert("No details found");
					navigate("/");
				}
			})
			.then((imageId) => {
				axios(`https://api.thedogapi.com/v1/images/${imageId}`).then(
					(image) => {
						// @ts-ignore
						setDog((prevDog) => ({
							...prevDog,
							image_url: image.data.url
						}));
					}
				);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log("error", error);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchDogDetails();
	}, []);

	const handleGoBack = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		navigate("/");
	};

	if (isloading) {
		return (
			<Box mt={3} display="flex" justifyContent="center">
				Loading...
			</Box>
		);
	}

	return (
		<div className="wrapper">
			<div className="back-button">
				<button onClick={handleGoBack}>Go Back</button>
			</div>

			<Grid
				container
				columns={{ xs: 2, md: 8 }}
				className="detailed-info-wrapper">
				<Grid item xs={4}>
					<img src={dog?.image_url} alt={dog?.name} className="detailed-img" />
				</Grid>

				<Grid item xs={4}>
					<h3 className="breed-name">
						<strong>{dog?.name}</strong>
					</h3>

					<p>
						<strong>Temperament:</strong> {dog?.temperament}
					</p>

					<p>
						<strong>Breed For:</strong> {dog?.bred_for}
					</p>
					<p>
						<strong>Life Span:</strong> {dog?.life_span}
					</p>
					<h4>Height</h4>
					<div className="measurements">
						<p>
							<strong>Imperial:</strong>
							{dog?.height?.imperial}
						</p>
						<p>
							<strong>Metric:</strong>
							{dog?.height?.metric}
						</p>
					</div>
					<h4>Weight</h4>
					<div className="measurements">
						<p>
							<strong>Imperial:</strong>
							{dog?.weight?.imperial}
						</p>
						<p>
							<strong>Metric:</strong>
							{dog?.weight?.metric}
						</p>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default DogDetails;
