import React from "react";
import Pagination from "@mui/material/Pagination";

interface PaginationItemProps {
	page: number;
	handlePageChange: (event: any, page: number) => void;
}

const PaginationItem = ({ page, handlePageChange }: PaginationItemProps) => {
	return (
		<Pagination
			count={10}
			page={page}
			onChange={handlePageChange}
			variant="outlined"
			shape="rounded"
		/>
	);
};

export default PaginationItem;
