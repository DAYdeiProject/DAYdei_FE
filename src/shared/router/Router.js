import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import JoinPage from '../../pages/JoinPage';
import LoginPage from '../../pages/LoginPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
