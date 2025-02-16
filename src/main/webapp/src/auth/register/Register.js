import React from "react";
import {Button, FormGroup, Form} from "react-bootstrap";
import "./Register.css"
import apiClient from "../../axios_api/apiClient";
import {Link, Navigate} from "react-router";
import isTokenExpired from "../isTokenExpired";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            birthYear: "",
            weight: "",
            height: "",
            gender: "MALE",
            activity: "MEDIUM",
            purpose: "LOSE",
            avatar: null,
            greeting: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        if(e.target.type === "file") {
            this.setState({avatar: e.target.files[0]});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    async handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        const requestBody = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            weight: parseFloat(this.state.weight),
            height: parseFloat(this.state.height),
            birthYear: parseInt(this.state.birthYear),
            gender: this.state.gender,
            activity: this.state.activity,
            purpose: this.state.purpose
        };


        formData.append('request', new Blob([JSON.stringify(requestBody)], { type: 'application/json' }));
        if (this.state.avatar) {
            formData.append('avatar', this.state.avatar, this.state.avatar.name); // Добавляем аватар
        }

        try {
            const response = await apiClient.post('/api/v1/auth/register', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Важно!
                    },
                }
            );
            localStorage.setItem("token", response.data.token);
            this.setState({greeting: `Добро пожаловать, ${this.state.name}`});
            window.location.href = "/hello-page";
        } catch (err) {
            console.log(err);
            this.setState({greeting: `Ошибка: ${err.message}`});
        }
    };


    render() {
        if (!isTokenExpired()) return <Navigate to="/api/v1/auth/register"/>;
        return (
            <div>
                <h1 className="mx-auto d-flex flex-row justify-content-center mt-5">Регистрация</h1>
                <Form className="register-form" as="form" encType="multipart/form-data">
                    <FormGroup>
                        <Form.Label htmlFor="email">Адрес почты: </Form.Label>
                        <Form.Control type="email" id="email" placeholder="Ivanov@mail.rur"
                                      onChange={(event) => this.setState({email: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="password">Пароль: </Form.Label>
                        <Form.Control type="password" id="password" placeholder="От 8 цифр"
                                      onChange={(event) => this.setState({password: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="name">Имя пользователя: </Form.Label>
                        <Form.Control type="text" id="name" placeholder="Иванов Иван"
                                      onChange={(event) => this.setState({name: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="birthYear">Год рождения</Form.Label>
                        <Form.Control type="number" id="birthYear" placeholder="2000"
                                        onChange={(event) => this.setState({birthYear: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="weight"> Вес: </Form.Label>
                        <Form.Control type="number" step="0.01" id="weight" placeholder="вес в кг"
                                      onChange={(event) => this.setState({weight: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="height">Рост: </Form.Label>
                        <Form.Control type="number" step="0.01" id="height" placeholder="От 8 цифр"
                                      onChange={(event) => this.setState({height: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="gender">Gender: </Form.Label>
                        <Form.Control
                            as="select"
                            id="gender"
                            onChange={(event) => this.setState({gender: event.target.value})}>
                            <option value="MALE">male</option>
                            <option value="FEMALE">female</option>
                        </Form.Control>
                    </FormGroup>
                    {/*LOWEST, LOW, MEDIUM, HIGH, HIGHEST;*/}
                    <FormGroup>
                        <Form.Label htmlFor="activity">Gender: </Form.Label>
                        <Form.Control
                            as="select"
                            id="activity"
                            onChange={(event) => this.setState({activity: event.target.value})}>
                            <option value="LOWEST">тренировки меньше 1 раза в неделю</option>
                            <option value="LOW">тренировки 1-3 раза в неделю</option>
                            <option value="MEDIUM">тренировки 3-5 раз в неделю</option>
                            <option value="HIGH">тренировки 6-7 раз в неделю</option>
                            <option value="HIGHEST">интенсивные тренировки каждый день</option>
                        </Form.Control>
                    </FormGroup>
                    <FormGroup>
                    <Form.Label htmlFor="purpose">Цель: </Form.Label>
                        <Form.Control
                            as="select"
                            id="purpose"
                            onChange={(event) => this.setState({purpose: event.target.value})}>
                            <option value="LOSE">сброс веса</option>
                            <option value="MAINTAIN">удержание веса</option>
                            <option value="GAIN">набор веса</option>
                        </Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label htmlFor="avatar">Выберите файл:</Form.Label>
                        <Form.Control
                            type="file"
                            id="avatar"
                            onChange={(event) => this.setState({avatar: event.target.files[0]})}>
                        </Form.Control>
                    </FormGroup>

                    <Button className="m-4" variant="outline-primary" onClick={this.handleClick}>Регистрация</Button>
                    <Link to="/login">
                        <Button variant="outline-secondary">Логин</Button>
                    </Link>
                </Form>

                <div className="text-center">{this.state.greeting}</div>
            </div>
        )
    }
}

export default Register;
