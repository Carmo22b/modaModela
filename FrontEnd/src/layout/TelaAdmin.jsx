import React, { useState } from "react";
import "./TelaAdmin.css"
import CabecalhoAdmin from "./cabecalhoAdmin";
import CadastrarMoldes from "./MenuDoAdmin/cadastrarMoldes";
import Clientes from "./MenuDoAdmin/clientes";
import Dashboard from "./MenuDoAdmin/dashboard";

const TelaAdmin = () => {
    const [changePage, setChangePage] = useState("cadastrar")

    const handleChangePage = (mudar) => {
        setChangePage(mudar)
    }

    return (
        <>
            <CabecalhoAdmin onNavigate={handleChangePage} active={changePage}></CabecalhoAdmin>

            {changePage === "cadastrar" ? (
                <CadastrarMoldes></CadastrarMoldes>
            ) : changePage === "clientes" ? (
                <Clientes></Clientes>
            )  : (
                <Dashboard></Dashboard>
            )}
        </>
    );
}

export default TelaAdmin;