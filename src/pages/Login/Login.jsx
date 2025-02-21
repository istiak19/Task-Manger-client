import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import pic from '../../assets/pic2 (3).jpg'

const Login = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    userId: result.user.uid,
                };
                const res = axios.post('https://taskmanager-server-three.vercel.app/users', userInfo)
                const data = res.data;
                // console.log(data)
                navigate('/');
            })
            .catch(error => {
                // console.error("Google Sign-In Error:", error.message);
            });
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <img className="w-xl" src={pic} alt="" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
                    <button onClick={handleGoogleLogin} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;