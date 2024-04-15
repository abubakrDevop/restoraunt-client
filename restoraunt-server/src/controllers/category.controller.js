const CategoryService = require("../services/category.service");
const { Success } = require("../constants/httpStatus");

class CategoryController {
  async findAll(req, res, next) {
    try {
      const categories = await CategoryService.findAllCategories();

      return res.json(categories);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.findOrThrowCategoryById(id);

      return res.json(category);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { title } = req.body;
      const category = await CategoryService.create(title);
      return res.json(category);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await CategoryService.delete(id);
      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.update(id, req.body);
      return res.json(category);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }
}

module.exports = new CategoryController();
