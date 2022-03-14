import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, InputGroup, Table } from 'react-bootstrap';

const Cart = () => {

	const tableTitle = ['no', '제목', '가격', '수량', '삭제'];
	const [cartList, setCartList] = useState([]);
	const [checkedList, setCheckedLists] = useState([]);

	// 장바구니 목록 불러오기
  const getCart = () => {
    fetch(`http://localhost:8080/user/cart`, {
      method: "get",
			headers: {
				'Content-Type': "application/json;charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setCartList(res);
				console.log(res);
      })
  };

	useEffect(() => {
		getCart();
	}, []);

	// 체크박스 전체 선택
	const onChangeAll = (e) => {
		// 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
		setCheckedLists(e.target.checked ? cartList : []);
 }

 let cnt = cartList.cnt;
 const minus = () =>{
	 cnt = parseInt(cnt) - 1;
 }

	var idx = 0;
	return (
		<div>
			<Container>
				<br />
				<h3>장바구니</h3>
				<br />
				<Table striped bordered hover>
					<thead>
						<tr>
							<th scope="col">
								<input type="checkbox" onChange={onChangeAll} checked={checkedList.length === cartList.length}></input>
							</th>
							{tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
						</tr>
					</thead>
					<tbody>
							{cartList.map(function(res){
								const img = '/img/' + res.img;
							return <tr>
								<td><input type="checkbox"></input></td>
								<td>{++idx}</td>
								<td><img src={img} width ='70px' height='100px'/> {res.title}</td>
								<td>{res.price}</td>
								<td width='150'><span onClick={(e) => minus}>➖ </span><input type='text' value={cnt} size='1'></input><span> ➕</span></td>
								<td><Button size ='sm' variant="outline-secondary" onClick={(e) => alert(res.book_no)}>삭제</Button></td>
							</tr>
							})}
				
					</tbody>
				</Table>

			</Container>
		</div>
	);
};

export default Cart;