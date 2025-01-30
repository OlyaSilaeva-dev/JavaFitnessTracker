import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";

const date = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const day = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const AdminListElem = (props) => {

    const localDate = new Date(props.booking.date.replace('T', ' '));

    const deleteBooking = async () => {
        try {
            await apiClient.delete(`api/v1/booking/delete?id=${props.booking.id}`);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <Col md = {3}>
        <Card className = "h-100">
            <Card.Body >
                <Card.Title>{props.booking.userName}</Card.Title>
                <Card.Text>{props.booking.serviceName}</Card.Text>
                <Card.Text>{props.booking.doctorName}</Card.Text>
                <Card.Text>{props.booking.branchName}</Card.Text>
                <Card.Text>{props.booking.branchAddress}</Card.Text>
                <Card.Text>{day[localDate.getDay()] + ', ' + localDate.getDate() + ' ' + date[localDate.getMonth()] + ', ' + localDate.getFullYear() + ' ' + localDate.getHours() + ':' + (localDate.getMinutes() < 10 ? '0' : '') + localDate.getMinutes()}</Card.Text>
                <Card.Text>{props.booking.price} руб</Card.Text>
                <Button variant="danger" onClick={deleteBooking}>Удалить запись</Button>
            </Card.Body>
        </Card>
        </Col>
    )

}

export default AdminListElem;