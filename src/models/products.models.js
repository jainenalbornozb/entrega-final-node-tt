import { db } from './firebase.js';

import {collection, getDocs, doc, getDoc} from 'firebase/firestore';

// Function to get all products

const productsCollection = collection(db, 'products');


export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Could not fetch products");
    }
    
};

export const getProductById = async (id) => {
    try {
        const docRef = doc(productsCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null; // Product not found
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error("Could not fetch product");
    }
}