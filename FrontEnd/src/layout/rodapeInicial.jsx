import React from "react";
import "./rodapeInicial.css";

const RodapeInicial = () => {
	return (
		<footer className="rodape-container" id="contato">
			<div className="rodape-content">
				<div className="rodape-logo">
					<span className="logo-icon">👗</span>
					<span className="logo-text">ModaModela</span>
				</div>
				<div className="rodape-links">
					<a href="#privacidade">Política de Privacidade</a>
					<a href="#termos">Termos de Uso</a>
					<a href="#ajuda">Ajuda</a>
				</div>
				<div className="rodape-social">
					<a href="#" title="Instagram" className="social-icon">📸</a>
					<a href="#" title="Facebook" className="social-icon">📘</a>
					<a href="#" title="WhatsApp" className="social-icon">💬</a>
				</div>
                <div className="rodape-info">
                    <p><strong>Contato:</strong> (11) 98765-4321</p>
                    <address>
                        ModaModela Ltda.<br />
                        Rua da Moda, 123 - São Paulo, SP<br />
                        CNPJ: 12.345.678/0001-90
                    </address>
                </div>
			</div>
			<div className="rodape-copy">
				&copy; {new Date().getFullYear()} ModaModela. Todos os direitos reservados.
			</div>
		</footer>
	);
};

export default RodapeInicial;
