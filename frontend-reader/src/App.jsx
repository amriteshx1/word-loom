import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Feed from "./pages/feed";
import Post from "./pages/post";
import Layout from "./pages/layout"; 

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/feed" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
