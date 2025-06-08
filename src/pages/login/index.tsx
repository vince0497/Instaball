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
import { UserLogIn } from '@/types';
import { Form, Link,  useNavigate}  from 'react-router-dom';
import { useUserAuth } from '@/context/userAuthContext';

interface ILoginProps{

}
  
const initialValue: UserLogIn = {
    email:"",
    password:"",
  }

const Login: React.FunctionComponent<ILoginProps> = (props) =>{


  const {googleSignIn, logIn} = useUserAuth();
  const navigate = useNavigate();

  const [userLogInInfo, setUserLogInInfo] = React.useState<UserLogIn>(initialValue);

  const handleSignup = async(e: React.MouseEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    try{
      console.log("User info is ", userLogInInfo )
     await logIn(userLogInInfo.email, userLogInInfo.password);
      navigate("/");
    }catch(error){
      console.log(error)
    }
     
  }//end of handle submit

  const handleGoogleSignIn = async(e: React.MouseEvent<HTMLElement>) => {
   e.preventDefault();
    try{
      console.log("Heelo")
       await googleSignIn();
       navigate("/");
    }catch(error){
      console.log(error)
    }

  }// end of handleGoogleSignIn


    return (

         <div className="bg-slate-800 h-screen w-full flex flex-col justify-center  items-center ">
              <div className="container mx-auto justify-center"></div>
              <div className=" max-w-lg rounded-xl border bg-card text-card-foreground ">
              <Card>
              <form onSubmit={handleSignup}>
              <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Instaball</CardTitle>
                <CardTitle className="text-1xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
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
                  value={userLogInInfo.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setUserLogInInfo({...userLogInInfo,email: e.target.value})
                  }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" 
                  placeholder="Password"
                  value={userLogInInfo.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setUserLogInInfo({...userLogInInfo,password: e.target.value})
                  }
                  />
                </div>
                
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button className="w-full mt-2" type="submit"> Login</Button>
                  
                  <p className="mt-3 text-sm text-center">
                    Don't have account? <Link to="/signup">Sign Up Now!</Link>
                  </p>
              </CardFooter>
              </form> 
            </Card>
             </div>
            </div>
    );
}

export default Login;