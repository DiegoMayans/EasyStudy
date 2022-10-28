import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

import { db } from "../firebase/clientApp";

export const getUserIdByEmail = async (email: string) => {
  const usersRef = collection(db, "user"); 

  const q = query(usersRef, where("email", "==", email));

  // Every user has unique email
  const querySnapshot = await getDocs(q);
  
  let userId: string[] = [];

  querySnapshot.forEach((doc) => {
    userId = [...userId, doc.id];
  });

  return userId;
}

export const getUserIdByUsername = async (username: string) => {
  const usersRef = collection(db, "user"); 

  const q = query(usersRef, where("username", "==", username));

  const querySnapshot = await getDocs(q);

  let userId: string[] = [];

  querySnapshot.forEach((doc) => {
    userId = [...userId, doc.id];
  });

  return userId;
}

export const getUserIdBySub = async (sub: string) => {
  const usersRef = collection(db, "user"); 

  const q = query(usersRef, where("sub", "==", sub));

  const querySnapshot = await getDocs(q);

  let userId: string[] = [];

  querySnapshot.forEach((doc) => {
    userId = [...userId, doc.id];
  });

  return userId;
}

export const getUserById = async (userId: string) => {
  const docRef = doc(db, "user", userId);
  
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export const getTemplate = async (userId: string, templateId: string) => {
  const docRef = doc(db, "user", userId);

  const docSnap = await getDoc(docRef);

  return docSnap.get('templates')[templateId]
}

export const getUserTemplates = async (userId: string) => {
  const docRef = doc(db, "user", userId);

  const docSnap = await getDoc(docRef);

  return docSnap.get('templates');
}

export const deleteTemplate = async (userId: string, templateId: string) => {
  const docRef = doc(db, "user", userId);

  const docSnap = await getDoc(docRef);

  const docData = docSnap.data();
  
  if (docData) {
    delete docData.templates[templateId]
  }

  await setDoc(docRef, docData);

  return docData;
}

export const changeTemplateName = async (userId: string, templateId: string, newName: string) => {
  const docRef = doc(db, "user", userId);

  const docSnap = await getDoc(docRef);

  const docData = docSnap.data();

  if (docData) {
    const tempData = docData.templates[templateId];
    delete docData.templates[templateId];
    tempData.name = newName;
    docData.templates[newName] = tempData;
  }

  await setDoc(docRef, docData);

  return;
}