import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Checkout.css";
import { createOrder, updateOrder } from "../../utils/createUpdatedFirestore";
import Swal from "sweetalert2";

const Checkout = () => {
    const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };
    
    const handleFinishPurchase = () => {
        const total = getCartTotal();

        // Validar inputs
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        setErrorMessage("El Nombre y apellido no están completados correctamente");
        return;
        }
        if (!address || !/^[a-zA-Z0-9\s]+$/.test(address)) {
            setErrorMessage("La Dirección de envío no está completada correctamente");
            return;
        }
        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        setErrorMessage(
            "El Número de tarjeta no está completado correctamente (debe contener 16 dígitos)"
        );
        return;
        }
        if (!securityCode || !/^\d{3}$/.test(securityCode)) {
        setErrorMessage(
            "El Código de seguridad no está completado correctamente (debe contener 3 dígitos)"
        );
        return;
        }
        setErrorMessage(""); // Limpiar el mensaje de error si todo está correcto

        // Lógica para crear la orden y finalizar la compra
        createOrder(cartItems, clearCart, total) // <-- Llamada a createOrder
        .then((orderId) => {
            cartItems.forEach((item) => {
            const productId = item.product.id;
            const finalStock = item.product.stock - item.quantity;
            updateOrder(productId, finalStock);
            });
            clearCart();
            Swal.fire('¡Compra terminada!', '', 'success');
            //alert("¡Compra terminada!");
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage(
            "Error al procesar la compra. Por favor, intenta nuevamente."
            );
        });
    };

    return (
        <div className="checkoutContainer">
        <h1>Checkout</h1>
        {cartItems.length > 0 ? (
            <>
            <p>Total: ${getCartTotal()} kiwy pesos</p>
            <div>
            <div className="inputContainer">
                <label htmlFor="nameInput">Nombre y Apellido:</label>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="inputContainer">
                <label htmlFor="addressInput">Dirección de envío:</label>
                <input
                    type="text"
                    id="addressInput"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="inputContainer">
                <label htmlFor="cardNumberInput">Número de Tarjeta:</label>
                <input
                    type="text"
                    id="cardNumberInput"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div className="inputContainer">
                <label htmlFor="securityCodeInput">Código de Seguridad:</label>
                <input
                    type="text"
                    id="securityCodeInput"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                />
            </div>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <Button variant="success" onClick={handleFinishPurchase}>
                Terminar Compra
            </Button>
            <Button variant="danger" onClick={() => navigate("/cart")}>
                Volver al Carrito
            </Button>
            <Button onClick={handleGoToHome}>Volver al Inicio</Button>
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

export default Checkout;
