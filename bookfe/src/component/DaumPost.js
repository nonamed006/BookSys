import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const DaumPost = ({getPost}) => {
	const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';
		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
			}
			fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
		}
		//fullAddress -> 전체 주소반환
		console.log(fullAddress);
		getPost(fullAddress);
	}
	return (
		<>
		<Button onClick={handleShow} variant="outline-success">주소찾기</Button>
			{show ?
				<DaumPostcode onComplete={handleComplete} className='post_code' /> :
				null
			}
		</>
	);
};

export default DaumPost;