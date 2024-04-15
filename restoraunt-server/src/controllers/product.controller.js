const ProductService = require("../services/product.service");
const { Success } = require("../constants/httpStatus");
const { savePhoto } = require("../utils/savePhoto");

class ProductController {
  async findAll(req, res, next) {
    try {
      const products = await ProductService.findAllProducts();

      return res.json(products);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async findAllActive(req, res, next) {
    try {
      const products = await ProductService.findAllActiveProducts();
      return res.json(products);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.findOrThrowProductById(id);

      return res.json(product);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const product = await ProductService.create(body, req);

      return res.json(product);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await ProductService.delete(id);
      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.update(id, req.body, req);
      return res.json(product);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }
}

module.exports = new ProductController();
