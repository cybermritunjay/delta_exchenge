import * as actionTypes from '../actionTypes'
import {store} from '../store';
import { db,signInWithEmailAndPassword,auth,createUserWithEmailAndPassword } from "../../config";

const LoginAction = items => ({
    type: actionTypes.LOGIN,
    items,
});
const LogoutAction = () => ({
    type: actionTypes.LOGOUT,
});

export const login = (email,pass) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth,email,pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        store.dispatch(LoginAction(user.email));
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject([errorCode,errorMessage])
      });
    });
  }
  
  export const signup = (email, password) =>{
    return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      store.dispatch(LoginAction(user.email))
      resolve(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject([errorCode,errorMessage])
    });
  })
  }
  
  export const logout = () => {

        store.dispatch(LogoutAction())
  }