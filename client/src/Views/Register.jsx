import UserForm from "../components/UserForm";
import {Link} from 'react-router-dom';
const RegisterView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <UserForm formType="register"/>
        <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4">Ya tienes una cuenta? Inicia Sesion</Link>
        </div>
    );
}

export default RegisterView