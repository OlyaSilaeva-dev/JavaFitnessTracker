import React from "react";
import {Button, ButtonGroup, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";

class NewWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutId: null,
            workoutName: ""
        };
        this.handleCreateWorkout = this.handleCreateWorkout.bind(this);
    }

    async handleCreateWorkout(e) {
        e.preventDefault();
        const request = {
            workoutName: this.state.workoutName
        }

        try {
            const response = await apiClient.post("/api/v1/pages/workouts/create", request);
            this.setState({workoutId: response.data.id});
            console.log("Workout created with ID:", response.data.id);
            window.location.href = `/pages/workouts/${response.data.id}`;
        } catch (err) {
            console.log("Ошибка при создании тренировки:", err);
        }
    }

    render() {
        console.log(this.props.workoutId)
        return <Container>
            <h1 className="text-center mb-4">Новая тренировка</h1>

            <Form onSubmit={this.handleCreateWorkout}>
                <FormGroup>
                    <Form.Control
                        type="text"
                        id="name"
                        placeholder="Введите название тренировки"
                        value={this.state.workoutName}
                        onChange={(event) => this.setState({workoutName: event.target.value})}
                    />
                </FormGroup>
                <div className="d-flex justify-content-center">
                    <Button className="m-4" variant="outline-primary" type="submit">
                        Создать тренировку
                    </Button>
                </div>
            </Form>

            </Container>
    }
}

export default NewWorkout;