import * as AuthActions from './auth.action';

export interface State {
  isLogin: boolean;
  authError: string;
  loading: boolean;
}

const initState: State = {
  isLogin: false,
  authError: null,
  loading: false,
};

export function authReducer(state = initState, action: AuthActions.AuthType) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authError: null,
        isLogin: true,
        loading: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        isLogin: false,
      };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.AUTHENTICATE_ERROR:
      return {
        ...state,
        isLogin: false,
        authError: action.payLoad,
        loading: false,
      };

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return {
        ...state,
      };
  }
}
