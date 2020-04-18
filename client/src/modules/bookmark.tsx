import '../components/DBInterfaces.tsx';

//리덕스 액션 type 선언
const SET_BOOKMARK = "bookmarks/SET_BOOKMARK" as const;
const DEL_BOOKMARK = "bookmarks/DEL_BOOKMARK" as const;

//액션 생성 함수 선언
let total = 0;
export const setBookmark = (work: BookmarkWork) => ({
  type: SET_BOOKMARK,
  payload: {
    id: ++total,
    work
  }
});
export const delBookmark = (id: number) => ({
  type: DEL_BOOKMARK,
  payload: id
});

//액션 객체에 대한 타입스크립트 type 준비
type handleBookmark = 
  | ReturnType<typeof setBookmark>
  | ReturnType<typeof delBookmark>;

//상태의 타입과 상태의 초깃값 선언
/* export interface WorkMemo {
  name: string;
  creator: string;
} */
export interface bookmarkState {
  bookmarks: any[];
}

const initialState: bookmarkState = {
  bookmarks: []
};

//리듀서
const bookmarkReducer = (state: bookmarkState = initialState, action: handleBookmark) => {
  switch (action.type) {
    case SET_BOOKMARK:
      return {
        ...state,
      bookmarks: state.bookmarks.concat({ ...action.payload })
      };
    case DEL_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter((bookmark) => (bookmark.id !== action.payload))
      }
    default:
      return state;
  }
}

export default bookmarkReducer;