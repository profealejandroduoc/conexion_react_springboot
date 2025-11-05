import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import MascotaService, { Mascota } from '../services/mascota.service';

const MascotaDelete = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMascota = async () => {
      if (!id) {
        setError('Identificador de mascota inválido.');
        return;
      }

      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        setError('Identificador de mascota inválido.');
        return;
      }

      setLoading(true);
      try {
        const data = await MascotaService.obtener(numericId);
        setMascota(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la mascota seleccionada.');
      } finally {
        setLoading(false);
      }
    };

    void fetchMascota();
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      setError('Identificador de mascota inválido.');
      return;
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      setError('Identificador de mascota inválido.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await MascotaService.eliminar(numericId);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('No fue posible eliminar la mascota.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1>Eliminar mascota</h1>
      <p>Confirma si deseas eliminar la siguiente mascota.</p>

      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}

      {mascota && (
        <article style={{ marginBottom: '1.5rem' }}>
          <p><strong>Nombre:</strong> {mascota.nombre}</p>
          <p><strong>Tipo:</strong> {mascota.tipo}</p>
          <p><strong>Edad:</strong> {mascota.edad}</p>
        </article>
      )}

      <div className="actions">
        <button className="danger" type="button" onClick={() => void handleDelete()} disabled={loading}>
          {loading ? 'Eliminando...' : 'Sí, eliminar'}
        </button>
        <Link to="/" className="button-link secondary">Cancelar</Link>
      </div>
    </section>
  );
};

export default MascotaDelete;
