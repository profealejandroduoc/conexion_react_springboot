import axios from 'axios';

export interface Mascota {
  id: number;
  nombre: string;
  tipo: string;
  edad: number;
}

export type MascotaPayload = Omit<Mascota, 'id'>;
//PayLoad concepto usado para el transporte desde un punto a otro de un objeto en este caso omite id porque es
//autoincrement

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const resource = '/mascotas';

export const MascotaService = {
  async listar(): Promise<Mascota[]> {
    const { data } = await apiClient.get<Mascota[]>(resource);
    return Array.isArray(data) ? data : [];
  },

  async obtener(id: number): Promise<Mascota> {
    const { data } = await apiClient.get<Mascota>(`${resource}/${id}`);
    return data;
  },

  async crear(mascota: MascotaPayload): Promise<Mascota> {
    const { data } = await apiClient.post<Mascota>(resource, mascota);
    return data;
  },

  async actualizar(id: number, mascota: MascotaPayload): Promise<Mascota> {
    const { data } = await apiClient.put<Mascota>(`${resource}/${id}`, mascota);
    return data;
  },

  async eliminar(id: number): Promise<void> {
    await apiClient.delete(`${resource}/${id}`);
  }
};

export default MascotaService;
