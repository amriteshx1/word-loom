import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Feed from "./pages/feed";
import Post from "./pages/post";

function App(){
  return(
    <Router>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/post/:id" element={<Post />} />

      </Routes>
    </Router>
  )
}

export default App;
