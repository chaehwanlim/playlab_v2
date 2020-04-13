//리덕스 액션 type 선언
const WHITE = 'appBarStyle/WHITE' as const; //const assertion : 액션 생성함수를 통해 액션 객체를 만들 때 실제 값을 가리킴
const BLACK = 'appBarStyle/BLACK' as const;

//액션 생성 함수 선언
export const white = () => ({ type: WHITE });
export const black = () => ({ type: BLACK });

//액션 객체들에 대한 타입스크립트 type 준비
type ChangeAction =
  | ReturnType<typeof white>
  | ReturnType<typeof black>;

//상태의 타입과 상태의 초깃값 선언
export interface AppBarStyle {
  color: string;
  textShadow: string;
}

const initialState: AppBarStyle = { color : 'white', textShadow: '' };

//리듀서
const styleChanger = (state: AppBarStyle = initialState, action: ChangeAction) => {
  switch (action.type) {
    case WHITE:
      document.body.style.backgroundColor = '#18171C';
      return { color : 'white', textShadow: '' };
    case BLACK:
      document.body.style.backgroundColor = 'whitesmoke';
      return {
        color : 'black', 
        textShadow: '-1px 0 #F2F1F6, 0 1px #F2F1F6, 1px 0 #F2F1F6, 0 -1px #F2F1F6'
      };
    default:
      return state;
  }
}

export default styleChanger;