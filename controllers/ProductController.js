import Product from "../models/Product.js";
import db from "../firebase.js";
import {collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const now = () => new Date().toISOString();

export const createProduct = async (req, res) => {
    try {
      const data = req.body;
      console.log('product contoller @ data:',data);
      const product = new Product({...data, created_at: now(), modified_at: now()}); // Also tests that data is valid acc to model
      const docRef = await addDoc(collection(db, 'products'), product.toFirstore());
      res.status(201).json({message: 'Product created successfully', id: docRef.id});
    }catch (error){
        res.status(400).send(error.message);
    }
};

export const getProducts = async (_req, res) => {
  try {
    const products = await getDocs(collection(db, 'products'));
    const productArray = [];

    if (products.empty) {
      res.status(400).send('No Products found');
    } else {
      products.forEach(doc => {
        try{      productArray.push(new Product({id: doc.id,...doc.data()}));}
        catch(e){ console.warn(`Skipped invalid doc ${doc.id} ${e.message}`);}
      });
      res.status(200).send(productArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = await getDoc(docRef(db, 'products', id));
    if (data.exists()) {
      const product = new Product({id: docRef.id, ...docRef.data()})
      res.status(200).send(product);
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateProduct = async (req, res) => {
  /* Reinitiate getProducts after using this function */
  try {
    const id = req.params.id;
    const oldData = req.body;
    const updatedData = {...oldData, modified_at: now(),};
    await updateDoc(doc(db, 'products', id), updatedData);
    res.status(200).send('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'products', id));
    res.status(200).send('product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};