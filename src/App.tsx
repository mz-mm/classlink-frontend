import {useState} from "react";
import produce from "immer";
import Login from "./components/login";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./components/dashboard";
import AdminPanel from "./components/admin/adminpanel";
import CreateLesson from "./components/admin/createlesson";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="adminpanel" element={<AdminPanel/>} />
      <Route path="adminpanel/createlesson" element={<CreateLesson />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default App;
