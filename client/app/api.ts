import apiClient from "@/apiClient";
import { Card, CardSet } from "../types/types"

export const getCardsFromSet = async (setId: string) => {
    try {
        const response = await apiClient.get(`/sets/${setId}/cards`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCard = async (setId: string, cardData: Card) => {
    try {
        const response = await apiClient.post(`/cards`, cardData);
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

export const updateCard = async (cardId: string, cardData: Card) => {
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

export const createSet = async (setData: CardSet) => {
    try {
        const response = await apiClient.post(`/sets/`, setData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllSets = async (user_id: string) => {
    try {
        // put in user_id as query param to get only that user's sets

        const response = await apiClient.get(`/sets/`, {
            params: {
                user_id
            }
        });
        console.log("API TS - getAllSets response:", response.data);
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

export const updateSet = async (setId: string, setData: CardSet) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBatchOfCards = async (batchData: any) => {
    try {
        const response = await apiClient.post(`/ai/`, batchData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createBatchOfCardsFromFile = async (file: File) => {
    const formData = new FormData();
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