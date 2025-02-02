import { useState, useEffect } from "react";
import apiClient from "../../axios_api/apiClient"; // Путь к apiClient

const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/api/v1/pages/products/${id}`);
                setProduct(response.data);  // Сохраняем данные о продукте
            } catch (err) {
                setError("Ошибка загрузки продукта");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!product || !product.imageId) return;

        const fetchImage = async () => {
            try {
                const response = await apiClient.get(`/api/v1/images/${product.imageId}`, {
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
    }, [product]);

    return { product, imageUrl, loading, error };
};

export default useProduct;
