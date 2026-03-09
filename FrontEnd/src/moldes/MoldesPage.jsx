import React, { useEffect, useState } from "react";
import CabecalhoInicial from "../../src/layout/cabecalhoInicial";
import RodapeInicial from "../../src/layout/rodapeInicial";
import Modal from "../../src/layout/Modal";
import FormularioLogin from "../formularios/formularioLogin";
import FormularioCadastrar from "../formularios/formularioCadastrar";
import FormularioCard from "../formularios/formularioCard";
import "./MoldesPage.css";
import axios from "axios";

const MoldesPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "login" ou "cadastro"
    const [usuario, setUsuario] = useState(null); // { nome: "Fulano", email: "fulano@..." }

    const [moldes, setMoldes] = useState([]);

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

    const handleCard = () => {
        setModalType("card");
        setModalOpen(true);
    }

    useEffect(() => {
        axios.get("http://localhost:8765/api/mostrarMoldes")
            .then(res => {
                if(res.data.success) {
                    setMoldes(res.data.moldes)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <>
            <CabecalhoInicial
                usuario={usuario}
                onLogin={handleOpenLogin}
                onCadastro={handleOpenCadastro}
                onLogout={handleLogout}
                onCard={handleCard}
            />
            <main className="moldes-main">
                <h1 className="moldes-titulo">Loja de Moldes</h1>
                <p className="moldes-sub">Escolha o molde ideal para seu projeto de costura!</p>
                <div className="moldes-lista">
                    {moldes.map((molde) => (
                        <div className="moldes-card" key={molde.id}>
                            <img src={`http://localhost:8765/img/moldes/${molde.imagem}`} alt={molde.nome} className="moldes-img" />
                            <h2>{molde.nome}</h2>
                            <p>{molde.descricao}</p>
                            <div className="moldes-preco">R$ {Number(molde.preco).toFixed(2)}</div>
                            <button className="moldes-btn-comprar">Adicionar ao carrinho</button>
                        </div>
                    ))}
                </div>
            </main>

            <RodapeInicial />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {modalType === "login"
                    ? <FormularioLogin onLoginSuccess={handleLoginSuccess} />
                    : modalType === "cadastro"
                        ? <FormularioCadastrar />
                        : <FormularioCard />}
            </Modal>

        </>
    );
};

export default MoldesPage;
