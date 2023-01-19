import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {}
};

export const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product, 'product');
    if (!product) {
      res.status(404);
      throw new Error();
    }
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: 'Product not found',
    });
  }
};
