import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./component/Header";
import { ProtectedRoute } from "./component/ProtectedRoute";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";

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
                    {/* <Route  /> */}
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
