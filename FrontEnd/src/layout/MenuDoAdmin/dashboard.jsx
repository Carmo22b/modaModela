import React from "react";
import "./dashboard.css";

const Dashboard = () => {
	return (
		<div className="admin-dashboard">
			<h2>Dashboard</h2>
			<div className="dashboard-cards">
				<div className="dashboard-card">
					<span className="dashboard-card-title">Moldes cadastrados</span>
					<span className="dashboard-card-value">12</span>
				</div>
				<div className="dashboard-card">
					<span className="dashboard-card-title">Pedidos recebidos</span>
					<span className="dashboard-card-value">8</span>
				</div>
				<div className="dashboard-card">
					<span className="dashboard-card-title">Clientes</span>
					<span className="dashboard-card-value">5</span>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
