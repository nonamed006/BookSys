import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalRent from './modal/ModalRent';

const CarouselMain = () => {
	const [booklist, setBooklist] = useState([]);
	const [search, setSearch] = useState("");
	const [reload, setReload] = useState(false);

	// 책 목록 불러오기
	const getBook = () => {
		fetch(`http://localhost:8080/main/${search == '' ? 'notSearch' : search}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBooklist(res);
			});
	};

	useEffect(() => {
		getBook();
	}, [reload]);

	// 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
	var checkUse = (state) => {
		if (state % 2 == 0) {
			return "y";
		} else {
			return "n";
		}
	}
	return (
		<>
			<OwlCarousel className='owl-theme' margin={10} dots={false} items={7}>
				{booklist.map(function (res, index) {
					const img = '/img/' + res.img;
					return <div key={index} className='item'>
						<Card style={{ width: '10rem', float: 'left', height: '350px', margin: '0px 10px 10px 0px' }} >
							<img src={img} height='180px' />
							<Card.Body>
								<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'darkblue' }}><Card.Title style={{ fontSize: '14px', height: '50px', fontWeight: 'bolder' }}>{res.title}</Card.Title></Link>
								<Card.Text style={{ fontSize: '13px' }}>
									{res.writer} | <Link to={`/publisher/${res.publisher}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}>{res.publisher}</Link>
								</Card.Text>
								{checkUse(res.usebook) == 'y' ?
									<ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
									<Button size='sm' variant="secondary" disabled="disabled" >대여불가능</Button>}
							</Card.Body>
						</Card>
					</div>
				})}
			</OwlCarousel>
		</>
	);
};

export default CarouselMain;