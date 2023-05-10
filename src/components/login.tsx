import {FormEvent, useState, useRef} from "react";
import classlinklogo from "..//assets/classlinklogo.svg";
import axios from "axios";

const Login = () => {
    document.title = "Classlink - Login";

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
        <div className="fixed bottom-0 top-0 right-0 left-0 bg-gray-100">
            <div className="flex items-center justify-center h-screen" style={{touchAction: "none"}}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white py-5 rounded-xl shadow-2xl ">
                        <div className="flex items-center justify-center mb-4">
                            <img src={classlinklogo} alt=""/>
                        </div>
                        <div className="flex items-center text-lg font-bold justify-center mb-12">
                            <h1>Login to classlink</h1>
                        </div>
                        <div>{error !== "" &&
                            <h1 className="flex mb-4 text-white rounded bg-red-500 mx-10 py-2 items-center justify-center">{error}</h1>}</div>
                        <div className="px-10">
                            <label htmlFor="" className="text-gray-700 block">
                                Username
                            </label>
                            <input
                                ref={nameRef}
                                placeholder="Enter your username"
                                required={true}
                                type="text"
                                className="block w-full py-2 bg-gray-50 rounded border-none mb-4 transition delay-50 focus:ring-blue-500 focus:ring-2"
                            />

                            <label htmlFor="" className="text-gray-700">
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                placeholder="Enter your password"
                                required={true}
                                type="password"
                                className="w-full py-2 bg-gray-50 rounded border-none mb-14 transition delay-50 focus:ring-blue-500 focus:ring-2"
                            />
                            <button
                                className="w-full rounded mt-4 text-white bg-blue-500 shadow-lg transition delay-75 shadow-blue-500/50 mb-4 py-2 hover:opacity-80 hover:-translate-y-1">
                                Login
                            </button>
                            <div className=" text-xs flex items-center justify-center">
                                <p>
                                    Trouble with login?{" "}
                                    <a className=" text-blue-700" href="">
                                        Contact for help.
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
