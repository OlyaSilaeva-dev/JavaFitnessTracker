import React, { useEffect, useState } from "react";
import apiClient from "../axios_api/apiClient";
import NavHeader from "../header/NavHeader";
import {
    Spinner,
    Container,
    Image,
    ButtonGroup,
    Button,
    Form,Alert
} from "react-bootstrap";

const HelloPage = () => {
    const [user, setUser] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);
    const [loading, setLoading] = useState();
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [error, setError] = useState();
    const [dayProgressResponse, setDayProgressResponse] = useState();

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

    useEffect(() => {
        if (!user || !user.avatar) return;

        const fetchImage = async () => {
            try {
                const response = await apiClient.get(`/api/v1/images/${user.avatar.id}`, {
                    responseType: "blob",
                });
                const imageUrl = URL.createObjectURL(response.data);
                setAvatarURL(imageUrl);
            } catch (err) {
                setError("Ошибка при загрузке изображения");
            }
        };

        fetchImage();

        return () => {
            if (avatarURL) URL.revokeObjectURL(avatarURL);
        };
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const fetchDayProgress = async () => {
            const userId = localStorage.getItem("userId");

            try {
                const response = await apiClient.get(`/api/v1/day_progress/info?userId=${userId}&date=${date}`);
                setDayProgressResponse(response.data);
            } catch (err) {
                setError("не удалось загрузить данные за заданный день");
            } finally {
                setLoading(false);
            }
        }

        fetchDayProgress();
    }, [user, date]);

    const handleDateChange = (offset) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + offset);
        setDate(currentDate.toISOString().split("T")[0]);     }

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <NavHeader user = {localStorage.getItem("user")}/>
            <Container className="d-flex justify-content-center row cols m-3">
                <h2 className={"mb-2"}>Добро пожаловать, {user? user.name: <Spinner animation="border" role="status"/>}!</h2>
                {avatarURL && (
                    <Image
                        src={avatarURL}
                        alt={user.name}
                        fluid
                        className="rounded-circle mb-3"
                        style={{ maxWidth: "400px", height: "auto", objectFit: "contain" }}
                    />
                )}

                <ButtonGroup className={"w-full mb-5"}>
                    <Button className={"border-black btn-warning btn-outline-light w-25"}
                    onClick={() => handleDateChange(-1)}>
                        <div className={"text-dark"}>Предыдущий</div>
                    </Button>
                    <Button className={"border-black btn-warning btn-outline-light w-50"}>
                        <div className={"text-dark"}>{date}</div>
                    </Button>
                    <Button className={"border-black btn-warning btn-outline-light w-25"}
                            onClick={() => handleDateChange(+1)}>
                        <div className={"text-dark"}>Следующий</div>
                    </Button>
                </ButtonGroup>

                <div className={"d-flex justify-content-between w-full"}>
                    <Form className={" border border-black rounded-circle m-2 w-25"}>
                        <h6 className={"d-flex justify-content-center m-2"}>Потребление: {dayProgressResponse ? Math.round(dayProgressResponse.intakeCalories) : null} </h6>
                    </Form>
                    <Form className={" border border-black rounded-circle me-3 ms-3 w-50"}>
                        <h4 className={"d-flex text-center m-2"}><strong>Ккал. осталось: {dayProgressResponse ? Math.round(dayProgressResponse.dayNormCalories) - Math.round(dayProgressResponse.intakeCalories) + Math.round(dayProgressResponse.burnedCalories) : null} </strong></h4>
                    </Form>
                    <Form className={"border border-black rounded-circle m-2 w-25"}>
                        <h6 className={"d-flex justify-content-center m-2"}>Расход: {dayProgressResponse ? Math.round(dayProgressResponse.burnedCalories) : null}</h6>
                    </Form>
                </div>
            </Container>

        </>
    )
}

export default HelloPage