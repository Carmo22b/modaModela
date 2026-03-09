import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8765/api/verificarAdmin", {
            withCredentials: true
        })
        .then(() => setAuth(true))
        .catch(() => setAuth(false));
    }, []);

    if (auth === null) return <p>Carregando...</p>;
    if (!auth) return <Navigate to="/telaFormularioAdmin" />;

    return children;
}
