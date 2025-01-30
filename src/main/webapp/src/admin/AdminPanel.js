import {React} from "react"

import NavHeader from "../header/NavHeader"
import { Container } from "react-bootstrap"
import AdminTabs from "./AdminTabs"

const AdminPanel = () => {
    return (
        <>
        <NavHeader/>
        <Container className="vw-100 d-block">
        <h1>Админ панель:</h1>
        <AdminTabs/>
        </Container>
        </>
        
    )
}

export default AdminPanel