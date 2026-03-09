import React from "react";
import "./clientes.css";

const Clientes = () => {
	return (
		<div className="admin-clientes">
			<h2>Clientes</h2>
			<table className="clientes-table">
				<thead>
					<tr>
						<th>Nome</th>
						<th>Email</th>
						<th>Pedidos</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Maria Silva</td>
						<td>maria@email.com</td>
						<td>2</td>
					</tr>
					<tr>
						<td>João Souza</td>
						<td>joao@email.com</td>
						<td>1</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Clientes;
