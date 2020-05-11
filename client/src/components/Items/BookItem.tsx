import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';
import Axios from 'axios';

interface BookItem {
  book: PopularBook;
  index: number;
  buttons: boolean;
  handleLikes: (id: number) => void;
  onAdd: (work: BookmarkItem) => void;
}

const BookItem: React.SFC<BookItem> = ({ book, index, buttons, handleLikes, onAdd }) => 
{
  const [reviews, setReviews] = useState<Array<ReviewItem>>([]);

  useEffect(() => {
    Axios({
      method: 'get',
      url: `/api/review/${book.bookID}`
    })
    .then(res => setReviews(res.data))
    .catch(err => console.log(err));
  }, []);

  const renderReviews = () => (
    reviews.map((datum: ReviewItem) => (
      <div>
        <b>{datum.userName}</b>의 {datum.categoryName} 책
      </div>
    ))
  )

  const removeBTags = (str: string) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Grid item xs={12}>
      <div className="book">
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
                      category: book.categoryName,
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
            <b>트랜스미디어</b>  {book.transmediaName}<br />
          </div>
          <div className="reviews">
            {reviews ? renderReviews() : ""}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="bookDesc">
            {removeBTags(book.description)}
          </div>
        </Grid>
      </div>
    </Grid>
  )
}

export default BookItem;