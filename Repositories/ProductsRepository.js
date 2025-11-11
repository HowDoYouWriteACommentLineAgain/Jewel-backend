import Product from "../models/Product.js";
import db from "../firebaseConfiguration.js";
import {collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, orderBy, where, query, limit } from "firebase/firestore";
//query and limit are not read. furthermore limit does not exist 
const now = () => new Date().toISOString();

/**
 * @returns {Product[]}
 */

const assembleArray = (products) => {
  const productsArray = [];
  if(!products.empty){
    products.forEach(doc => {
      try{      
        productsArray.push(new Product({id: doc.id,...doc.data()}));//validation
      }catch(e){ 
        console.warn(`Skipped invalid doc ${doc.id} : ${e.message}`);
      }
    });
  }
  return productsArray;
}

export const fetchAll = async () =>{
  const products = await getDocs(collection(db, 'products'));
  return assembleArray(products);
}

export const fetchBy = async ({byTag = null, orderedByField = null, order = 'asc', limitAt = 50, startAfter = null}) => {
  let q = collection(db, 'products');

  if(byTag)           q = query(q, where("tags", "array-contains", byTag));
  if(orderedByField)  q = query(q, orderBy(orderedByField, order));
  if(startAfter)      q = query(q, startAfter(startAfter));
  
  q = query(q, limit(limitAt))

  const products = await getDocs(q);
  return assembleArray(products);
}

/**
 * @returns {Product}
 */
export const fetchById = async (id) =>{
  console.log('Fetching product id:', id);
  const docSnap = await getDoc(doc(db, 'products', id));

  if (!docSnap.exists()) return null; // verify that doc even exists before validating

  const product = new Product({id: docSnap.id, ...docSnap.data()});
  return product;
}

/**
 * @returns {string} id of created product
 */
export const create = async (data) =>{
  const product = new Product({...data, created_at: now(), modified_at: now()}); //validation
  const docSnap = await addDoc(collection(db, 'products'), product.toFirestore());
  return docSnap.id;
}

/**
 * @param {string} id - id of updateable firld. Must exist beforehand
 * @param {object} data - data where all fields have been validated beforehand
 * @returns {bool} 
 */
export const putById = async (id, data) =>{
  try {
    const docRef = doc(db, 'products', id);
    const updatedProduct = new Product({...data, modified_at: now(), created_at: data.created_at});
    console.log("Now() = ",now());
    console.log(updatedProduct.modified_at);
    await updateDoc(docRef, updatedProduct.toFirestore());
    return true;
  } catch (error) {
    if (error.message === 'not-found');
    throw error;
  }
}

/**
 * @param {string}
 * @returns {bool}
 */
export const deleteById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);  
    return true;
  } catch (error) {
   if (error.message === 'not-found') return false;
   throw error;
  }
}