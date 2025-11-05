import { useCallback, useEffect, useState } from 'react';
import MascotaService, { Mascota } from '../services/mascota.service';

interface UseMascotasState {
  mascotas: Mascota[];
  loading: boolean;
  error: Error | null;
  recargar: () => Promise<void>;
}

export const useMascotas = (): UseMascotasState => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const cargarMascotas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MascotaService.listar();
      setMascotas(data);
    } catch (err) {
      const parsedError = err instanceof Error ? err : new Error('Error desconocido al cargar mascotas');
      setError(parsedError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void cargarMascotas();
  }, [cargarMascotas]);

  return {
    mascotas,
    loading,
    error,
    recargar: cargarMascotas
  };
};

export default useMascotas;
