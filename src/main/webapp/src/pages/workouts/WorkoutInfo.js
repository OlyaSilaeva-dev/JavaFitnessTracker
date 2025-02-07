import {useParams} from "react-router-dom";
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Container,
    ListGroup,
    Spinner,
    Table
} from "react-bootstrap";
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

    const handleDelete = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить эту тренировку?")) {
            return;
        }

        try {
            await apiClient.delete(`api/v1/pages/workouts/delete/${workout.id}`);
            alert("Тренировка успешно удалена!");
            window.location.href = "/pages/workouts"
        } catch (err) {
            console.error("Ошибка при удалении тренировки:", err);
            alert("Ошибка при удалении тренировки!");
        }
    }

    const handleSave = async () => {
        const requestBody = {
            userId: localStorage.getItem("userId"),
            workoutId: id
        }

        try {
            await apiClient.post(`api/v1/day_progress/add_workout`, requestBody);
        } catch (err) {
            console.error("Ошибка при сохранении тренировки:", err);
            alert("Ошибка при сохранении тренировки!");
        }
    }

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
                    <table className="table table-bordered table-secondary mx-auto text-center">
                        <thead className="table-active">
                        <tr>
                            <th className={"w-50"}>Упражнение</th>
                            <th className={"w-50"}>Время выполнения</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workoutExercises.map((workoutExercise) => (
                            <tr key={workoutExercise.id}>
                                <td className="w-50 p-2">{workoutExercise.exercise.name}</td>
                                <td className="w-50 p-2">{workoutExercise.interval} мин.</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                )}
            </CardBody>
        </Card>

        <div className={"d-flex justify-content-center mt-2"}>
            <Button className="me-2" variant={"outline-primary"} href={"/pages/workouts"}>
                Вернуться к тренировкам
            </Button>
            <Button className="me-2" variant={"outline-primary"} href={`/pages/workouts/${id}/exercises`}>
                Добавить упражнение
            </Button>
            <Button className="me-2" variant={"outline-primary"} onClick={handleSave}>
                Сохранить тренировку
            </Button>
            <Button variant={"outline-danger"} onClick={handleDelete}>
                Удалить тренировку
            </Button>
        </div>

    </Container>
}

export default WorkoutInfo;