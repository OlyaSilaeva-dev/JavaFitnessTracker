import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../axios_api/apiClient";
import {Container, Image, Spinner, Alert, Card, ListGroup, Button, ButtonGroup} from "react-bootstrap";
import useProduct from "./UseProduct";

const ProductInfo = () => {
    const { id } = useParams();
    const { product, imageUrl, loading, error } = useProduct(id);

    const handleDelete = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить этот продукт?")) {
            return;
        }

        try {
            await apiClient.delete(`api/v1/pages/products/delete/${product.id}`);
            alert("Продукт успешно удален!");
            window.location.href = "/pages/products"
        } catch (err) {
            console.error("Ошибка при удалении продукта:", err);
            alert("Ошибка при удалении продукта!");
        }
    }

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!product) return <Alert variant="warning">Продукт не найден</Alert>;


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
                    <Button variant="outline-success" href={`/pages/products/add_to_dayprogress/${product.id}`} className="mb-1">
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
