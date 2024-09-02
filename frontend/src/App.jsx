import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import NoteDetailUpdate from "./pages/NoteDetailUpdate";
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
                        element={
                            <ProtectedRoute>
                                <NoteDetailUpdate />
                            </ProtectedRoute>
                        }
                        path='note/:noteID'
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
