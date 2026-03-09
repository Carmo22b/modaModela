import React, { useState } from "react";
import "./formularioLogin.css";
import axios from "axios";
import { toast } from "react-toastify";

const FormularioLogin = ({ onLoginSuccess }) => {
    const [form, setForm] = useState({
        email: "",
        senha: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.email.trim() === "" || form.senha.trim() === "") {
            toast.error("Preencha todos os campos!");
            return;
        }
        if (form.senha.length < 8) {
            toast.error("A senha tem que ter pelo menos 8 caracteres!")
            return;
        } else if (!/[a-zA-Z]/.test(form.senha) || !/\d/.test(form.senha)) {
            toast.error("A senha tem que ter números e letras!")
            return;
        }
        if (form.email.length > 150) {
            toast.error("O e-mail tem que ter no máximo 150 caracteres!")
            return
        }
        if (form.senha.length > 255) {
            toast.error("A senha tem que ter no máximo 255 caracteres!")
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            toast.error("Digite um e-mail válido!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8765/api/login", form, {
                withCredentials: true
            });

            setForm({ email: "", senha: "" });

            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message || "Login realizado com sucesso!");
                // Não passa dados do usuário, pois frontend buscará do backend após login
                onLoginSuccess && onLoginSuccess();
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log("veio com algum erro: ", error);
            toast.error("Erro ao logar");
        }

    };

    const [mostrarSenha, setMostrarSenha] = useState(false)

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                E-mail
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Seu e-mail"
                />
            </label>
            <div className="divSenhas">
                <label>
                    Senha
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        name="senha"
                        value={form.senha}
                        onChange={handleChange}
                        required
                        placeholder="Sua senha"
                    />
                </label>
                <button className="mostrarSenha" type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? "🙈" : "👁️"}
                </button>
            </div>
            <button type="submit" className="form-btn">Entrar</button>
        </form>
    );
};

export default FormularioLogin;