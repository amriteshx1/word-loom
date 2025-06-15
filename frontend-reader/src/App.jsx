import { useEffect } from "react";
import { useLocation, useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Feed from "./pages/feed";
import Post from "./pages/post";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/profile";
import Story from "./pages/story";

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/feed", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
    <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/story" element={<Story />} />
      <Route path="/feed" element={<Layout />}>
        <Route index element={<Feed />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
