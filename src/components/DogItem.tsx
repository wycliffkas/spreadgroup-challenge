import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import { Dog } from "../constants/types";

type Props = {
	dog: Dog;
};

const DogItem = ({ dog }: Props) => {
	return (
		<Grid item xs={3}>
			<Link to={`/${dog?.id}`}>
				<img src={dog?.url} alt="dogimage" />
			</Link>
		</Grid>
	);
};

export default DogItem;
