import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../axios_api/apiClient";
import {Container, Image, Spinner, Alert, Card, ListGroup, Button, ButtonGroup} from "react-bootstrap";

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
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

    useEffect(() => {
        if (!product || !product.imageId) return;

        const fetchImage = async () => {
            try {
                const response = await apiClient.get(`/api/v1/images/${product.imageId}`, {
                    responseType: "blob", // Указываем, что ответ - бинарные данные
                });

                const imageUrl = URL.createObjectURL(response.data);
                setImageUrl(imageUrl);
            } catch (err) {
                setError("Ошибка при загрузке изображения");
            }
        };

        fetchImage();

        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl); // Освобождаем память
        };
    }, [product]); // Загружаем изображение только после загрузки продукта

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!product) return <Alert variant="warning">Продукт не найден</Alert>;

    const handleDelete = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить этот продукт?")) {
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await apiClient.delete(`api/v1/pages/products/delete/${product.id}`);
            alert("Продукт успешно удален!");
            window.location.href = "/pages/products"
        } catch (err) {
            console.error("Ошибка при удалении продукта:", err);
            alert("Ошибка при удалении продукта!");
        }
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card className="p-3 shadow-lg" style={{ width: "450px", borderRadius: "15px" }}>
                <Card.Body className="text-center">
                    <Card.Title as="h2" className="mb-3">{product.name}</Card.Title>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fluid
                            className="rounded"
                            style={{ maxWidth: "300px", height: "auto", objectFit: "contain" }}
                        />
                    )}
                    <ListGroup variant="flush" className="mt-3">
                        <ListGroup.Item><strong>Калории:</strong> {product.calories}</ListGroup.Item>
                        <ListGroup.Item><strong>Белки:</strong> {product.proteins} г</ListGroup.Item>
                        <ListGroup.Item><strong>Жиры:</strong> {product.fats} г</ListGroup.Item>
                        <ListGroup.Item><strong>Углеводы:</strong> {product.carbohydrates} г</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-success" className="mb-1">
                        Добавить продукт в прием пищи
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                        Удалить продукт
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductInfo;
