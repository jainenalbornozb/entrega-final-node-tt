import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Referencia a la colección de productos
const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
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
      return null; // Producto no encontrado
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Could not fetch product");
  }
};

export const createProduct = async (product) => {
  try {
    const docRef = await addDoc(productsCollection, product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Could not add product");
  }
};

export const updateProduct = async (id, updatedProductData) => {
  try {
    const docRef = doc(productsCollection, id);
    // Usamos updateDoc para modificar parcialmente
    await updateDoc(docRef, updatedProductData);
    return { id, ...updatedProductData };
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Could not update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(productsCollection, id);
    await deleteDoc(docRef);
    return { id };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Could not delete product");
  }
};
