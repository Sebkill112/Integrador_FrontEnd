import logo from './logo.svg';
import './App.css';
import LoginPage from './views/login';
import Sidenavs from './layouts/sidenavs';
import MantemientoClientes from './views/mantenimientos/clientes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MantemientoSedes from './views/mantenimientos/sede';
import Prestamos from './views/prestamos/prestamos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' exact element={<LoginPage/>}></Route>
       <Route path='/clientes' exact element={<MantemientoClientes/>}></Route>
       <Route path='/sedes' exact element={<MantemientoSedes/>}></Route>
       <Route path='/prestamo' exact element={<Prestamos/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
