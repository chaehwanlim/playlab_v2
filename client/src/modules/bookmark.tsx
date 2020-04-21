import '../components/DBInterfaces.tsx';

//type 선언
export interface BookmarkItemParams {
  id: number;
  item: BookmarkItem;
}

export interface BookmarkState {
  bookmarkItems: BookmarkItemParams[];
}

const ADD = "bookmarks/ADD" as const;
const REMOVE = "bookmarks/REMOVE" as const;

interface AddAction {
  type: typeof ADD;
  payload: BookmarkItemParams;
}

interface RemoveAction {
  type: typeof REMOVE;
  payload: number;
}

export type BookmarkActionTypes =
  | AddAction
  | RemoveAction;

//액션 생성 함수 선언
let autoId = 0;

export const add = (item: BookmarkItem) => ({
  type: ADD,
  payload: {
    id: autoId++,
    item: item
  }
});
export const remove = (id: number) => ({
  type: REMOVE,
  payload: id
});

export const actionCreators = {
  add,
  remove
};

//상태의 타입과 상태의 초깃값 선언
const initialState: BookmarkState = {
  bookmarkItems: []
};

//Reducer
export const bookmarkReducer = (
  state: BookmarkState = initialState, 
  action: BookmarkActionTypes
): BookmarkState => {
  switch (action.type) {
    case ADD:
      return {
        bookmarkItems: [...state.bookmarkItems, action.payload]
      };
    case REMOVE:
      return {
        ...state,
        bookmarkItems: state.bookmarkItems.filter(bookmark => bookmark.id !== action.payload)
      }
    default:
      return state;
  }
}