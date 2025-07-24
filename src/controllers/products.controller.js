import * as Service from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Service.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Service.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, categories } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Nombre y precio son requeridos" });
    }

    const product = await Service.createProduct({ name, price, categories });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categories } = req.body;

    const updatedProduct = await Service.updateProduct(id, {
      name,
      price,
      categories,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Service.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
