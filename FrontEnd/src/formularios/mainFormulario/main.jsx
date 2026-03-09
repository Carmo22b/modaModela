
import React, { useEffect, useState } from "react";
import CabecalhoInicial from "../../layout/cabecalhoInicial";
import CorpoInicial from "../../layout/corpoInicial";
import RodapeInicial from "../../layout/rodapeInicial";
import Modal from "../../layout/Modal";
import FormularioLogin from "../formularioLogin";
import FormularioCadastrar from "../formularioCadastrar";

const Main = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "login" ou "cadastro"
    const [usuario, setUsuario] = useState(null); // { nome: "Fulano", email: "fulano@..." }

    // Recupera usuário do cookie httpOnly via backend
    useEffect(() => {
        fetch("http://localhost:8765/api/usuarioLogado", {
            credentials: "include"
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if (data && data.success) {
                setUsuario(data.usuario);
            } else {
                setUsuario(null);
            }
        });
    }, []);

    // Funções para abrir modal
    const handleOpenLogin = () => {
        setModalType("login");
        setModalOpen(true);
    };
    const handleOpenCadastro = () => {
        setModalType("cadastro");
        setModalOpen(true);
    };

    // Função para login bem-sucedido
    // Atualiza estado após login
    const handleLoginSuccess = (usuarioLogado) => {
        setUsuario(usuarioLogado);
        setModalOpen(false);
    };

    // Função para logout
    const handleLogout = () => {
        fetch("http://localhost:8765/api/logoutUsuario", {
            method: "POST",
            credentials: "include"
        }).then(() => setUsuario(null));
    };

    return (
        <>
            <CabecalhoInicial
                usuario={usuario}
                onLogin={handleOpenLogin}
                onCadastro={handleOpenCadastro}
                onLogout={handleLogout}
            />
            <CorpoInicial />
            <RodapeInicial />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {modalType === "login"
                    ? <FormularioLogin onLoginSuccess={handleLoginSuccess} />
                    : <FormularioCadastrar />}
            </Modal>
        </>
    );
};

export default Main;