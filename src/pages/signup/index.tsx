import * as React from 'react';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserSignIn } from '@/types';
import { Form, Link,  useNavigate}  from 'react-router-dom';
import { useUserAuth } from '@/context/userAuthContext';
import  coverImg  from "@/assets/images/gr.jpg";
import  pegasus  from "@/assets/images/Black Pegasus.png";
import  mange  from "@/assets/images/mange.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

interface ISignupProps{

}

const initialValue: UserSignIn = {
  email:"",
  password:"",
  confirmPassword:"",
}

const Signup: React.FunctionComponent<ISignupProps> = () => {
   const {googleSignIn, signUp} = useUserAuth();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);

  const handleSignup = async(e: React.MouseEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    try{
      console.log("User info is ", userInfo )
      await signUp(userInfo.email, userInfo.password);
      navigate("/");
    }catch(error){
      console.log(error)
    }
     
  }//end of handle submit

  const handleGoogleSignIn = async(e: React.MouseEvent<HTMLElement>) => {
   e.preventDefault();
    try{
      console.log("Hesssselo")
      await googleSignIn();
      navigate("/");
    }catch(error){
      console.log(error)
    }

  }// end of handleGoogleSignIn

  return (
      <div className="bg-slate-800 h-screen w-full h-f flex flex-col justify-center">
      <div className="container p-1 h-full mt-10">
      <div className="flex justify-center items-center w-full">
        <div className=" w-2/3  lg:block">
            <div className="grid grid-cols-2 gap-1">
              <img src="https://images.unsplash.com/photo-1715860738421-b30b98f8614f?q=80&w=1454&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-3xl w-2/3 h-auto aspect-video place-self-end" />
              <img src="https://plus.unsplash.com/premium_photo-1679518412561-32ccb6f65c0a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-3xl w-2/3 h-50 aspect-auto "/>
              <img src="https://plus.unsplash.com/premium_photo-1663040458693-792a27068dc2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-3xl w-2/3 h-50 aspect-auto place-self-end"/>
              <img src="https://plus.unsplash.com/premium_photo-1684772873056-474a10d466ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-3xl w-2/3 h-auto aspect-video "/>
              
           </div>
        </div>
        
        
      <div className="max-w-xl rounded-xl border bg-card text-card-foreground ">
      <Card>
      <form onSubmit={handleSignup}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Instaball</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="grid grid-cols-1 gap-6">
          {/* <Button variant="outline">
            <Icons.gitHub />
            GitHub
          </Button> */}
          <Button variant="outline" onClick={handleGoogleSignIn}>
            <Icons.google className="mr-2 h-4 w-4"/>
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email"
          
          placeholder="m@example.com"
          value={userInfo.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setUserInfo({...userInfo,email: e.target.value})
          }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" 
          placeholder="Password"
          value={userInfo.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setUserInfo({...userInfo,password: e.target.value})
          }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" 
          placeholder="Confirm Password"
          value={userInfo.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setUserInfo({...userInfo,confirmPassword: e.target.value})
          }
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" type="submit"> Create account</Button>
      </CardFooter>
      </form> 
    </Card>
    </div>

    </div>
    
    
    </div>
    </div>



    );
}

export default Signup;