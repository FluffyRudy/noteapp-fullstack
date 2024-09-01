import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./component/Header";
import { ProtectedRoute } from "./component/ProtectedRoute";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import { NotFound } from "./pages/NotFound";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                        path='/'
                    />
                    <Route
                        element={<Login />}
                        path='/login'
                    />
                    <Route
                        element={<Register />}
                        path='/register'
                    />
                    <Route
                        element={<NotFound />}
                        path='*'
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
