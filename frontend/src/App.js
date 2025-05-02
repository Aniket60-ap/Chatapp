import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/login-register/Signup";
import HomePage from "./components/pages/HomePage";
import Login from "./components/login-register/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/SocketSlice";
import { setOnlineUsers } from "./redux/UserSlices";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  // const[socket,setSocket]=useState(null)
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:4000", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
