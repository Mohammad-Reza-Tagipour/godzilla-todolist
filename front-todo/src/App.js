import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Members from "./pages/Members";
import Home from "./pages/Home";
import History from "./pages/History";
// import List from "./pages/list/List";
// import Hotel from "./pages/hotel/Hotel";
const url = "https://gozilla-front.onrender.com";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Members" element={<Members />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/History" element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
