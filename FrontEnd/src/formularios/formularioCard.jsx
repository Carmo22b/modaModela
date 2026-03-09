import React, { useState } from "react";
import "./formularioCard.css";

const produtos = [
    {
        id: 1,
        nome: "Molde de Vestido",
        preco: 29.90,
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        nome: "Molde de Camisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        preco: 24.90,
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        nome: "Molde de Calça",
        preco: 27.90,
        img: "https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=400&q=80"
    }
];

const FormularioCard = () => {
    const [carrinho, setCarrinho] = useState(
        produtos.map(produto => ({ ...produto, quantidade: 0, tipo: "pdf" }))
    );
    const [endereco, setEndereco] = useState({
        nome: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: ""
    });

    const handleQuantidadeChange = (id, value) => {
        setCarrinho(carrinho.map(item =>
            item.id === id ? { ...item, quantidade: Math.max(0, Number(value)) } : item
        ));
    };

    const handleTipoChange = (id, value) => {
        setCarrinho(carrinho.map(item =>
            item.id === id ? { ...item, tipo: value } : item
        ));
    };

    const handleEnderecoChange = (e) => {
        setEndereco({ ...endereco, [e.target.name]: e.target.value });
    };

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para o backend ou mostrar um resumo
        alert("Pedido realizado!\nTotal: R$ " + total.toFixed(2));
    };

    return (
        <form className="formulario-card" onSubmit={handleSubmit}>
            <h2>Carrinho de Compras</h2>
            <div className="produtos-carrinho">
                {carrinho.map(item => (
                    <div key={item.id} className="produto-carrinho">
                        <img src={item.img} alt={item.nome} className="produto-carrinho-img" />
                        <span>{item.nome}</span>
                        <span>R$ {item.preco.toFixed(2)}</span>
                        <input
                            type="number"
                            min="0"
                            value={item.quantidade}
                            onChange={e => handleQuantidadeChange(item.id, e.target.value)}
                            className="input-quantidade"
                        />
                        <select value={item.tipo} onChange={e => handleTipoChange(item.id, e.target.value)} className="input-tipo">
                            <option value="pdf">PDF</option>
                            <option value="fisico">Entrega física</option>
                        </select>
                    </div>
                ))}
            </div>
            <div className="total-carrinho">Total: R$ {total.toFixed(2)}</div>
            {/* Só mostra endereço se algum item for físico */}
            {carrinho.some(item => item.tipo === "fisico" && item.quantidade > 0) && (
                <>
                    <h3>Endereço de Entrega</h3>
                    <div className="endereco-fields">
                        <input type="text" name="nome" placeholder="Nome completo" value={endereco.nome} onChange={handleEnderecoChange} required />
                        <input type="text" name="rua" placeholder="Rua" value={endereco.rua} onChange={handleEnderecoChange} required />
                        <input type="text" name="numero" placeholder="Número" value={endereco.numero} onChange={handleEnderecoChange} required />
                        <input type="text" name="complemento" placeholder="Complemento" value={endereco.complemento} onChange={handleEnderecoChange} />
                        <input type="text" name="bairro" placeholder="Bairro" value={endereco.bairro} onChange={handleEnderecoChange} required />
                        <input type="text" name="cidade" placeholder="Cidade" value={endereco.cidade} onChange={handleEnderecoChange} required />
                        <input type="text" name="estado" placeholder="Estado" value={endereco.estado} onChange={handleEnderecoChange} required />
                        <input type="text" name="cep" placeholder="CEP" value={endereco.cep} onChange={handleEnderecoChange} required />
                    </div>
                </>
            )}
            <button type="submit" className="btn-finalizar">Finalizar Compra</button>
        </form>
    );
};

export default FormularioCard;
