import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const Ex = () => {
    const [opt, setOpt] = useState(true);
    return (
        <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active={opt}>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    );
};

export default Ex;