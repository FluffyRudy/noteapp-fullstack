import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./component/Header";
import { ProtectedRoute } from "./component/ProtectedRoute";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

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
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
