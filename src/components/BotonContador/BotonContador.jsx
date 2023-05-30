import { useState } from 'react';
import './Boton.css';
import Contador from '../../Hooks/useCount';


const BotonContador = () => {
    const { count, Increment, Decrement, Reset } = Contador(0, 5);

    return (
        <div className="boton-container">
            <h1>tienes {count} cosos marcados</h1>
            <button onClick={Decrement}>-</button>
            <button onClick={Increment}>+</button>
            <button onClick={Reset}>reiniciar</button>
        </div>
    );
};

export default BotonContador;
