import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CartWidget.css";

const CartWidget = () => {
    const { cartItems, getCartTotal, removeItem } = useContext(CartContext);
    const handleRemoveItem = (productId) => {
        removeItem(productId);
    };
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };

    const handleContinuePurchase = () => {
        navigate("/checkout");
    };

    return (
        <div className="cartWidget">
        {cartItems.length > 0 ? (
            <>
            <div className="productList">
                {cartItems.map((item) => (
                <div key={item.product.id} className="cartItem">
                    <Card className="productCard">
                    <Card.Img
                        variant="top"
                        src={item.product.image}
                        alt={item.product.name}
                        className="productImage"
                    />
                    <Card.Body>
                        <Card.Title>{item.product.name}</Card.Title>
                        <Card.Text>
                        <strong>Precio:</strong> ${item.product.price} kiwy pesos
                        </Card.Text>
                        <Card.Text>
                        <strong>Cantidad:</strong> {item.quantity}
                        </Card.Text>
                        <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.product.id)}
                        >
                        Eliminar
                        </Button>
                    </Card.Body>
                    </Card>
                </div>
                ))}
            </div>
            <p className="totalAmount">Total: ${getCartTotal()} kiwy pesos</p>
            <div className="buttonContainer">
                <Button variant="success" onClick={handleContinuePurchase}>
                Continuar Compra
                </Button>
                <Button className="homeButton" onClick={handleGoToHome}>Volver al Inicio</Button>
            </div>
            </>
        ) : (
            <>
            <p>No hay productos en el carrito</p>
            <Button onClick={handleGoToHome}>Volver al Inicio</Button>
            </>
        )}
        </div>
    );
    };

export default CartWidget;
