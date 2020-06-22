//루트 리듀서
import { combineReducers } from 'redux';
import { BookmarkState, bookmarkReducer as bookmarks } from './bookmark';
import { AppbarState, appbarReducer as appbar } from './appbar';

export interface StoreState {
  bookmarks: BookmarkState;
  appbar: AppbarState;
}

export default combineReducers<StoreState>({
  bookmarks, appbar
});