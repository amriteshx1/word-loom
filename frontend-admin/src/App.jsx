import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/loginpage';
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Posts from "./pages/posts";
import Comments from "./pages/comments";
import Support from "./pages/support";
import Blog from "./pages/newblog";


function App() {

  return (
    <Router>
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
    </Router>
  );
}

export default App;