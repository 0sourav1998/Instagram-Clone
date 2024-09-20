import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";
import UserStories from "./components/UserStories";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<MainComponent />} path="/">
          <Route element={<Home/>} path="/"/>
          <Route element={<UserStories />} path="stories" />
          <Route element={<Profile/>} path="/profile/:id" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
