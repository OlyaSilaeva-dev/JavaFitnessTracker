import React, {useState, useEffect} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";

class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            calories: "",
            proteins: "",
            fats: "",
            carbohydrates: "",
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
            proteins: parseFloat(this.state.proteins),
            fats: parseFloat(this.state.fats),
            carbohydrates: parseFloat(this.state.carbohydrates)
        };


        formData.append('request', new Blob([JSON.stringify(requestBody)], {type: 'application/json'}));
        if (this.state.image) {
            formData.append('image', this.state.image, this.state.image.name);
        }

        try {
            await apiClient.post('/api/v1/pages/products/create', formData);
            window.location.href = "/pages/products";
        } catch (err) {
            console.log(err);
            this.setState({greeting: `Ошибка: ${err.message}`});
        }
    }

    render() {
        return <div>
            <h1 className="mx-auto d-flex flex-row justify-content-center mt-5">Новый продукт</h1>
            <Form className="new-product-form" as="form" encType="multipart/form-data">
                <FormGroup>
                    <Form.Label htmlFor="name">Название продукта: </Form.Label>
                    <Form.Control type="text" id="name" placeholder="название продукта"
                                  onChange={(event) => this.setState({name: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="calories">Калории на 100г продукта: </Form.Label>
                    <Form.Control type="number" step="0.01" id="calories" placeholder="100,00"
                                  onChange={(event) => this.setState({calories: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="proteins">Белки на 100г: </Form.Label>
                    <Form.Control type="number" step="0.01" id="proteins" placeholder="25,00"
                                  onChange={(event) => this.setState({proteins: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="fats">Жиры на 100г: </Form.Label>
                    <Form.Control type="number" step="0.01" id="fats" placeholder="25,00"
                                  onChange={(event) => this.setState({fats: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="carbohydrates">Углеводы на 100г: </Form.Label>
                    <Form.Control type="number" step="0.01" id="carbohydrates" placeholder="50,00"
                                  onChange={(event) => this.setState({carbohydrates: event.target.value})}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="image">Выберите файл:</Form.Label>
                    <Form.Control
                        type="file"
                        id="image"
                        onChange={(event) => this.setState({image: event.target.files[0]})}>
                    </Form.Control>
                </FormGroup>

                <Button className="m-4" variant="outline-success" onClick={this.handleClick}>Создать продукт</Button>
            </Form>
        </div>
    }
}

export default NewProduct;