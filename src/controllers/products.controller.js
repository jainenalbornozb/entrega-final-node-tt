import * as Service from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
    const products = await Service.getAllProducts();
    res.json(products);
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Service.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}

export const createProduct = async (req, res) => {
  const { name, price, categories } = req.body;

  const product = await Model.createProduct({ name, price, categories });

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, categories } = req.body;

  const updatedProduct = await Model.updateProduct(id, { name, price, categories });

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(updatedProduct);
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleted = await Model.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(204).send();
};