import { useState, useEffect } from "react";
import apiClient from "../../axios_api/apiClient"; // Путь к apiClient

const useWorkout = (id) => {
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await apiClient.get(`/api/v1/pages/workouts/${id}`);
                setWorkout(response.data);
            } catch (err) {
                setError("Ошибка загрузки продукта");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);

    return { workout, loading, error };
};

export default useWorkout;
