import {store} from '../../app/store';
import {getAllMembersList} from '../actions/user'
export const getState = () =>{
    const state = store.getState()
    return state
}

export const getUser = () =>{
    const state = store.getState()
    return state.AuthReducer.user
}