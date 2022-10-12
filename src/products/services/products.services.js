const productsControllers = require("../controllers/products.controllers");

const getAllProducts = (req, res) => {
  productsControllers
    .getAllProducts()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const postProducts = (req, res) => {
  const data = req.body;
  if (data.name && data.category && data.price && data.isAvailable) {
    productsControllers
      .createProducts(data)
      .then((res) => {
        res.status(201).json(res);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: "Missing data" });
  }
};

const getProductById = (req, res) => {
  const id = req.params.id;

  productsControllers
    .getProductById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const patchProducts = (req, res) => {
  const id = req.params.id;
  const { name, category, price, isAvailable } = req.body;

  productsControllers
    .editProduct(id, { name, category, price, isAvailable })
    .then((res) => {
      if (res[0]) {
        res.status(200).json({
          message: `Movie with id: ${id}, edited succesfully`,
        });
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const putProducts = (req, res) => {
  const id = req.params.id;
  const { name, category, price, isAvailable } = req.body;

  if (name && category && price && isAvailable) {
    productsControllers
      .editProduct(id, { name, category, price, isAvailable })
      .then((res) => {
        if (res[0]) {
          res
            .status(200)
            .json({ message: `Product with ID ${id}, edited succesfully` });
        } else {
          res.status(404).json({ message: "Invalid ID" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Missing data",
      fields: {
        id: "uuid",
        name: "string",
        category: "string",
        price: "integer",
        isAvailable: "bool",
      },
    });
  }
};

const deleteProduct = (req, res) => {
  const id = req.params.id;

  productsControllers
    .deleteProduct(id)
    .then((res) => {
      if (res) {
        res.status(204).json();
      } else {
        res.status(400).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getAllProducts,
  getProductById,
  postProducts,
  patchProducts,
  putProducts,
  deleteProduct,
};
