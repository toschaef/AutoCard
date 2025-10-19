import apiClient from "@/api/apiClient";
import { Card, CardSet, Prompt } from "../types/types"

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await apiClient.post('/register', { name, email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCardsFromSet = async (setId: string) => {
    try {
        const response = await apiClient.get(`/cards/${setId}/cards`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCard = async (cardData: Partial<Card>) => {
    try {
        const response = await apiClient.post(`/cards`, cardData);
        console.log("API TS - createCard response:", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCardById = async (cardId: string) => {
    try {
        const response = await apiClient.get(`/cards/${cardId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateCard = async (cardId: string, cardData: Partial<Card>) => {
    try {
        const response = await apiClient.put(`/cards/${cardId}`, cardData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCard = async (cardId: string) => {
    try {
        const response = await apiClient.delete(`/cards/${cardId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createSet = async (setData: Partial<CardSet>) => {
    try {
        const response = await apiClient.post(`/sets/`, setData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllSets = async () => {
    try {
        const response = await apiClient.get(`/sets/`);
        console.log("API TS - getAllSets response:", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllSetsByUser = async () => {
    try {
        const response = await apiClient.get(`/sets/user`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getSetById = async (setId: string) => {
    try {
        const response = await apiClient.get(`/sets/${setId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateSet = async (setId: string, setData: Partial<CardSet>) => {
    try {
        const response = await apiClient.put(`/sets/${setId}`, setData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteSet = async (setId: string) => {
    try {
        const response = await apiClient.delete(`/sets/${setId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createBatchOfCards = async (prompt: Partial<Prompt>) => {
    try {
        console.log("API TS - createBatchOfCards prompt:", prompt);
        const response = await apiClient.post(`/ai/`, prompt);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createBatchOfCardsFromFile = async (prompt: Partial<Prompt>, file: File) => {
    const formData = new FormData();
    formData.append('prompt', JSON.stringify(prompt));
    formData.append('file', file);

    try {
        const response = await apiClient.post(`/ai/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}