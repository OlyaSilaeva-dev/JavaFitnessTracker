import React, {useState, useEffect} from "react";
import {Container, Row} from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";
import AdminUserListElem from "./AdminUserListElem"

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [usersArray, setUsersArray] = useState([]);

    const makeRow = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result
    }

    useEffect(() => {
        const fetchGet = async () => {
            const response = await apiClient.get("api/v1/admin/user/all");
            console.log(response.data);
            setUsers(response.data);
        }

        fetchGet();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            setUsersArray(makeRow(users, 4));
        }
    }, [users]);

    console.log(usersArray);
    return (
        <>
            <Container className="xl my-3"><h1>Все пользователи:</h1></Container>
            <Container className="mt-4">
                {usersArray.map(
                    (elem, index) => {
                        return <Row className="mb-4" key={index}>
                            {elem.map((col, index) => <AdminUserListElem key={index} user={col}/>)}
                        </Row>
                    }
                )
                }
            </Container>
        </>
    )
}

export default AdminUsers;