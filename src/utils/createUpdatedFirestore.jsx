import {
    getFirestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    writeBatch,
    } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
    export const createOrder = async (cartItems, clearCart, total) => {
        const order = {
        buyer: { name: "kiki", phone: "626", email: "mailfalso123@gmail.com" },
        items: cartItems,
        total: total,
        };
        const db = getFirestore();
        const orderCollection = collection(db, "orders");
        try {
        const docRef = await addDoc(orderCollection, order);
        const orderId = docRef.id;
        const batch = writeBatch(db);
        cartItems.forEach((item) => {
            const productId = item.product.id;
            const finalStock = item.product.stock - item.quantity;
            const itemRef = doc(db, "Items", productId);
            batch.update(itemRef, { stock: finalStock });
        });
        batch.commit().then(() => {
            clearCart();
        });
        } catch (error) {
        console.log(error);
        }
    };
    export const updateOrder = async (productId, finalStock) => {
        if (productId && finalStock) {
        const db = getFirestore();
        const itemRef = doc(db, "Items", productId);
        await updateDoc(itemRef, { stock: finalStock });
        }else{
            console.log("algo salio mal")
        }
    };
    function getTotal(cartItems) {
        if (!Array.isArray(cartItems)) {
        return 0;}
        return cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
        );
    }

