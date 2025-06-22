import { db } from "@/firebaseConfig";
import { DocumentResponse, Post, ProfileResponse } from "@/types";
import { User, UserProfile } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: UserProfile) => {
    try {
        return addDoc(collection(db,COLLECTION_NAME), user);
    } catch (error) {   
        console.log("Error in create user profile "+error);
    }
}//end of create user profile


export const getUserProfile = async(userId: string) => {
    let tempData:ProfileResponse = {};
    try {
        const q = query(collection(db,COLLECTION_NAME), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        if(querySnapshot.size > 0){
            querySnapshot.forEach((doc) => {    
                const userData = doc.data() as UserProfile;
                tempData = {
                    id: doc.id,
                    ...userData
                }
                 
            });
        }else{
            console.log("No such user profile");
            
        }
    } catch (error) {
        console.log("Error in get user profile "+error);
    }
    return tempData;
} //end of getuserprofile


export const updateUserProfile = async(id: string, user: UserProfile) => {

     //const docRef = doc(db, COLLECTION_NAME, id);
     console.log("meow");
     console.log(id)
     console.log(user)
    //  return updateDoc(docRef, {
    //     user
    // });
}//end of update user profile



