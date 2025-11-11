import Product from "../models/Product.js";
import db from "../firebaseConfiguration.js";
import {collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const now = () => new Date().toISOString();

/**
 * @returns {Product[]}
 */
export const fetchAll = async () =>{
  const products = await getDocs(collection(db, 'products'));
  const productArray = [];
  if(!products.empty)
    products.forEach(doc => {
      try{      
        productArray.push(new Product({id: doc.id,...doc.data()}));//validation
      }catch(e){ 
        console.warn(`Skipped invalid doc ${doc.id} : ${e.message}`);
      }
    });
  return productArray;
}

/**
 * @returns {Product} - Malamang
 */
export const fetchById = async (id) =>{
  console.log('Fetching product id:', id);
  const docSnap = await getAndVerifyDocSnap(doc(db, 'products', id));
  const product = new Product({id: docSnap.id, ...docSnap.data()});
  return product;
}

/**
 * @returns {number} id of created product
 */
export const create = async (data) =>{
  const product = new Product({...data, created_at: now(), modified_at: now()}); //validation
  const docSnap = await addDoc(collection(db, 'products'), product.toFirestore());
  return docSnap.id;
}

/**
 * @param {number} id - id of updateable firld. Must exist beforehand
 * @param {object} data - data where all fields have been validated beforehand
 * @returns {void} void - ala ito dapat narereturn
 */
export const putById = async (id, data) =>{
  const updatedProduct = new Product({...data, modified_at: now(),});
  const docRef = doc(db, 'products', id);
  const docSnap = await getAndVerifyDocSnap(docRef);
  if(docSnap.exists()) async() => await updateDoc(docRef, updatedProduct.toFirestore());
}

/**
 * @returns {void}
 */
export const deleteById = async (id) => {
  const docRef = doc(db, 'products', id);
  await getAndVerifyDocSnap(docRef);
  await deleteDoc(docRef);
}

export const getAndVerifyDocSnap = async (docRef) => {
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error('Product not found');
  return docSnap;
}