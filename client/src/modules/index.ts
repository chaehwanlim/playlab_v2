//루트 리듀서

import { combineReducers } from 'redux';
import AppBarStyle from './AppBarStyle';

const rootReducer = combineReducers({
  AppBarStyle
});

export default rootReducer;

//컨테이너 컴포넌트를 만들 때 스토어에서 관리하고 있는 상태를 조회하기 위해 useSelector 함수를 사용할 때 필요
export type RootState = ReturnType<typeof rootReducer>;