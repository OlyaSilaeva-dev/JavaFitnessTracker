import React from "react";
import {Button, Container, Form, FormGroup, FormLabel} from "react-bootstrap";
import apiClient from "../../../axios_api/apiClient";
import {withRouter} from "../../../router/WithRouter";

class NewExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            name: "",
            intensity: "",
            calories: "",
            image: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        if (e.target.type === "file") {
            this.setState({image: e.target.files[0]});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    async handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        const requestBody = {
            name: this.state.name,
            calories: parseFloat(this.state.calories),
            intensity: this.state.intensity
        };

        formData.append('request', new Blob([JSON.stringify(requestBody)], {type: 'application/json'}));
        if (this.state.image) {
            formData.append('image', this.state.image, this.state.image.name);
        }

        try {
            await apiClient.post(`/api/v1/pages/exercises/create`, formData);
            window.location.href = `/pages/workouts/${this.state.id}/exercises`;
        } catch (err) {
            console.log(err);
            this.setState({greeting: `Ошибка: ${err.message}`});
        }
    }

    render() {
        return <Container className="container mt-4">
            <h1 className="mx-auto d-flex flex-row justify-content-center mt-4">Новое упражнение</h1>
            <Form className="new-product-form" encType="multipart/form-data">
                <FormGroup>
                    <Form.Label htmlFor="name">Название упражнения: </Form.Label>
                    <Form.Control type="text" id="name" placeholder="название упражнения"
                                  onChange={(event) => this.setState({name: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="calories">Калории, использующиеся за час: </Form.Label>
                    <Form.Control type="number" step="0.01" id="calories" placeholder="100,00"
                                  onChange={(event) => this.setState({calories: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="intensity">Интенсивность</FormLabel>
                    <Form.Control
                        as="select"
                        id="intensity"
                        onChange={(event) => this.setState({intensity: event.target.value})}>
                        <option value="LIGHT">light</option>
                        <option value="MEDIUM">medium</option>
                        <option value="HARD">hard</option>
                    </Form.Control>
                </FormGroup>

                <FormGroup>
                    <Form.Label htmlFor="image">Выберите файл:</Form.Label>
                    <Form.Control
                        type="file"
                        id="image"
                        onChange={(event) => this.setState({image: event.target.files[0]})}>
                    </Form.Control>
                </FormGroup>

                <div className="d-flex justify-content-center mt-4">
                    <Button className="w-50" variant="outline-primary" onClick={this.handleClick}>
                        Создать упражнение
                    </Button>
                </div>
            </Form>
        </Container>
    }
}

export default withRouter(NewExercise);