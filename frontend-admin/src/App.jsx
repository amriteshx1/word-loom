import { useEffect } from "react";
import { useLocation, useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/loginpage';
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Posts from "./pages/posts";
import Comments from "./pages/comments";
import Support from "./pages/support";
import Blog from "./pages/newblog";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";  

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Signed in successfully!");
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
    <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="comments" element={<Comments />} />
        <Route path="support" element={<Support />} />
        <Route path="newBlog" element={<Blog />} />
        <Route path="edit/:postId" element={<Blog />} />
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