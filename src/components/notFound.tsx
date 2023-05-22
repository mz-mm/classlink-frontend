const NotFound = () => {
    return (
        <div className="touch-none text-black text-2xl flex flex-col justify-center items-center h-screen">
            <h1 className="pb-8 text-6xl">404</h1>
            <p className="">Страница не найдена</p>
            <button onClick={() => {
                window.location.href = "/"
            }} className="py-2 px-4 mt-3 bg-tertiary rounded text-white text-sm">Вернуться в вход
            </button>
        </div>
    );
}

export default NotFound;