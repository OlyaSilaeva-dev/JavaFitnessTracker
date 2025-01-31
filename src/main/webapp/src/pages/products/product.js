import React, {useState, useEffect} from "react";
import apiClient from "../../axios_api/apiClient";
import {Alert, Button, Container, Form, FormGroup,Spinner} from "react-bootstrap";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные продукты
    const [selectedProduct, setSelectedProduct] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // Поле поиска
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await apiClient.get("/api/v1/pages/products/all");
                const productsData = Array.isArray(response.data) ? response.data : [];
                setProducts(productsData);
                setFilteredProducts(productsData)
                console.log("Fetched data:", response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err?.message || "Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchGet();
    }, []);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered)
    }, [searchQuery, products]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary"/>
                <p>Loading products...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Продукты</h1>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Выбрать продукт:</h2>
                <Button variant="success" href="/pages/products/new_product" className="d-flex align-items-center">
                    <span className="me-2">+ Создать продукт</span>
                </Button>
            </div>

            <FormGroup className="mb-3">
                <Form.Label>Поиск</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите название продукта..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </FormGroup>

            {filteredProducts.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    Продуктов нет
                </Alert>
            ) : (
                <div >
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="d-flex align-items-center">
                            <div className="row row-cols-6">
                                <h4 className="col mb-0">
                                    {product.name}
                                </h4>
                                <Button variant="outline-success" className="col" href={`/pages/products/${product.id}`}>
                                    Подробнее...
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default Product;
