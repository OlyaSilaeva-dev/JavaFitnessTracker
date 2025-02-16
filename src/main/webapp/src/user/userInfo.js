import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import NavHeader from "../header/NavHeader";
import apiClient from "../axios_api/apiClient";
import {data} from "react-router";

const UserInfo = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await apiClient.get('api/v1/user/info');
                setUser(response.data);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("userId", response.data.id);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGet()
    }, []);

    return <>
        <Container>
            <h1 className={"d-flex justify-content-center m-4"}>Подробная информация</h1>
            <ListGroup>
                <ListGroupItem>Имя пользователя: {user? user.name : null}</ListGroupItem>
                <ListGroupItem>email: {user? user.email : null}</ListGroupItem>
                <ListGroupItem>Вес: {user? user.weight : null}</ListGroupItem>
                <ListGroupItem>Рост: {user? user.height : null}</ListGroupItem>
                <ListGroupItem>Год рождения: {user? user.birthYear : null}</ListGroupItem>
                <ListGroupItem>Пол: {user? user.gender==="FEMALE"? "женский" : "мужской" : null}</ListGroupItem>
                <ListGroupItem>Цель: {user? user.purpose==="LOSE"? "сброс веса" :
                        user.purpose==="MAINTAIN"? "удержание веса" :
                        user.purpose==="GAIN"? "набор веса" : null : null}</ListGroupItem>
                <ListGroupItem>Уровень активности: {user ?
                    user.activity==="LOWEST"? "тренировки меньше 1 раза в неделю" :
                    user.activity==="LOW"? "тренировки 1-3 раза в неделю" :
                    user.activity==="MEDIUM"? "тренировки 3-5 раз в неделю" :
                    user.activity==="HIGH"? "тренировки 6-7 раз в неделю" :
                    user.activity==="HIGHEST"? "интенсивные тренировки каждый день" : null
                    : null}
                </ListGroupItem>
            </ListGroup>
            <ButtonGroup className={"justify-content-center m-3"}>
                <Button href={"/"} variant={"outline-success"}>Вернуться на главную</Button>
            </ButtonGroup>
        </Container>
    </>
}

export default UserInfo;