const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const ride = require("./ride");
const router = express.Router();

// localhost:5000/v1/api-docs
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.use("/ride", ride);

module.exports = router;
