import { Link, NavLink, Route, Routes } from 'react-router';
import MascotaList from './pages/MascotaList';
import MascotaForm from './pages/MascotaForm';
import MascotaDelete from './pages/MascotaDelete';


const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" className="brand">Gestión de Mascotas</Link>

      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<MascotaList />} />
          <Route path="/crear" element={<MascotaForm mode="creacion" />} />
          <Route path="/editar/:id" element={<MascotaForm mode="edicion" />} />
          <Route path="/eliminar/:id" element={<MascotaDelete />} />
        </Routes>
      </main>
      <footer className="app-footer">Ejemplo de Conexión con SpringBoot</footer>
    </div>
  );
};

export default App;
