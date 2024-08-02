import "./App.css"
import UserContext from "./hooks/UserContext";
import { useState } from "react";
import RegisterView from "./Views/Register";
import LoginView from "./Views/Login";
import Dashboard from "./Views/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userInfo = userDetails ? userDetails : null;
  const [user, setUser] = useState(userInfo);

  const setUserKeyValue = (clave, valor) => {
    setUser({ ...user, [clave]: valor });
  };
  const objetoContexto = {
    user,
    setUser,
    setUserKeyValue,
  };
  return (
    <UserContext.Provider value={objetoContexto}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

