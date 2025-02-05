import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../axios_api/apiClient";
import {Container, ListGroup, Form, FormGroup, Button, Alert, Spinner, Card} from "react-bootstrap";
import useExercise from "./UseExercise";

const AddExerciseToWorkout = () => {
    const { workoutId, exerciseId} = useParams();
    const { exercise, imageUrl, loading, error } = useExercise(exerciseId);
    const [ executionTime, setExecutionTime] = useState("");

    const [calculatedCalories, setCalculatedCalories] = useState({
        calories: ""
    });

    useEffect(() => {
        if (exercise) {
            setCalculatedCalories({
                calories: exercise.calories.toFixed(2),
            });
        }
    }, [exercise]);

    const handleClick = async (e) => {
        e.preventDefault();

        const requestBody = {
            workoutId: workoutId,
            exerciseId: exerciseId,
            interval: parseFloat(executionTime)
        };

        try {
            await apiClient.post(`/api/v1/workouts/add_exercise`, requestBody);
            window.location.href = "/api/v1/workouts";
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

    const calculateCalories = (minuts) => {
        if (!minuts) return { calories: exercise.calories }
        const caloriesPerHour = exercise.calories;
        return {
            calories: ((caloriesPerHour * minuts) / 60)
        };
    };

    const handleChange = (e) => {
        const time = e.target.value === "" ? "" : Number(e.target.value);
        setExecutionTime(time);

        if (time !== "") {
            const { calories} = calculateCalories(time);
            setCalculatedCalories({ calories });
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mx-auto d-flex flex-row justify-content-center mt-4">Добавить упражнение</h1>
            <Card>
                <Card.Header><strong>{exercise.name}</strong></Card.Header>
                <ListGroup>
                    <ListGroup.Item><strong>Потраченные калории: </strong>{calculatedCalories.calories}</ListGroup.Item>
                </ListGroup>
            </Card>
            <Form className="mt-3">
                <FormGroup className='mb-2'>
                    <Form.Label htmlFor="executionTime">Время выполнения (в мин):</Form.Label>
                    <Form.Control
                        type="number"
                        id="executionTime"
                        placeholder="Введите время выполнения упражнения"
                        value={executionTime}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button variant="primary" className="mx-auto d-flex flex-row justify-content-center" onClick={handleClick}>Добавить</Button>
            </Form>

        </Container>
    );
};

export default AddExerciseToWorkout;
