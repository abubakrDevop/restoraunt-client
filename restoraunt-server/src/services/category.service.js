const { Category, Product } = require("../database");
const ApiError = require("../exceptions/error");
const {
  CategoryNotFoundError,
  CategoryAlreadyError,
} = require("../constants/errors");
const { Op } = require("sequelize");

class CategoryService {
  async findAllCategories() {
    return Category.findAll();
  }

  async findCategoryById(id) {
    return Category.findByPk(id);
  }

  async findOrThrowCategoryById(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw ApiError.CustomError(404, CategoryNotFoundError);
    }

    return category;
  }

  async findCategoryByTitle(title) {
    return Category.findOne({
      where: { title },
    });
  }

  async create(title) {
    const category = await this.findCategoryByTitle(title);
    if (category) {
      throw ApiError.CustomError(409, CategoryAlreadyError);
    }
    return Category.create({ title });
  }

  async delete(id) {
    const category = await this.findOrThrowCategoryById(id);
    await category.destroy();
    return true;
  }

  async update(id, body) {
    const { title } = body;
    console.log(title);
    const category = await this.findOrThrowCategoryById(id);
    const categoryData = await Category.findOne({
      where: {
        id: {
          [Op.not]: category.id,
        },
        title,
      },
    });
    if (categoryData) {
      throw ApiError.CustomError(409, CategoryAlreadyError);
    }
    return category.update(body);
  }
}

module.exports = new CategoryService();
