import React, {useState, useEffect} from "react";
import apiClient from "../../../axios_api/apiClient";
import {Alert, Button, Container, Form, FormGroup,Spinner} from "react-bootstrap";

const Exercise = () => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]); // Отфильтрованные продукты
    const [searchQuery, setSearchQuery] = useState(""); // Поле поиска
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await apiClient.get("/api/v1/pages/exercises/all");
                const exercisesData = Array.isArray(response.data) ? response.data : [];
                setExercises(exercisesData);
                setFilteredExercises(exercisesData)
                console.log("Fetched data:", response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err?.message || "Failed to fetch exercises.");
            } finally {
                setLoading(false);
            }
        };

        fetchGet();
    }, []);

    useEffect(() => {
        const filtered = exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredExercises(filtered)
    }, [searchQuery, exercises]);

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

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Упражнения</h1>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <Button variant="primary" href="/hello-page" className="d-flex align-items-center me-3">
                    <span className="me-2"> Перейти на главную</span>
                </Button>
                <Button variant="primary" href="/pages/workouts/exercises/new_exercise" className="d-flex align-items-center">
                    <span className="me-2">+ Создать упражнение</span>
                </Button>
            </div>

            <FormGroup className="mb-3">
                <Form.Label>Поиск:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите название упражнения..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </FormGroup>

            {filteredExercises.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    Упражнений нет
                </Alert>
            ) : (
                <div >
                    {filteredExercises.map((exercise) => (
                        <div key={exercise.id} className="d-flex align-items-center">
                            <div className="row row-cols-4 mb-1">
                                <h4 className="col">
                                    {exercise.name}
                                </h4>
                                <Button variant="outline-primary" className="col" href={`/pages/workouts/exercises/${exercise.id}`}>
                                    Подробнее...
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default Exercise;
