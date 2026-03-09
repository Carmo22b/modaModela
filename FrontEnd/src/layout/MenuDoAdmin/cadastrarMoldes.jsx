import React, { useState } from "react";
import "./cadastrarMoldes.css";
import { toast } from "react-toastify";
import axios from "axios";

const CadastrarMoldes = () => {
	const [form, setForm] = useState({
		nome: "",
		descricao: "",
		preco: "",
		imagem: null
	});
	const [fileName, setFileName] = useState("");

	const formatarPreco = (valor) => {
		valor = valor.replace(/\D/g, "");

		if (!valor) return "";

		valor = (parseInt(valor) / 100).toFixed(2);

		return valor.replace(".", ",");
	};

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setForm({ ...form, [name]: files[0] });
			setFileName(files[0] ? files[0].name : "");
		} else if (name === "preco") {
			setForm({ ...form, [name]: formatarPreco(value) });
		}
		else {
			setForm({ ...form, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("nome", form.nome);
		formData.append("descricao", form.descricao);
		formData.append("preco", form.preco);
		formData.append("imagem", form.imagem);

		try {

			const response = await axios.post("http://localhost:8765/api/cadastrarMoldes", formData);

			toast.success("Molde cadastrado com sucesso!");

			console.log(response.data);

		} catch (error) {
			console.log(error);

			toast.error("Erro ao cadastrar!");

		}
	};

	return (
		<div className="admin-cadastrar-moldes">
			<h2>Cadastrar Novo Molde</h2>
			<form className="cadastrar-moldes-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Nome do Molde</label>
					<input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Molde de Vestido" required />
				</div>
				<div className="form-group">
					<label>Descrição</label>
					<textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição detalhada do molde" required />
				</div>
				<div className="form-group">
					<label>Preço (R$)</label>
					<input type="text" name="preco" value={form.preco} onChange={handleChange} placeholder="Ex: 29,90" required />
				</div>
				<div className="form-group">
					<label>Imagem</label>
					<label className="custom-file-label">
						Selecionar Imagem
						<input type="file" name="imagem" onChange={handleChange} required />
						<span className="file-name">{fileName || "Nenhum arquivo selecionado"}</span>
					</label>
				</div>
				<button type="submit" className="btn-cadastrar">Cadastrar Molde</button>
			</form>
		</div>
	);
};

export default CadastrarMoldes;
