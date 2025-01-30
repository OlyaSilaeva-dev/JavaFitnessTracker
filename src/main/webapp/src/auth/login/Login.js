import React from "react";
import { Button, FormGroup, Form } from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";
import { Link, Navigate } from "react-router";
import isTokenExpired from "../isTokenExpired";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            greeting: "",
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        try {
            console.log("Post method");
            const response = await apiClient.post("/api/v1/auth/login", {
                'email': this.state.email,
                'password': this.state.password
            });
            this.setState({password: ""});
            localStorage.setItem("token", response.data.token);
            console.log("Token saved to localStorage:", response.getItem("token"));
            localStorage.setItem("role", response.data.role); // Сохраняем роль, если есть

            this.setState({greeting: `Добро пожаловать, ${this.state.email}`});

            window.location.href = "/hello-page";
        } catch (err) {
            console.log(err);
            this.setState({greeting: `Ошибка: ${err.response}`});
        }
    }

    render () {
        if (!isTokenExpired()) return <Navigate to="/hello-page"/>;
        return (
            <div>
                <h1 className="mx-auto d-flex flex-row justify-content-center mt-5">Вход в личный кабинет</h1>
                <Form className = "login-form" >
                    <FormGroup>
                        <Form.Label htmlFor="email">Email: </Form.Label>
                        <Form.Control type="email" id="email" placeholder="Ivanov@mail.rur" onChange={(event) => this.setState({email: event.target.value})}></Form.Control>
                    </FormGroup>
                    <FormGroup >
                        <Form.Label htmlFor="password">Password: </Form.Label>
                        <Form.Control type="password" id="password" placeholder="От 8 цифр" onChange={(event) => this.setState({password: event.target.value})}></Form.Control>
                    </FormGroup>
                    <Button className="m-4" variant ="outline-primary" onClick={this.handleClick}>Войти</Button>
                    <Link to="/register">
                        <Button variant ="outline-secondary">Регистрация</Button>
                    </Link>
                </Form>

                <div className="text-center">{this.state.greeting}</div>
            </div>
        )
    }
}

export default Login;
