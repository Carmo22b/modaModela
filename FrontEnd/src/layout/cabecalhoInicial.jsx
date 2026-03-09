import React from "react";
import "./cabecalhoInicial.css";
import { useLocation } from "react-router-dom";

const CabecalhoInicial = ({ usuario, onLogin, onCadastro, onLogout, onCard}) => {
    const location = useLocation();
    const isMoldesPage = location.pathname === "/moldes";
    return (
        <header className="cabecalho-container">
            <div className="cabecalho-logo">
                <span className="logo-icon">👗</span>
                <span className="logo-text">ModaModela</span>
            </div>
            {/* Só mostra a nav se não estiver na página de moldes */}
            {!isMoldesPage ? (
                <nav className="cabecalho-nav">
                    <a href="#home">Início</a>
                    <a href="#produtos">Produtos</a>
                    <a href="#sobre">Sobre</a>
                    <a href="#contato">Contato</a>
                </nav>
            ) : (
                <>
                    <nav className="search-box">
                        <input type="search" name="procurar" id="procurar" placeholder="Ex: Moldes femininos..." />
                        <button>🔍</button>
                    </nav>
                    <div className="cart" onClick={onCard}>
                        <span className="cart-price">R$ 0,00</span>
                        <span className="cart-icon">🛒</span>
                        <span className="cart-count">0</span>
                    </div>
                </>
            )}
            <div className="cabecalho-actions">
                {usuario ? (
                    <>
                        <span className="cabecalho-usuario-nome">Olá, {usuario.nome}</span>
                        <button className="cabecalho-btn cabecalho-btn-logout" onClick={onLogout}>Sair</button>
                    </>
                ) : (
                    <>
                        <button className="cabecalho-btn cabecalho-btn-login" onClick={onLogin}>Login</button>
                        <button className="cabecalho-btn cabecalho-btn-cadastro" onClick={onCadastro}>Cadastre-se</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default CabecalhoInicial;
