import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";
import UserStories from "./components/UserStories";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/slice/socketSlice";
import { setOnlineUser } from "./redux/slice/chatSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const {onlineUser} = useSelector((state)=>state?.chat);
  const {socket} = useSelector((state)=>state.socket)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const socket_io = io("http://localhost:4000", {
        query: {
          userId: user.id,
        },
        transports: ["websocket", "polling"] 
      });
      dispatch(setSocket(socket_io));
      socket_io.on("connect", () => {
        console.log("Socket connected:", socket_io.id);
      });
      socket_io.on("getOnlineUsers", (user) => {
        console.log("USER",user)
        dispatch(setOnlineUser(user));
      });
      return () => {
        socket_io?.close();
        dispatch(setSocket(null));
      };
    } else {
      socket?.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);
  return (
    <div>
      <Routes>
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<MainComponent />} path="/">
          <Route element={<Home />} path="/" />
          <Route element={<UserStories />} path="stories" />
          <Route element={<Profile />} path="/profile/:id" />
          <Route element={<EditProfile />} path="/profile/edit/:id" />
          <Route element={<ChatPage />} path="/chat" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
