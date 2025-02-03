import React from "react";
import {Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";

class NewWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutId: null,
            name: ""
        };
        this.handleCreateWorkout = this.handleCreateWorkout.bind(this);
    }

    async handleCreateWorkout(e) {
        e.preventDefault();

        try {
            const response = await apiClient.post("/api/v1/pages/workouts/create", { name: this.state.name });
            this.setState({workoutId: response.data.id});
            console.log("Workout created with ID:", response.data.id);
        } catch (err) {
            console.log("Ошибка при создании тренировки:", err);
        }
    }

    render() {
        return <Container>
            <h1 className="text-center mb-4">Новая тренировка</h1>

            <Form onSubmit={this.handleCreateWorkout}>
                <FormGroup>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Название тренировки"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                </FormGroup>

                <div className="d-flex justify-content-center">
                    <Button className="m-4" variant="outline-primary" type="submit">
                        Создать тренировку
                    </Button>
                </div>
            </Form>

            {this.state.workoutId && (
                <Button>
                    Добавить упражнение
                </Button>
            )}

        </Container>
    }

}

export default NewWorkout;