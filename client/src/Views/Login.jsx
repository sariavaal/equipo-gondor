import UserForm from "../components/UserForm";
import {Link} from 'react-router-dom';

const LoginView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Sesion</h1>
        <UserForm formType="login"/>
        <Link to="/register" className="text-blue-500 hover:text-blue-700 mt-4">No tienes una cuenta? Registrate</Link>
        </div>
    );
}

export default LoginView
