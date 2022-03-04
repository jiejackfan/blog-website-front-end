import * as api from '../api/index';
import {AUTH, LOGOUT} from '../constants/actionTypes'

export const signin = (formData, history)  => async (dispatch) => {
    try {
        //login
        const{ data } = await api.signIn(formData);

        dispatch({type:AUTH, data});

        history('/');
    } catch(error) {
        console.log(error);
    }
}

export const signup = (formData, history)  => async (dispatch) => {
    try {
        //signup
        const{ data } = await api.signUp(formData);

        dispatch({type:LOGOUT, data});
        history('/');
    } catch(error) {
        console.log(error);
    }
}