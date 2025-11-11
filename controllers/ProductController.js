import * as ProductRepository from "../Repositories/ProductsRepository.js";

export const create = async (req, res) => {
  try {
    console.log(` @createProduct Controller => req.body : ${JSON.stringify(req.body)}`);
    const id = await ProductRepository.create(req.body);
    res.status(201).json({message: 'Product created successfully', id: id});
  }catch (error){
    res.status(400).send(error.message);
  }
};

export const fetchBy = async (req, res) => {
  const {byTag, orderedByField, order, limitAt, startAfter} = req.query;
  try {
    const products = await ProductRepository.fetchBy({byTag, orderedByField, order, limitAt, startAfter})
    if(products.empty) res.status(400);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export const fetchAll = async (_, res) => {
  try {
    const products = await ProductRepository.fetchAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProductWithAnalytics = async (_, res) =>{
  try{
    const product = await ProductRepository.fetchAll()
    res.status(200).json(product);
  }catch(error){
    res.status(400).send(error.message);
  }
}

export const fetchById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductRepository.fetchById(id);

    if (!product) return res.status(404);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Remember to reinitiate getProducts after using this function 
export const putById = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    if (id == null || id == '') return res.status(400).send('id was empty');

    const success = await ProductRepository.putById(id, newData);

    if(!success) return res.status(404);
    res.status(200).json('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await ProductRepository.deleteById(id);
    
    if (!success) return res.status(404);

    res.status(200).json('product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};