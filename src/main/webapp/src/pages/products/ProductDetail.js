import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../axios_api/apiClient";
import { Container, Image, Spinner, Alert } from "react-bootstrap";

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/api/v1/pages/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Ошибка загрузки продукта");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!product) return <Alert variant="warning">Продукт не найден</Alert>;

    console.log(product.imageId);

    return (
        <Container className="mt-4">
            <h1>{product.name}</h1>
            {product.imageId && (
                <Image
                    src={`/api/v1/images/${product.imageId}`}
                    alt={product.name}
                    fluid
                />
            )}
        </Container>
    );
};

export default ProductInfo;
