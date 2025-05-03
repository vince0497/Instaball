
import { createBrowserRouter} from 'react-router-dom';
import Login from './pages/login';
import Error from './pages/error';
import Signup from './pages/signup';
import Home from './pages/home';
import Profile from './pages/profile';
import MyPhotos from './pages/myphotos';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreatePost from './pages/post';

export const router = createBrowserRouter([
    
    {
        element: <ProtectedRoutes />,
        children: [{
            path:"/",
            element: <Home />,
            errorElement: <Error />
        },
        {
            path: "/profile",
            element: <Profile />,
            errorElement: <Error />
        },
        {
            path: "/myphotos",
            element: <MyPhotos />,
            errorElement: <Error />
        },
        {
            path: "/post",
            element: <CreatePost />,
            errorElement: <Error />
        },
        {
            path: "/home",
            element: <Home />,
            errorElement: <Error />
        }
        ],
    },
  
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <Error />
    },
    
]);

export default router;