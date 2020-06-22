export interface AppbarState {
  mode: string;
}

export const DARK_MODE = "darkMode" as const;
export const LIGHT_MODE = "lightMode" as const;

interface DarkModeAction {
  type: typeof DARK_MODE;
}

interface LightModeAction {
  type: typeof LIGHT_MODE;
}

export type AppbarActionTypes =
  | DarkModeAction
  | LightModeAction;

//액션 생성 함수 선언
export const darkMode = () => ({ 
  type: DARK_MODE 
})

export const lightMode = () => ({
  type: LIGHT_MODE
})

export const actionCreators = {
  darkMode,
  lightMode
};

const localTheme = window.localStorage.getItem('theme');

const initialState: AppbarState = 
  localTheme ? 
  { mode: localTheme } : 
  { mode: 'lightMode' };

//Reducer
export const appbarReducer = (
  state: AppbarState = initialState,
  action: AppbarActionTypes
): AppbarState => {

  switch (action.type) {
    case LIGHT_MODE:
      window.localStorage.setItem('theme', 'lightMode');
      return {
        mode: 'lightMode'
      }

    case DARK_MODE:
      window.localStorage.setItem('theme', 'darkMode');
      return {
        mode: 'darkMode'
      }
    
    default:
      window.localStorage.setItem('theme', state.mode);
      return state;
  }

}