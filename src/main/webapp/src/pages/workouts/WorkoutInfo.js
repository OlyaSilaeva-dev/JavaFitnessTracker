import {useParams} from "react-router-dom";
import {Alert, Button, ButtonGroup, Card, CardBody, CardHeader, Container, ListGroup, Spinner} from "react-bootstrap";
import useWorkout from "./UseWorkout";
import React, { useEffect, useState } from "react";
import apiClient from "../../axios_api/apiClient";

const WorkoutInfo = () => {
    const [ workoutExercises, setWorkoutExercises ] = useState([]);
    const { id } = useParams();
    const { workout, loading, error } = useWorkout(id);

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await apiClient.get(`/api/v1/pages/workouts/find_exercises/${id}`);
                const exercisesData = Array.isArray(response.data) ? response.data : [];
                setWorkoutExercises(exercisesData);
                console.log("Fetched data:", response.data);
            } catch (err) {
                console.error("Error fetching exercises:", err);
                // setError(err?.message || "Failed to fetch exercises.");
            } finally {
                // setLoading(false);
            }
        };

        fetchGet();
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!workout) return <Alert variant="warning">Тренировка не найдена</Alert>;

    return <Container className="justify-content-center mt-4">
        <Card className="flex-column">
            <CardHeader>{workout.name}</CardHeader>
            <CardBody>
                {workoutExercises.length === 0 ? (
                    <Alert variant="warning" className="text-center">
                        Упражнений нет
                    </Alert>
                ) : (
                    <div>
                        {workoutExercises.map((workoutExercise) => (
                            <div key={workoutExercise.id} className="d-flex align-items-center">
                                <div className="row row-cols-4 mb-1">
                                    <h4 className="col">
                                        {workoutExercise.exerciseId}
                                    </h4>
                                    <h4 className="col">
                                        {workoutExercises.interval}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>

        <div className={"d-flex justify-content-center mt-2"}>
            <Button className="me-2" variant={"info"} href={"/pages/workouts"}>
                Вернуться к тренировкам
            </Button>
            <Button variant={"info"} href={`/pages/workouts/${id}/exercises`}>
                Добавить упражнение
            </Button>
        </div>
    </Container>
}

export default WorkoutInfo;