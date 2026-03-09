import React, { useState } from "react";
import "./formularioCadastrar.css";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormularioCadastrar = () => {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.nome.trim() === "" || form.email.trim() === "" || form.senha.trim() === "" || form.confirmarSenha.trim() === "") {
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
        if (form.senha !== form.confirmarSenha) {
            toast.error("As senhas não estão iguais!");
            return;
        }
        if (form.nome.length > 100) {
            toast.error("O nome tem que ter no máximo 100 caracteres!")
            return
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
            const response = await axios.post("http://localhost:8765/api/cadastrar", form);
            console.log(response.data);

            setForm({ nome: "", email: "", senha: "", confirmarSenha: "" })

            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {

            console.log(error);

            toast.error("Erro ao cadastrar!");
        }
    };

    return (
        <form className="form-cadastrar" onSubmit={handleSubmit}>
            <h2>Cadastre-se</h2>

            <label>
                Nome
                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                />
            </label>
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
                        placeholder="Senha"
                        value={form.senha}
                        onChange={handleChange}
                    />
                </label>
                <button className="mostrarSenha" type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? "🙈" : "👁️"}
                </button>
            </div>

            <div className="divSenhas">
                <label>
                    Confirmar senha
                    <input
                        type={mostrarConfirmarSenha ? "text" : "password"}
                        name="confirmarSenha"
                        placeholder="Confirmar senha"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                    />
                </label>
                <button className="mostrarConfirmarSenha" type="button" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                    {mostrarConfirmarSenha ? "🙈" : "👁️"}
                </button>
            </div>
            <button type="submit" className="form-btn">Cadastrar</button>
        </form>
    );
};

export default FormularioCadastrar;