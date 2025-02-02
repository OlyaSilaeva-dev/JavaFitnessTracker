import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import useProduct from "./UseProduct";
import apiClient from "../../axios_api/apiClient";
import {Container, ListGroup, Form, FormGroup, Button, Alert, Spinner, Card} from "react-bootstrap";

const AddToDayProgress = () => {
    const { id } = useParams();
    const { product, imageUrl, loading, error } = useProduct(id);
    const [gramsOfProduct, setGramsOfProduct] = useState("");
    const [meal, setMeal] = useState("BREAKFAST");

    const [calculatedBJU, setCalculatedBJU] = useState({
        calories: "",
        proteins: "",
        fats: "",
        carbohydrates: ""
    });

    useEffect(() => {
        if (product) {
            setCalculatedBJU({
                calories: product.calories.toFixed(2),
                proteins: product.proteins.toFixed(2),
                fats: product.fats.toFixed(2),
                carbohydrates: product.carbohydrates.toFixed(2)
            });
        }
    }, [product]); // Выполнится только при загрузке product


    const handleClick = async (e) => {
        e.preventDefault();

        const requestBody = {
            userId: localStorage.getItem('userId'),
            productId: id,
            gramsOfProduct: parseFloat(gramsOfProduct),
            meal: meal
        };

        try {
            await apiClient.post(`/api/v1/day_progress/add_product`, requestBody);
            window.location.href = "/hello_page";
        } catch (err) {
            console.error("Error:", err);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary"/>
                <p>Loading products...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const calculateBJU = (grams) => {
        if (!grams) return {calories: product.calories, fats: product.fats, carbohydrates: product.carbohydrates, proteins: product.proteins}

        const caloriesPer100 = product.calories;
        const proteinsPer100 = product.proteins;
        const fatsPer100 = product.fats;
        const carbohydratesPer100 = product.carbohydrates;

        return {
            calories: ((caloriesPer100 * grams) / 100).toFixed(2),
            proteins: ((proteinsPer100 * grams) / 100).toFixed(2),
            fats: ((fatsPer100 * grams) / 100).toFixed(2),
            carbohydrates: ((carbohydratesPer100 * grams) / 100).toFixed(2)
        };
    };

    const handleGramsChange = (e) => {
        const grams = e.target.value === "" ? "" : Number(e.target.value);
        setGramsOfProduct(grams);

        if (grams !== "") {
            const { calories, proteins, fats, carbohydrates } = calculateBJU(grams);
            setCalculatedBJU({ calories, proteins, fats, carbohydrates });
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mx-auto d-flex flex-row justify-content-center mt-4">Добавить продукт</h1>
            <Card>
                <Card.Header><strong>{product.name}</strong></Card.Header>
                <ListGroup>
                    <ListGroup.Item><strong>Калории: </strong>{calculatedBJU.calories}</ListGroup.Item>
                    <ListGroup.Item><strong>Белки: </strong> {calculatedBJU.proteins}</ListGroup.Item>
                    <ListGroup.Item><strong>Жиры: </strong> {calculatedBJU.fats}</ListGroup.Item>
                    <ListGroup.Item><strong>Углеводы: </strong> {calculatedBJU.carbohydrates}</ListGroup.Item>
                </ListGroup>
            </Card>
            <Form className="mt-3">
                <FormGroup>
                    <Form.Label htmlFor="meal">Прием пищи: </Form.Label>
                    <Form.Control
                        as="select"
                        id="meal"
                        onChange={(event) => setMeal(event.target.value)}>
                        <option value="BREAKFAST">Завтрак</option>
                        <option value="LUNCH">Обед</option>
                        <option value="DINNER">Ужин</option>
                        <option value="SNACK">Перекус</option>
                    </Form.Control>
                </FormGroup>
                <FormGroup className='mb-2'>
                    <Form.Label htmlFor="gramsOfProduct">Граммы продукта:</Form.Label>
                    <Form.Control
                        type="number"
                        id="gramsOfProduct"
                        placeholder="Введите количество продукта"
                        value={gramsOfProduct}
                        onChange={handleGramsChange}
                    />
                </FormGroup>
                <Button variant="success" className="mx-auto d-flex flex-row justify-content-center" onClick={handleClick}>Добавить</Button>
            </Form>

        </Container>
    );
};

export default AddToDayProgress;
