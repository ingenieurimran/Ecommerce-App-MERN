const Product = require('../model/productModel')

// Create Product -- Admin

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
}
// Get All Product
exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    products,
  })
}

// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return req.status(500).json({
      success: false,
      message: 'Product not found',
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    product,
  })
}

// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product not found',
    })
  }
  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product Delete Successfully',
  })
}