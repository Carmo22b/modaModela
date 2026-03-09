
import './App.css';
import Main from './formularios/mainFormulario/main';
import MoldesPage from './moldes/MoldesPage';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioDoAdminLogin from './formularios/formularioAdmin/formularioDoAdminLogin';
import TelaAdmin from './layout/TelaAdmin';
import PrivateRoute from './Protects/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/moldes" element={<MoldesPage />} />
        <Route path="/telaFormularioAdmin" element={<FormularioDoAdminLogin />} />
        <Route path="/telaFormularioAdmin/TelaAdmin" element={<PrivateRoute><TelaAdmin /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App
