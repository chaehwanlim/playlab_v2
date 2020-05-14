interface WorkSelection {
  index: number;
  title: string;
}

interface Book {
  title: string;
  author: string;
}

interface MyBook extends Book {
  reviewID: number;
  categoryName: string;
}

interface BookForm extends Book {
  categoryID: number;
  transmediaID: number;
  imageURL: string;
  description: string;
}

interface PopularBook extends Book {
  bookID: number;
  genre: string;
  transmediaName: string;
  transmediaID: number;
  imageURL: string;
  description: string;
  likes: number;
}

interface Movie {
  title: string;
  director: string;
  actor: string;
}

interface MyMovie extends Movie {
  reviewID: number;
  categoryName: string;
}

interface MovieForm extends Movie {
  categoryID: number;
  transmediaID: number;
  imageURL: string;
  userRating: number;
  year: number;
}

interface PopularMovie extends Movie {
  movieID: number;
  genre: string;
  transmediaName: string;
  transmediaID: number;
  imageURL: string;
  year: number;
  userRating: number;
  likes: number;
}

interface Music {
  title: string;
  artist: string;
}

interface MyMusic extends Music {
  reviewID: number;
  categoryName: string;
}

interface MusicForm extends Music {
  genre: string;
  categoryID: number;
  transmediaID: number;
}

interface PopularMusic extends Music {
  musicID: number;
  genre: string;
  categoryName: string;
  userName: string;
  transmediaName: string;
  transmediaID: number;
  likes: number;
}

interface Category {
  categoryID: number;
  categoryName: string;
}

interface Transmedia {
  transmediaID: number;
  transmediaName: string;
  transmediaImage: string;
  transmediaDesc: string;
}

interface BookmarkItem {
  title: string;
  creator: string;
  review: string[];
  media: string;
}

interface ReviewItem {
  workID: number;
  userName: string;
  categoryName: string;
}