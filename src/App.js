import logo from './logo.svg';
import './App.css';
import LoginPage from './views/login';
import Sidenavs from './layouts/sidenavs';
import MantemientoClientes from './views/mantenimientos/libros';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MantemientoSedes from './views/mantenimientos/sede';
import Prestamos from './views/prestamos/prestamos';
import Registro from './views/registro/registroCliente';
import Retiro from './views/retiros/index';
import Devolucion from './views/devoluciones/index';

import HomePage from './views/home/homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LoginPage />}></Route>
          <Route path='/homepage' exact element={<HomePage />}></Route>
          <Route path='/registro' exact element={<Registro />}></Route>
          <Route path='/libros' exact element={<MantemientoClientes />}></Route>
          <Route path='/sedes' exact element={<MantemientoSedes />}></Route>
          <Route path='/prestamo' exact element={<Prestamos />}></Route>
          <Route path='/retiro' exact element={<Retiro />}></Route>
          <Route path='/devolucion' exact element={<Devolucion />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
