import Logo from "../assets/logo.svg";
import {FormEvent, useState, useRef} from "react";
import axios from "axios";

const Login = () => {

    const [error, setError] = useState("");

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (nameRef.current && passwordRef.current) {
            const formData = new FormData();
            formData.append("username", nameRef.current.value);
            formData.append("password", passwordRef.current.value);
            try {
                const response = await axios.post("http://localhost:8000/api/login", formData);
                const token = response.data.access_token;
                localStorage.setItem("token", token);
                window.location.href = "/dashboard";
            } catch (error: Error | any) {
                setError(error.response.data.detail);
            }
        }
    };

    return (
        <div className="fixed bottom-0 top-0 right-0 left-0 touch-none flex justify-center items-center h-screen">
            <div className="py-5 px-6 bg-login-bg rounded-xl lg:shadow-lg">
                <div className="mx-8">
                    <div className="flex mb-4">
                        <img src={Logo} alt="logo" className="pointer-events-none w-8 h-8"/>
                        <p className="ml-1 font-semibold">Classlink</p>
                    </div>
                    <h1 className="mb-10 font-semibold mr-8 text-3xl">Войти Classlink</h1>
                    <div>{error !== "" &&
                        <h1 className="flex mb-6 text-white rounded bg-red-500 py-2 items-center justify-center">{error}</h1>}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="text-lg font-medium text-login-text">
                            <div className="mb-3">
                                <label>Имя пользователя</label>
                            </div>
                            <div className="mb-8">
                                <input
                                    ref={nameRef}
                                    required={true}
                                    type="text"
                                    className="py-1 px-1 font-light rounded outline outline-1 outline-login-text w-full
                                    focus:outline-blue-500 focus:outline-2"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Пароль</label>
                            </div>
                            <div className="mb-8">
                                <input
                                    ref={passwordRef}
                                    required={true}
                                    type="password"
                                    className="py-1 px-1 font-light rounded outline outline-1 outline-login-text w-full
                                    focus:outline-blue-500 focus:outline-2
                                    "
                                />
                            </div>
                            <button
                                className="mb-6 p-2 bg-tertiary rounded text-white w-full
                                hover:shadow-xl hover:shadow-indigo-400 transition duration-300 ease-in-out
                                transform hover:scale-105">Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
