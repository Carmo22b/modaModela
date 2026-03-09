import React, { useState } from "react";
import "./formularioDoAdminLogin.css"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormularioDoAdminLogin = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        usuario: "",
        senha: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8765/api/loginAdmin", form, {
                withCredentials: true
            })

            setForm({ usuario: "", senha: "" })

            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message)
                // Redireciona
                navigate("/telaFormularioAdmin/TelaAdmin");
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log("veio com algum erro: ", error);

            toast.error("Erro ao logar");
        }
    }


    return (
        <form className="admin-login-form" onSubmit={handleSubmit}>
            <h2>Painel do Administrador</h2>
            <div className="admin-field">
                <label htmlFor="admin-usuario">Usuário</label>
                <input type="text" id="admin-usuario" name="usuario" onChange={handleChange} value={form.usuario} placeholder="Digite o usuário" required />
            </div>
            <div className="admin-field">
                <label htmlFor="admin-senha">Senha</label>
                <input type="password" id="admin-senha" name="senha" onChange={handleChange} value={form.senha} placeholder="Digite a senha" required />
            </div>
            <button type="submit" className="admin-btn-login">Entrar</button>
        </form>
    );
}

export default FormularioDoAdminLogin;