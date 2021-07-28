import {AUTH, LOGOUT, UPDATE} from "../../constants/actionTypes";
import jwtDecode from 'jwt-decode'
import * as api from "../api";

const authReducer = async(state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      let profile = {result: {}, token: action.data.access};
      const decodedData = jwtDecode(profile.token)
          const {data} = await api.getAccountDetails(decodedData.user_id);
      localStorage.setItem('profile', JSON.stringify({...profile, result: data}));
      return {...state, authData: profile};

    case UPDATE :
      const user = JSON.parse(localStorage.getItem('profile'))
      localStorage.setItem('profile', JSON.stringify({...user, result: action?.data}));
      return {...state, authData: action?.data};
    case LOGOUT:
      localStorage.clear();
      return {...state, authData: null};
    default:
      return state;

  }

};

export default authReducer;
