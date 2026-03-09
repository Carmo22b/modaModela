
import React from "react";
import "./corpoInicial.css";
import { useNavigate } from "react-router-dom";

const CorpoInicial = () => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate("/moldes");
    };
    return (
        <main className="corpo-inicial">
            <div className="banner">
                {/* Seção Início */}
                <section id="home" className="corpo-section corpo-inicio">
                    <h1>Bem-vindo à ModaModela!</h1>
                    <p>O melhor e-commerce de modelagem de roupas, com tendências, qualidade e praticidade para você criar e se inspirar.</p>
                    <a href="#produtos" className="corpo-btn">Ver Produtos</a>
                </section>
            </div>

            {/* Seção Produtos */}
            <section id="produtos" className="corpo-section corpo-produtos">
                <h2>Nossos Produtos</h2>
                <div className="produtos-lista">
                    <div className="produto-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
                        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" alt="Molde de Vestido" />
                        <h3>Molde de Vestido</h3>
                        <p>Modelos exclusivos para todos os estilos e tamanhos.</p>
                    </div>
                    <div className="produto-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
                        <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" alt="Molde de Camisa" />
                        <h3>Molde de Camisa</h3>
                        <p>Perfeitos para alfaiataria, casual ou social.</p>
                    </div>
                    <div className="produto-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
                        <img src="https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=400&q=80" alt="Molde de Calça" />
                        <h3>Molde de Calça</h3>
                        <p>Conforto e caimento impecável para todos os corpos.</p>
                    </div>
                </div>
            </section>

            {/* Seção Sobre */}
            <section id="sobre" className="corpo-section corpo-sobre">
                <h2>Sobre Nós</h2>
                <p>
                    A ModaModela nasceu da paixão por moda e costura, trazendo praticidade e inovação para quem ama criar suas próprias peças. Nossa missão é democratizar o acesso a moldes de qualidade, com atendimento personalizado e suporte para todos os níveis de experiência.
                </p>
            </section>
        </main>
    );
};

export default CorpoInicial;