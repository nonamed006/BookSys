import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentCal = (props) => {
	const [startDate, setStartDate] = useState(new Date());
	const [radioState, setRaioState] = useState();

	const handleChange = (e) => {
		console.log(e.target.id);
		setRaioState(e.target.id);
	}
	const rentBook = () => {
		console.log('rent');
	}
	return (
		<div>
			<Form className="mb-3">
				<Form.Check
					type='radio'
					id='noDate'
					name='radios'
					label='무기한 대여'
					onChange={handleChange}
				/>
				<Form.Check
					inline
					type='radio'
					id='selectDate'
					name='radios'
					label='날짜 선택'
					onChange={handleChange}
				/>
				<DatePicker
    	    selected={startDate}
	        onChange={(date) => setStartDate(date)} 
    />
			</Form>
			<Button size='sm' className="mb-3" onClick={rentBook}>대여하기</Button>
		</div>
	);
};

export default RentCal;