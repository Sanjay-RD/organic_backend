const asyncHandler = require("express-async-handler");
const { Product } = require("../models");
const { Op } = require("sequelize");

// @des      Get All Product
// @route    GET /api/product
// @Access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  if (products) {
    res.json(products);
  } else {
    res.status(400);
    throw new Error("Products Not Found");
  }
});

// @des      Get Product
// @route    GET /api/product/:id
// @Access   public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (product) {
    res.status(200);
    res.json(product);
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

// @des      Add Product
// @route    POST /api/product
// @Access   private
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, sub_category } = req.body;
  const newProduct = await Product.create({
    name,
    price,
    description,
    image,
    category,
    sub_category,
  });

  if (newProduct) {
    res.status(201);
    res.json(newProduct);
  } else {
    res.status(400);
    throw new Error("Invalid Product Data");
  }
});

// @des      Update Product
// @route    PUT /api/product/:id
// @Access   private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, sub_category } = req.body;

  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.sub_category = sub_category || product.sub_category;
    const updateProduct = await product.save();
    res.json({
      message: "Product updated",
      product: updateProduct,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Product Data");
  }
});

// @des      Delete Product
// @route    DELETE /api/product/:uuid
// @Access   private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (product) {
    await product.destroy();
    res.json({
      success: true,
      message: "Product Deleted",
    });
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
