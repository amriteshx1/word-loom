import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Feed from "./pages/feed";

function App(){
  return(
    <Router>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/feed" element={<Feed />} />

      </Routes>
    </Router>
  )
}

export default App;
