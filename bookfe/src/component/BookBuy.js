import React from 'react';
import { useParams } from 'react-router';

const BookBuy = () => {

	let {no} = useParams();
	
	return (
		<div>
			구매페이지
		</div>
	);
};

export default BookBuy;