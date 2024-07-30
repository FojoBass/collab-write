import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DocumentInt, UserInfoInt } from '../globalTypes';
import { db } from './config.firebase';

const createWorkspaceReq = (data: UserInfoInt) => {
  const docRef = doc(db, `users/${data.uid}`);
  return setDoc(docRef, data);
};

const getUser = (uid: string) => {
  const docRef = doc(db, `users/${uid}`);
  return getDoc(docRef);
};

const getUserDocs = (uid: string) => {
  const colRef = collection(db, 'docs');
  const q = query(colRef, where('uid', '==', uid));
  return getDocs(q);
};

const getDocReq = (id: string) => {
  const docRef = doc(db, `docs/${id}`);
  return getDoc(docRef);
};

const createDocReq = (data: DocumentInt) => {
  const docRef = doc(db, `docs/${data.id}`);
  return setDoc(docRef, data);
};

const updateDocReq = (data: Partial<DocumentInt>) => {
  const docRef = doc(db, `docs/${data.id}`);
  return updateDoc(docRef, { ...data });
};

export {
  createWorkspaceReq,
  getUser,
  getUserDocs,
  createDocReq,
  updateDocReq,
  getDocReq,
};
