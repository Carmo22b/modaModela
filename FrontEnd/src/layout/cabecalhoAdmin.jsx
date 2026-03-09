import React from "react";
import "./cabecalhoAdmin.css";

const CabecalhoAdmin = ({ onNavigate, active }) => {
	return (
		<header className="cabecalho-admin">
			<div className="cabecalho-admin-logo">
				<span className="logo-icon">🛠️</span>
				<span className="logo-text">Painel Admin</span>
			</div>
			<nav className="cabecalho-admin-nav">
				<button className={active === "cadastrar" ? "active" : ""} onClick={() => onNavigate("cadastrar")}>Cadastrar Moldes</button>
				<button className={active === "clientes" ? "active" : ""} onClick={() => onNavigate("clientes")}>Clientes</button>
                <button className={active === "dashboard" ? "active" : ""} onClick={() => onNavigate("dashboard")}>Dashboard</button>
			</nav>
		</header>
	);
};

export default CabecalhoAdmin;
