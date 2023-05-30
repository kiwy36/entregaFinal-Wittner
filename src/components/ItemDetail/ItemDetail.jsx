import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Button, ButtonGroup } from "reactstrap";
import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";


const ItemDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <div className="container itemDetail">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Precio: ${product.price} kiwy pesos</p>
          <p>Stock: {product.stock} en disposición</p>
          <ItemCount
            stock={product.stock}
            onAdd={handleAddToCart}
            onGoToHome={handleGoToHome}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

