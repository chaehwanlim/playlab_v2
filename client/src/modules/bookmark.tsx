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
const REMOVEALL = "bookmarks/REMOVEALL" as const;

interface AddAction {
  type: typeof ADD;
  payload: BookmarkItemParams;
}

interface RemoveAction {
  type: typeof REMOVE;
  payload: number;
}

interface RemoveAllAction {
  type: typeof REMOVEALL;
}

export type BookmarkActionTypes =
  | AddAction
  | RemoveAction
  | RemoveAllAction;

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

export const removeAll = () => ({
  type: REMOVEALL
})

export const actionCreators = {
  add,
  remove,
  removeAll
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
      //review 중복값 제거
      const newReview: string[] = Array.from(new Set(action.payload.item.review));
      const newItem: BookmarkItem = { ...action.payload.item, review: newReview };
      const newPayload = { ...action.payload, item: newItem };

      //북마크 중복 제거
      const found = state.bookmarkItems.find(bItemParams => 
        bItemParams.item.title === action.payload.item.title && 
        bItemParams.item.creator === action.payload.item.creator
      );

      if (found === undefined) {
        return {
          bookmarkItems: [...state.bookmarkItems, newPayload]
        };
      } else return state;

    case REMOVE:
      return {
        ...state,
        bookmarkItems: state.bookmarkItems.filter(bookmark => bookmark.id !== action.payload)
      }

    case REMOVEALL:
      return initialState;

    default:
      return state;
  }
}