import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalRent from './modal/ModalRent';

const BookRank = () => {

  const [booklist, setBooklist] = useState([]);
  const [reload, setReload] = useState(false);

  // 책 목록 불러오기
  const getBookRank = () => {
    fetch(`http://localhost:8080/main/rank`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setBooklist(res);
      });
  };

  useEffect(() => {
    getBookRank();
  }, [reload]);

  // 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
  var checkUse = (state) => {
    if (state % 2 == 0) {
      return "y";
    } else {
      return "n";
    }
  }

  let idx = 0;
  return (
    <>
      <b>🏆 지금 인기 많은 책</b>
      <Table hover size="sm" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Book Title</th>
            <th>Book Writer</th>
            <th>Rent</th>
          </tr>
        </thead>
        <tbody>
          {booklist.map(function (res, index) {
            return <tr key={index}>
              <td><b>{++idx}</b></td>
              <td><Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'black' }}>{res.title}</Link></td>
              <td>{res.writer}</td>
              <td>{checkUse(res.usebook) == 'y' ?
                <ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
                <Button size='sm' variant="secondary" disabled="disabled" >대여불가능</Button>}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BookRank;