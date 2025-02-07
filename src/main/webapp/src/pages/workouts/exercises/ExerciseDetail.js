import React from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../axios_api/apiClient";
import {Container, Image, Spinner, Alert, Card, ListGroup, Button, ButtonGroup} from "react-bootstrap";
import useExercise from "./UseExercise";

const ExerciseInfo = () => {
    const { workoutId, exerciseId } = useParams();
    const { exercise, imageUrl, loading, error } = useExercise(exerciseId);

    const handleDelete = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить это упражнение?")) {
            return;
        }

        try {
            await apiClient.delete(`api/v1/pages/exercises/delete/${exerciseId}`);
            alert("Упражнение успешно удалено!");
            window.location.href = `/pages/workouts/${workoutId}/exercises`
        } catch (err) {
            console.error("Ошибка при удалении упражнения:", err);
            alert("Ошибка при удалении упражнения!");
        }
    }

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!exercise) return <Alert variant="warning">Продукт не найден</Alert>;


    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card className="p-3 shadow-lg" style={{ width: "450px", borderRadius: "15px" }}>
                <Card.Body className="text-center">
                    <Card.Title as="h2" className="mb-3">{exercise.name}</Card.Title>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={exercise.name}
                            fluid
                            className="rounded"
                            style={{ maxWidth: "300px", height: "auto", objectFit: "contain" }}
                        />
                    )}
                    <ListGroup variant="flush" className="mt-3">
                        <ListGroup.Item><strong>Калории за час:</strong> {exercise.calories}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-success" href={`/pages/workouts/${workoutId}/exercises/add_to_workout/${exerciseId}`} className="mb-1">
                        Добавить упражнение к тренировке
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                        Удалить упражнение
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ExerciseInfo;
