interface Book {
  bookID: number;
  title: string | null;
  author: string;
  categoryName: string;
  category: number;
  transmedia: number;
  imageURL: string;
  image: string;
  description: string;

}

interface Movie {
  movieID: number;
  title: string;
  director: string;
  actor: string;
  categoryName: string;
}

interface Music {
  musicID: number;
  title: string;
  artist: string;
  categoryName: string;

}

interface Category {
  categoryID: number;
  categoryName: string;
}

interface Transmedia {
  transmediaID: number;
  transmediaName: string;
}