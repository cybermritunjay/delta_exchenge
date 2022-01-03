import { db,signInWithEmailAndPassword,auth,createUserWithEmailAndPassword } from "../config";
import {
  collection,
  getDocs,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
export const getAllMembersList = () => {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "users"))
      .then((docmnt) => {
        let res = [];
        docmnt.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let tmp = doc.data();
          tmp = {
            ...tmp,
            id: doc.id,
          };
          res.push(tmp);
        });
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const addNewMember = (inp) => {
  inp = {
    ...inp,
    LastUpdated: Timestamp.fromDate(new Date()),
  };
  return new Promise((resolve, reject) => {
    addDoc(collection(db, "users"), inp)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteOneMember = (id) => {
  console.log("delete");
  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, "users", id))
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
