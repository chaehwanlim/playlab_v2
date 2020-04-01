import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Table.scss';


export default function Mybook(props) {
  const [myBook, setMyBook] = useState([]);

  const getDB = () => {
    Axios({
      method: 'post',
      url: '/api/myPage/book',
      data: {
        userName: sessionStorage.userName
      }
    })
    .then(res => setMyBook(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getDB();
  }, []);

  const handleDeletion = (id) => {
    console.log(id);
    const urlWithID = `/api/myPage/delete/${id}`;
    Axios({
      method: 'DELETE',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('정상적으로 삭제되었습니다');
        getDB();
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="table">
      <TableContainer className="tableContainer">
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
        {myBook ? myBook.map((datum, index) => {
        return (
          <TableRow>
            <TableCell className="tableData">
                <span className="title">{datum.title}</span><br></br>{datum.author}
            </TableCell>
            <TableCell className="tableData" style={{minWidth:"12rem"}}>
              {datum.categoryName} 책
            </TableCell>
            <TableCell className="tableData" style={{maxWidth:"5rem"}}>
              <div className="btnAlign">
                <Button color="secondary" className="deletion"
                onClick={() => {handleDeletion(datum.bookID)}}>
                삭제</Button>
              </div>
            </TableCell>
          </TableRow>
        )
        }) : <div>error</div>}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
    
  )
}