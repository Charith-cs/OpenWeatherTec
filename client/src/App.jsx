import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Update from "./pages/Update";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Login/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/>:<Login/>}/>
        <Route path="/register" element={user ? <Navigate to="/"/>:<Register/>}/>
        <Route path="/update" element={user ? <Update/>:<Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default App
