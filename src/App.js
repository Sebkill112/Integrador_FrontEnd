import logo from './logo.svg';
import './App.css';
import LoginPage from './views/login';
import Sidenavs from './layouts/sidenavs';
import MantemientoClientes from './views/mantenimientos/libros';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MantemientoSedes from './views/mantenimientos/sede';
import Prestamos from './views/prestamos/prestamos';
import Registro from './views/registro/registroCliente';
import Retiro from './views/retiros/index';
import Devolucion from './views/devoluciones/index';

import HomePage from './views/home/homepage';


const Private = ({Component}) => {
  const user = localStorage.getItem("user");  
  return user ? <Component /> : <Navigate exact to="/" />
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<HomePage />} />        
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/registro" exact element={<Private Component={Registro} />} />
        <Route path="/libros" exact element={<Private Component={MantemientoClientes} />} />
        <Route path="/sedes" exact element={<Private Component={MantemientoSedes} />} />
        <Route path="/prestamo" exact element={<Private Component={Prestamos} />} />
        <Route path="/retiro" exact element={<Private Component={Retiro} />} />
        <Route path="/devolucion" exact element={<Private Component={Devolucion} />} />          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
