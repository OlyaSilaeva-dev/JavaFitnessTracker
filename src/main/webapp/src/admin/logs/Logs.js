import React, { useState, useEffect }  from "react";
import { Container, Pagination, Row } from "react-bootstrap";
import apiClient from "../../axios_api/apiClient";
import LogElem from "./LogElem";

const Logs = () => {

    const limit = 12;
    const [currentNumber, setCurrentNumber] = useState(1);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [logs, setLogs] = useState([]);
    const [logsArray, setLogsArray] = useState([]);

    const makeRow = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result
    }

    useEffect(() => {
        const fetchGet = async () => {
            const response2 = await apiClient.get(`api/v1/admin/logs/page?offset=${offset}&limit=${limit}`);
            setLogs(response2.data.content);
            setCount(response2.data.totalPages);
        }

        fetchGet();
    }, [offset]);    

    useEffect(() => {
        if (logs.length > 0) {
            setLogsArray(makeRow(logs, 4));
        }
    }, [logs]);

    const handleClick = async (offset) => {
        setOffset(offset - 1);
        setCurrentNumber(offset);
    }

    let items = [];
    for (let number = 1; number <= count; number++) {
    items.push(
        <Pagination.Item onClick={() => handleClick(number)} key={number} active={number === currentNumber}>
        {number}
        </Pagination.Item>
    );


}

    return (
        <>
        <Container className="xl my-3"><h1>Логи</h1></Container>
        <Container className="mt-4">
            {logsArray.map(
                (elem, index) => {
                return <Row className="mb-4"  key = {index}>
                        {elem.map((col, index) => <LogElem key = {index} log = {col}/>)}
                    </Row>
                }
                )
            }
        </Container>
        <Pagination>{items}</Pagination>
        </>
    )
}

export default Logs;