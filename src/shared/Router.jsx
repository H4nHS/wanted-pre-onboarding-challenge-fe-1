import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign from "../components/Sign";
import Todo from "../components/Todo";
import Login from "../components/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
