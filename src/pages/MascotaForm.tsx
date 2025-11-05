import { ChangeEvent, FormEvent, useEffect, useMemo, useState, FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import MascotaService, { MascotaPayload as DatosMascota } from '../services/mascota.service';


interface MascotaFormProps {
  mode: 'creacion' | 'edicion';
}

interface MascotaFormState {
  nombre: string;
  tipo: string;
  edad: string;
}

const initialState: MascotaFormState = {
  nombre: '',
  tipo: '',
  edad: ''
};

const MascotaForm = ({ mode }: MascotaFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<MascotaFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEdit = mode === 'edicion';
  const title = useMemo(() => (isEdit ? 'Editar mascota' : 'Crear nueva mascota'), [isEdit]);

  useEffect(() => {
    const fetchMascota = async () => {
      if (!isEdit || !id) return;
      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        setError('Identificador de mascota inválido.');
        return;
      }

      setLoading(true);
      try {
        const data = await MascotaService.obtener(numericId);
        setForm({
          nombre: data.nombre ?? '',
          tipo: data.tipo ?? '',
          edad: Number.isFinite(data.edad) ? String(data.edad) : ''
        });
      } catch (err) {
        console.error(err);
        setError('No fue posible cargar la mascota.');
      } finally {
        setLoading(false);
      }
    };

    void fetchMascota();
  }, [id, isEdit]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const datosMacota: DatosMascota = {
        nombre: form.nombre.trim(),
        tipo: form.tipo.trim(),
        edad: Number.parseInt(form.edad, 10) || 0
      };

      if (!datosMacota.nombre || !datosMacota.tipo) {
        setError('Complete todos los campos.');
        setLoading(false);
        return;
      }

      if (isEdit) {
        const numericId = Number(id);
        if (!id || Number.isNaN(numericId)) {
          setError('Identificador de mascota no válido.');
          setLoading(false);
          return;
        }

        await MascotaService.actualizar(numericId, datosMacota);
        setStatus('Mascota actualizada correctamente.');
      } else {
        await MascotaService.crear(datosMacota);
        setStatus('Mascota creada correctamente.');
        setForm(initialState);
      }

      window.setTimeout(() => {
        navigate('/');
      }, 800);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al guardar la mascota.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1>{title}</h1>
      <p>Completa el formulario para {isEdit ? 'actualizar' : 'registrar'} una mascota.</p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Firulais"
            required
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipo</label>
          <input
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            placeholder="Perro, gato, ave..."
            required
          />
        </div>

        <div>
          <label htmlFor="edad">Edad</label>
          <input
            id="edad"
            name="edad"
            type="number"
            min="0"
            value={form.edad}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {status && <p className="status-message">{status}</p>}

        <div className="actions">
          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <Link to="/" className="button-link secondary">Cancelar</Link>
        </div>
      </form>
    </section>
  );
};

export default MascotaForm;
