import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';

interface BookItem {
  book: PopularBook;
  reviews: ReviewItem[];
  index: number;
  buttons: boolean;
  handleLikes: (id: number) => void;
  onAdd: (work: BookmarkItem) => void;
}

const BookItem: React.SFC<BookItem> = ({ book, reviews, index, buttons, handleLikes, onAdd }) => 
{
  const linkStyle = { color: 'white', background: 'slategrey', borderRadius: '10px', padding: '3px 5px', margin: '5px', textDecoration: 'none'};

  const renderReviews = () => (
    reviews.map((review: ReviewItem, index: number) => (
      <div key={index}>
        <b>{review.userName}</b>님의 <b>{review.categoryName}</b> 책
      </div>
    ))
  )

  const transmediaLink = () => {
    if(book.transmediaID > 10000) {
      return (
        <div>
          <b>트랜스미디어</b>
          <a href={`Transmedia/${book.transmediaID}`} 
            style={linkStyle}
          >{book.transmediaName}</a>
        </div>
      )
    } else return <div></div>
  }

  const makeCatArray = (reviewsForOneMusic: ReviewItem[]) => {
    const catArray: string[] = [];
    reviewsForOneMusic.map((review: ReviewItem) => { catArray.push(review.categoryName) });

    return catArray;
  }

  const removeBTags = (str: string) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Grid item xs={12}>
      <Box className="book" borderRadius={10}>
        <Grid item xs={4} md={2}>
        <div className="bookCoverAlign">
            <img className="bookCover" src={book.imageURL} alt={book.title}/>
            {buttons ?
            <Button variant="contained" className="bookLikes"
              onClick={() => {handleLikes(book.bookID)}}
            >
              <ThumbUp />&nbsp;{book.likes}
            </Button>
            : ""}
        </div>
        </Grid>
        <Grid item xs={8} md={4}>
          <div className="bookTitle">
            <Grid container spacing={0}>
              <Grid item xs={10}>
                <span style={{color: 'orange'}}>
                  {index + 1}&nbsp;&nbsp;
                </span>
                {removeBTags(book.title)}&nbsp;
              </Grid>
              {buttons ?
              <Grid item xs={2}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <IconButton style={{padding: '1rem'}} 
                    onClick={() => onAdd({
                      title: book.title,
                      creator: book.author,
                      review: makeCatArray(reviews),
                      media: '책'
                    })}
                  >
                    <BookmarkRounded style={{color: 'black', width: '2rem', height: '2rem'}}/>
                  </IconButton>
                </div>
              </Grid>
              : ""}
            </Grid>
          </div>
          <div className="bookInfo">
            <b>작가</b>  {book.author}<br />
            
            {transmediaLink()}
          </div>
          <div className="bookCategory">
            {reviews ? renderReviews() : ""}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="bookDesc">
            {removeBTags(book.description)}
          </div>
        </Grid>
      </Box>
    </Grid>
  )
}

export default BookItem;