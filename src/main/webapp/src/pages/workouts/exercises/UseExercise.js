import { useState, useEffect } from "react";
import apiClient from "../../../axios_api/apiClient"; // Путь к apiClient

const useExercise = (id) => {
    const [exercise, setExercise] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/api/v1/pages/exercises/${id}`);
                setExercise(response.data);  // Сохраняем данные о продукте
            } catch (err) {
                setError("Ошибка загрузки упражнения");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!exercise || !exercise.imageId) return;

        const fetchImage = async () => {
            try {
                const response = await apiClient.get(`/api/v1/images/${exercise.imageId}`, {
                    responseType: "blob",
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImageUrl(imageUrl);
            } catch (err) {
                setError("Ошибка при загрузке изображения");
            }
        };

        fetchImage();

        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, [exercise]);

    return { exercise, imageUrl, loading, error };
};

export default useExercise;
