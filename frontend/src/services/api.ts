import api from '../api/axios';

export interface Scheme {
    id: number;
    name: string;
    description: string;
    benefits: string;
    category: string;
    link: string;
}

export const chatService = {
    searchSchemes: async (message: string): Promise<Scheme[]> => {
        try {
            const response = await api.post<Scheme[]>('/api/chat/schemes', { message });
            return response.data;
        } catch (error) {
            console.error("Error searching schemes:", error);
            throw error;
        }
    },
    
    testAi: async (message: string) => {
         try {
            const response = await api.post('/api/test-ai', { message });
            return response.data;
        } catch (error) {
            console.error("Error testing AI:", error);
            throw error;
        }
    }
};
