import { fetchAllProducts, createProduct, putProduct, fetchByIdProduct, deleteProduct, getAndVerifyDocSnap } from "../Repositories/ProductsRepository.js";

export const createProductController = async (req, res) => {
  try {
    console.log(` @createProduct Controller => req.body : ${JSON.stringify(req.body)}`);
    const id = await createProduct(req.body);
    res.status(201).json({message: 'Product created successfully', id: id});
  }catch (error){
    res.status(400).send(error.message);
  }
};

export const getProductsController = async (_, res) => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProductWithAnalytics = async (_, res) =>{
  try{
    const product = await getProductsController()
    res.status(200).json(product);
  }catch(error){
    res.status(400).send(error.message);
  }
}

export const getProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await fetchByIdProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Remember to reinitiate getProducts after using this function 
export const updateProductControllers = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    if (id == null || id == '') return res.status(400).send('id was empty');
    await putProduct(id, newData);
    res.status(200).json('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    // business logic
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).json('product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};