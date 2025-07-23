import { db } from './firebase.js';

import {collection, getDocs} from 'firebase/firestore';

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
    
}