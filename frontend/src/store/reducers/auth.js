import {AUTH, LOGOUT, UPDATE} from "../../constants/actionTypes";

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({...action?.data}));
      return {...state, authData: action?.data};

    case UPDATE :
      const user = JSON.parse(localStorage.getItem('profile'))
      localStorage.setItem('profile', JSON.stringify({...user, result:action?.data}));
      return {...state, authData: action?.data};
    case LOGOUT:
      localStorage.clear();
      return {...state, authData: null};
    default:
      return state;

  }

};

export default authReducer;
