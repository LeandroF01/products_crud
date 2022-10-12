const router = require("express").Router();
const productsServices = require("../services/products.services");

router.get("/", productsServices.getAllProducts);
router.post("/", productsServices.postProducts);

router.get("/:id", productsServices.getProductById);
router.delete("/:id", productsServices.deleteProduct);
router.patch("/:id", productsServices.patchProducts);
router.put("/:id", productsServices.putProducts);

module.exports = router;
