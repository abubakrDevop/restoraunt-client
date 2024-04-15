const { Product } = require("../database");
const ApiError = require("../exceptions/error");
const CategoryService = require("../services/category.service");
const {
  ProductNotFoundError,
  ProductAlreadyError,
} = require("../constants/errors");
const { savePhoto } = require("../utils/savePhoto");
const { Op } = require("sequelize");

class ProductService {
  async findAllProducts() {
    return Product.findAll();
  }

  async findAllActiveProducts() {
    return Product.findAll({
      where: {
        isActive: true,
      },
    });
  }

  async findProductById(id) {
    return Product.findByPk(id);
  }

  async findOrThrowProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw ApiError.CustomError(404, ProductNotFoundError);
    }

    return product;
  }

  async findProductByName(name) {
    return Product.findOne({
      where: { name },
    });
  }

  async create(body, req) {
    const { name, categoryId } = body;

    if (!req.files || Object.keys(req.files).length === 0) {
      throw ApiError.BadRequest("Некорректная фотография");
    }

    const image = await savePhoto(req);
    if (!image) {
      throw ApiError.BadRequest("Некорректная фотография");
    }

    await CategoryService.findOrThrowCategoryById(categoryId);

    const productData = await this.findProductByName(name);
    if (productData) {
      throw ApiError.CustomError(404, ProductAlreadyError);
    }

    return Product.create({ ...body, image });
  }

  async delete(id) {
    const product = await this.findOrThrowProductById(id);
    await product.destroy();
  }

  async update(id, body, req) {
    const { name } = body;

    if (req.files) {
      body.image = await savePhoto(req);
    }

    const product = await this.findOrThrowProductById(id);
    const productData = await Product.findOne({
      where: {
        id: {
          [Op.not]: product.id,
        },
        name,
      },
    });
    if (productData) {
      throw ApiError.CustomError(404, ProductAlreadyError);
    }

    return product.update(body);
  }
}

module.exports = new ProductService();
