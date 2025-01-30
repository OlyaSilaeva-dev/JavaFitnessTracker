import React, { useEffect, useState } from "react";
import apiClient from "../axios_api/apiClient";
import NavHeader from "../header/NavHeader";
import { Spinner, Container } from "react-bootstrap";
// import Slider from "../other/Slider";

const HelloPage = () => {
    
    const [user, setUser] = useState(null);

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

    return (
        <>
            <NavHeader user = {localStorage.getItem("user")}/>
            <Container className="d-flex justify-content-center my-5">
            <h1>Добро пожаловать, {user? user.name: <Spinner animation="border" role="status"/>}!</h1>
            </Container>
        </>
    )
}

export default HelloPage