import { Formik, Form, Field, ErrorMessage } from 'formik';
import {RegisterValidationSchema, LoginValidationSchema} from '../components/UserValidations';
import UserContext from '../hooks/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserForm = ({formType}) => {
  const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        if (formType === "register") {
            registerUser(values, setErrors);
        } else {
            loginUser(values, setErrors);
        }
        setSubmitting(false);
        resetForm();
    };
    const registerUser = async (values, setErrors) => {
      try {
        await axios.post("http://localhost:8000/api/user/register", values, {
          withCredentials: true,
        });
        navigate('/');
        
      } catch (error) {
        setErrors(error.response.data);
      }
    };
    const loginUser = async (values, setErrors) => {
      try {
          const response = await axios.post("http://localhost:8000/api/user/login", values,
          { withCredentials: true });
          console.log(response.data);

      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        throw new Error('User data is missing in response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(error.response?.data || { message: error.message });
    }
  };

    return (
        <Formik
          initialValues={formType === "register" ? {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          } : {
            email: '',
            password: ''
          }}
          validationSchema={formType === "register" ? RegisterValidationSchema : LoginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-sm mx-auto">
              {formType === "register" && (
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              )}
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {formType === "register" && (
                <div className="mb-5">
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {formType === "register" ? "Register" : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      );
    };
    

export default UserForm;