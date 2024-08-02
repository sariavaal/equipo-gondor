import { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

//mostrar mensaje de bienvenida y la hora que ingreso el usuario

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setWelcomeMessage("Buenos Dias");
    } else if (hour >= 12 && hour < 18) {
      setWelcomeMessage("Buenas Tardes");
    } else {
      setWelcomeMessage("Buenas Noches");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Hello World! Hola {user.name} <span role="img" aria-label="wave">👋</span>
        </h1>
        <h2 className="text-xl text-gray-600 mb-2">{welcomeMessage}</h2>
        <h3 className="text-lg text-gray-500">
          Hora Actual: {new Date().toLocaleTimeString()}
        </h3>
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        Salir
      </button>
    </div>
  );
};

export default Dashboard;
