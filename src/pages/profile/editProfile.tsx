import FileUploader from "@/components/fileUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { OutputFileEntry } from "@uploadcare/react-uploader";
import { UserProfile } from "firebase/auth";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "@/assets/images/mange.jpg";
import st from './FormView.module.scss';
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";
import { createUserProfile, updateUserProfile } from "@/repository/user.service";
import { ProfileResponse } from "@/types";
import { setUserId } from "firebase/analytics";
interface IEditProfileProps{}

type FormType = {

  files: OutputFileEntry[];
}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {id, userId, userBio, displayName, photoURL} = location.state;
    console.log("Location : ",location.state)
    const [data, setData] = React.useState<UserProfile>({
        userId,
        userBio,
        displayName,
        photoURL,
    })


    const [fileEntry, setFileEntry] = React.useState<FormType['files']>([]);
    const [theme, setTheme] = React.useState<'light' | 'dark'>(document.body.classList.contains('theme--dark') ? 'dark' : 'light');
  

     const updateProfile = async(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
            if(id){ 
                const response = await updateUserProfile(id,data);
                console.log("Update user profile ",response);
            }else{
                const response = await createUserProfile(data);
                console.log("ddattttttt -> ",data)
                console.log("Create user profile ",response);
            }
            navigate("/profile");
        } catch (error) {
            console.log("updateProfile : ",error);
        }   
        

     }//end of profile

  
     React.useEffect(()=>{
        console.log("Use efffect ",data);
        if(fileEntry.length > 0){
            setData({...data, photoURL: fileEntry[0].cdnUrl || "" });
        }
     },[fileEntry]);
    return(
        <Layout>
            <div className="flex justify-center">
                <div className="border max-w-3xl w-full">
                    <h3 className="bg-slate-800 text-white text-center text-lg p-2">Edit Profile</h3>
                    <div className="p-8">
                        <form onSubmit={updateProfile}>

                            <div className="flex flex-col">
                                <Label className="mb-4" htmlFor="photo">
                                    Profile Picture
                                </Label>

                                <div className="mb-4">
                                    {fileEntry.length > 0 ? (
                                        <img src={fileEntry[0].cdnUrl!} alt="avatar"
                                     className="w-28 h-28 rounded-full border-2 border-slate-200 object-cover" />  
                                    ): (
                                        <img src={data.photoURL ? data.photoURL: avatar} alt="avatar"
                                     className="w-28 h-28 rounded-full border-2 border-slate-200 object-cover" />
                                    
                                     )}
                                    
                                     </div>

                                <FileUploader
                                uploaderClassName={st.fileUploader}
                                files={fileEntry}
                                onChange={setFileEntry}
                                theme={theme}
                                preview={false}
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label className="mb-4" htmlFor="displayName">Display Name</Label>
                                <Input className="mb-8" id="displayName" placeholder="Enter your username"
                                value={data.displayName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData({...data, displayName: e.target.value})
                                }
                                />
                            </div>

                             <div className="flex flex-col">
                                <Label className="mb-4" htmlFor="userBio">Profile Bio</Label>
                                <Input className="mb-8" id="userBio" placeholder="Enter your bio"
                                value={data.userBio}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setData({...data, userBio: e.target.value})
                                }
                                />
                            

        
                             </div>

                            <Button className="mt-4 w-32 mr-8" type="submit">Update Profile</Button>
                             <Button variant="destructive" className="mt-4 w-32 mr-8"
                              onClick={() => navigate("/profile")}>Back to Profile</Button>
                       
                       
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfile;