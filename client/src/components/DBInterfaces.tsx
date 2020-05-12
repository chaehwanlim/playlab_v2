interface WorkSelection {
  index: number;
  title: string;
}

interface Book {
  title: string;
  author: string;
}

interface MyBook extends Book {
  categoryName: string;
  userName: string;
  bookID: number;
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
  categoryName: string;
  userName: string;
  transmediaName: string;
  transmediaID: number;
  imageURL: string;
  description: string;
  likes: number;
}

interface BookInDB extends Book {
  genre: string;
  categoryName: string;
  userName: string;
  transmediaName: string;
  imageURL: string;
  description: string;
}

interface Movie {
  title: string;
  director: string;
  actor: string;
}

interface MyMovie extends Movie {
  categoryName: string;
  userName: string;
  movieID: number;
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
  categoryName: string;
  userName: string;
  transmediaName: string;
  transmediaID: number;
  imageURL: string;
  year: number;
  userRating: number;
  likes: number;
}

interface MovieInDB extends Movie {
  genre: string;
  categoryName: string;
  userName: string;
  transmediaName: string;
  imageURL: string;
  year: number;
  userRating: number;
}

interface Music {
  title: string;
  artist: string;
}

interface MyMusic extends Music {
  categoryName: string;
  userName: string;
  musicID: number;
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

interface MusicInDB extends Music {
  genre: string;
  categoryName: string;
  userName: string;
  transmediaName: string;
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
  category: string;
  media: string;
}

interface ReviewItem {
  workID: number;
  userName: string;
  categoryName: string;
}