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
import '../DBInterfaces.tsx';


const MyMovie: React.FC = () => {
  const [myMovie, setMyMovie] = useState<Array<MyMovie>>([]);

  const getDB = () => {
    Axios({
      method: 'post',
      url: '/api/user/movie',
      data: {
        userID: sessionStorage.userID
      }
    })
    .then(res => setMyMovie(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getDB();
  }, []);

  const handleDeletion = (id: number) => {
    const urlWithID = `/api/movie/${id}`;

    Axios({
      method: 'delete',
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
    <div className="MyPage-table">
      <TableContainer className="tableContainer">
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
        {myMovie ? myMovie.map((datum, index) => {
        return (
          <TableRow>
            <TableCell className="tableData">
                <span className="title">{datum.title}</span><br></br>{datum.director}
                <br></br>{datum.actor}
            </TableCell>
            <TableCell className="tableData" style={{minWidth:"12rem"}}>
              {datum.categoryName} 영화
            </TableCell>
            <TableCell className="tableData" style={{maxWidth:"5rem"}}>
              <div className="btnAlign">
                <Button className="deletion"
                onClick={() => {handleDeletion(datum.movieID)}}>
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

export default MyMovie;