import { db } from "@/firebaseConfig";
import { Post } from "@/types";
import { addDoc, collection, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const createPost  = (post: Post) => {
    return addDoc(collection(db,COLLECTION_NAME),post)
};

export const getPost = () => {
    const q = query(collection(db,COLLECTION_NAME), orderBy("date","desc"))
    return getDocs(q);
}


export const getPostByUserId = (id:string) => {
    const q = query(collection(db,COLLECTION_NAME),where("userId","==",id)); 
    return getDocs(q);
} 