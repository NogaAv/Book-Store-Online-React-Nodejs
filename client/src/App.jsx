import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/Auth.context.jsx';
import CartContextProvider from './contexts/cart.context.jsx';
import UserContextProvider from './contexts/User.context.jsx';
import SecurityModeContextProvider from './contexts/SecurityMode.context.jsx';
import Header from './components/shared/header/Header.component.jsx';
import Footer from './components/shared/footer/Footer.component.jsx';
import HomePage from './pages/home-page/HomePage.component.jsx';
import LoginPage from './pages/login-page/LoginPage.component.jsx';
import SignupPage from './pages/signup-page/SignupPage.component.jsx';
import CartPage from './pages/cart-page/CartPage.component.jsx';
import BookPage from './pages/book-page/BookPage.component.jsx';
import PageNotFound from './pages/page-not-found/PageNotFound.component.jsx';
import ModeSwitch from './components/shared/mode-switch/ModeSwitch.component.jsx';
import DashBoardPage from './pages/admin/dashboard-page/DashBoardPage.component.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <SecurityModeContextProvider>
                    <UserContextProvider>
                        <CartContextProvider>
                            <Header />

                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="login" element={<LoginPage />} />
                                <Route path="signup" element={<SignupPage />} />
                                <Route path="cart" element={<CartPage />} />
                                <Route path="book/:id" element={<BookPage />} />
                                <Route path="admin/dashboard" element={<DashBoardPage />} />

                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                            <Footer />
                        </CartContextProvider>
                    </UserContextProvider>
                </SecurityModeContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;
