import {Route, Routes} from 'react-router-dom';
import NotFound from './components/notFound.tsx';
import Login from './components/login.tsx';
import Dashboard from './components/dashboard/dashboard.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
