import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";

const date = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const day = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const AdminListElem = (props) => {

    const deleteUser = async () => {
        try {
            await apiClient.delete(`api/v1/admin/user/delete?userId=${props.user.id}`);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }

    const changeRole = async () => {
        try {
            if (props.user.role === "USER") {
                await apiClient.patch(`api/v1/admin/user/make_admin?userId=${props.user.id}`);
                window.location.reload();
            }
            else {
                await apiClient.patch(`api/v1/admin/user/make_user?userId=${props.user.id}`);
                window.location.reload();  
            }
        }catch(err) {
            console.log(err);
        }
    }

     const buttonsAdd = () => { 
        if (props.user.id !== +localStorage.getItem("userId")) {
        return (
            <>
            <Button variant="primary mb-2" onClick={changeRole}>{props.user.role === "USER" ? 'Сделать админом' : 'Удалить из админов'}</Button>
            <Button className="" variant="danger" onClick={deleteUser}>Удалить</Button>
            </>
        )
    }
}

    return (
        <Col md = {3}>
        <Card className = "h-100 d-flex justify-content-between">
            <Card.Body >
                <Card.Title>{props.user.email}</Card.Title>
                <Card.Text>{props.user.firstName + ' ' + props.user.lastName}</Card.Text>
                <Card.Text>{props.user.phoneNumber}</Card.Text>
                <Card.Text>{props.user.role}</Card.Text>
                {buttonsAdd()}
                
            </Card.Body>
        </Card>
        </Col>
    )

}

export default AdminListElem;