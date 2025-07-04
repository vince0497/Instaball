import FileUploader from '@/components/fileUploader';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/context/userAuthContext';
import { FileEntry, PhotoMeta, Post } from '@/types';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import st from './FormView.module.scss';
import { OutputFileEntry } from '@uploadcare/react-uploader';
import MOCK_DATA from './mocks';
import { createPost } from '@/repository/post.service';
import { useNavigate } from 'react-router-dom';

interface ICreatePostProps{

}
type FormType = {

  files: OutputFileEntry[];
}

const CreatePost:React.FunctionComponent<ICreatePostProps> = (props) => {
    const {user } = useUserAuth();
    // const [fileEntry,setFileEntry] = useState<FormType>({
    //     files: [],
    // });

    //MOCK_DATA.files
    const navigate = useNavigate();
    const [fileEntry, setFileEntry] = useState<FormType['files']>([]);
    

    const [theme, setTheme] = useState<'light' | 'dark'>(document.body.classList.contains('theme--dark') ? 'dark' : 'light');

    const [post, setPost] = React.useState<Post>({
        caption: "",
        photos:[],
        likes: 0,
        userlikes: [],
        userId: null,
        date: new Date()
    });

    const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
         e.preventDefault();
         console.log("Handle submit ",fileEntry);
         console.log("The create post is ",post);


        const photoMeta: PhotoMeta[] = (fileEntry as { cdnUrl: string; uuid: string }[]).map((file) => ({
            cdnUrl: file.cdnUrl!,
            uuid: file.uuid!,
         }));

         if(user != null){
            const newPost: Post = {
            ...post,
            userId: user?.uid,
            photos: photoMeta,
            username: user.displayName!,
            photoURL: user.photoURL!,
            };

            console.log("The new post ",newPost);
            await createPost(newPost);
            navigate("/");
         }else{
            navigate("/login");
         }
    }
    return (
         <Layout>
            <div className="flex justify-center">
                <div className="border max-w-3xl w-full">
                    <h3 className="bg-slate-800 text-white text-center text-lg p-2">Create Post</h3>
                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <Label className="mb-4" htmlFor="caption">Photo Caption</Label>
                                <Textarea className="mb-8" id="caption" placeholder="What's in your photo?"
                                value={post.caption}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setPost({...post, caption: e.target.value})
                                }
                                />

                    <div className="flex flex-col"></div>   
                    <Label className="mb-4" htmlFor="photo">Photos</Label>    
               
                    <div >
                    
                        <FileUploader
                         uploaderClassName={st.fileUploader}
                        files={fileEntry}
                        onChange={setFileEntry}
                        theme={theme}
                        preview={true}
                        />
                     </div>
                </div>

                            <Button className="mt-8 w-32" type="submit">Post</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreatePost;