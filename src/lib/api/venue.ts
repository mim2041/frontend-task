import { axiosInstance } from '../utils/axios';

export interface Venue {
    id: number;
    name: string;
    address: string;
    capacity: number;
    revenue: number;
    bookings: number;
    rating: number;
    amenities: string[];
    stats: {
        daily: number[];
        weekly: number[];
        monthly: number[];
    };
}

export const venueApi = {
    getVenue: async (id: string): Promise<Venue> => {
        const response = await axiosInstance.get(`/admin/venue/${id}`);
        return response.data;
    },
};