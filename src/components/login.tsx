import Logo from "../assets/logo.svg";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { decodeToken } from "../services/decode-token.tsx";

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
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          formData
        );
        const token = response.data.access_token;
        const decode = decodeToken(token);
        const name = decode?.name;
        const role = decode?.role;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);
        window.location.href = "/dashboard";
      } catch (error: Error | any) {
        setError(error.response.data.detail);
      }
    }
  };

  const handleForgotPassword = (event: FormEvent) => {
    event.stopPropagation();
    console.log("Forgot Password");
  };

  return (
    <div className="touch-none">
      <div className="ml-5 mt-5 hidden md:flex">
        <img src={Logo} alt="logo" />
        <h1 className="font-semibold">classlink</h1>
      </div>
      <div className="fixed bottom-0 left-0 right-0 top-0 flex h-screen items-center justify-center overflow-scroll">
        <div className="h-full w-screen rounded bg-white px-14 py-20 sm:px-32 md:h-max md:w-[450px] md:px-14">
          <div>
            {error !== "" && (
              <h1 className="mb-4 w-full rounded border-2 border-red-300 bg-red-600 py-3 text-center text-red-200">
                {error}
              </h1>
            )}
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Войти Classlink</h1>
            <p className="text-gray-400">Введите свои данные для входа.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="font-semibold">Имя пользователя</label>
            </div>
            <div className="mb-4">
              <input
                ref={nameRef}
                required={true}
                placeholder="Введите имя пользователя"
                type="text"
                className="w-full rounded-xl border-2 bg-placeholder px-5 py-2"
              />
            </div>
            <div className="mb-2 flex font-semibold">
              <label className="">Пароль</label>
              <label
                onClick={handleForgotPassword}
                className="ml-auto text-tertiary transition hover:cursor-pointer hover:text-indigo-700"
              >
                Забыли пароль?
              </label>
            </div>
            <div className="mb-12">
              <input
                ref={passwordRef}
                required={true}
                placeholder="Введите пароль"
                type="password"
                className="w-full rounded-xl border-2 bg-placeholder px-5 py-2"
              />
            </div>
            {error !== "Rate limit exceeded." ? (
              <button className="w-full rounded-xl border-2 bg-tertiary px-5 py-2 text-white transition hover:bg-indigo-700 active:border-blue-500">
                Войти
              </button>
            ) : (
              <div className="w-full cursor-not-allowed rounded-xl border-2 bg-indigo-900 px-5 py-2 text-center text-white transition">
                Войти
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
