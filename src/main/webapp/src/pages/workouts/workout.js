import React, {useEffect, useState} from "react";
import {Alert, Button, ButtonGroup, Container, Form, FormGroup} from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";

const Workout = () => {
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]); // Отфильтрованные продукты
    const [searchQuery, setSearchQuery] = useState(""); // Поле поиска
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await apiClient.get("/api/v1/pages/workouts/all");
                const workoutsData = Array.isArray(response.data) ? response.data : [];
                setWorkouts(workoutsData);
                setFilteredWorkouts(workoutsData)
                console.log("Fetched data:", response.data);
            } catch (err) {
                console.error("Error fetching workouts:", err);
                setError(err?.message || "Failed to fetch exercises.");
            } finally {
                setLoading(false);
            }
        };

        fetchGet();
    }, []);

    useEffect(() => {
        const filtered = workouts.filter((workout) =>
            workout.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredWorkouts(filtered)
    }, [searchQuery, workouts]);


    return <Container className={""}>
        <h1 className="text-center mb-4">Тренировки</h1>

        <div className={"d-flex justify-content-between align-items-center flex-row"}>
            <ButtonGroup>
                <Button variant={"info"} className={"m-2"} href={"/hello-page"}>Вернуться на главную</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant={"info"} href={"/pages/workouts/new_workout"}>+ Создать тренировку</Button>
            </ButtonGroup>
        </div>

        <FormGroup className="mb-3">
            <Form.Label>Поиск:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Введите название тренировки..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </FormGroup>

        {filteredWorkouts.length === 0 ? (
            <Alert variant="warning" className="text-center">
                Тренировок нет
            </Alert>
        ) : (
            <div >
                {filteredWorkouts.map((workout) => (
                    <div key={workout.id} className="d-flex align-items-center">
                        <div className="row row-cols-4 mb-1">
                            <h4 className="col">
                                {workout.name}
                            </h4>
                            <Button variant="outline-primary" className="col" href={`/pages/workouts/${workout.id}`}>
                                Подробнее...
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </Container>
}

export default Workout;