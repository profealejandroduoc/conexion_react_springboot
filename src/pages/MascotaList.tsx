import { Link } from 'react-router';
import useMascotas from '../hooks/useMascotas';

const MascotaList = () => {
  //HOOK PERSONALIZADO QUE MANEJA LOS OTROS HOOKS
  const { mascotas, loading, error, recargar } = useMascotas();

  return (
    <section className="card">
      <header>
        <h1>Listado de mascotas</h1>
        <p>Carga desde MySQL con SpringBoot</p>
      </header>

      <div className="actions" style={{ marginTop: '1rem' }}>
        <Link to="/crear" className="button-link"> + Crear nueva mascota</Link>

        <a className="button-link" onClick={() => void recargar()}> {loading}
          {loading ? 'Actualizando...' : 'Actualizar lista'}
        </a>

      </div>

      {error && <p className="error-message">No se pudo conectar.</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.length === 0 && !loading && (
              <tr>
                <td colSpan={5}>No hay mascotas registradas.</td>
              </tr>
            )}
            {mascotas.map((mascota) => (
              <tr key={mascota.id}>
                <td>{mascota.id}</td>
                <td>{mascota.nombre}</td>
                <td>{mascota.tipo}</td>
                <td>{mascota.edad}</td>
                <td>
                  <div className="actions">
                    <Link className="button-link secondary" to={`/editar/${mascota.id}`}>
                      Editar
                    </Link>
                    <Link className="button-link danger" to={`/eliminar/${mascota.id}`}>
                      Eliminar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MascotaList;
