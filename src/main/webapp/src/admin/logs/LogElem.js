import React from "react";
import {Col, Card } from "react-bootstrap";

const date = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const day = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const LogElem = (props) => {

    const localDate = new Date(props.log.timestamp.replace('T', ' '));
    console.log(props.log.Button);


    return (
        <Col md = {3}>
        <Card className = "h-100">
            <Card.Body >
                <Card.Title>{props.log.operation}</Card.Title>
                <Card.Text>{props.log.tableName}</Card.Text>
                <Card.Text>{props.log.oldData === null? props.log.oldData : null}</Card.Text>
                <Card.Text>{props.log.newData === null? props.log.newData : null}</Card.Text>
                <Card.Text>{day[localDate.getDay()] + ', ' + localDate.getDate() + ' ' + date[localDate.getMonth()] + ', ' + localDate.getFullYear() + ' ' + localDate.getHours() + ':' + (localDate.getMinutes() < 10 ? '0' : '') + localDate.getMinutes()}</Card.Text>
            </Card.Body>
        </Card>
        </Col>
    )

}

export default LogElem;