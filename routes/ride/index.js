const express = require("express");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");

const CreateRideSchema = require("./schema/create");
const createRideController = require("../../controllers/ride/create");

const deleteRideSchema = require("./schema/delete");
const deleteRideController = require("../../controllers/ride/delete");

const getOneRideSchema = require("./schema/getOne");
const getOneRideController = require("../../controllers/ride/getOne");

const listRidesController = require("../../controllers/ride/list");
const updateRideController = require("../../controllers/ride/update");
router.get("/list", listRidesController);
router.get(
  "/:id",
  validateBody(getOneRideSchema, "params"),
  getOneRideController
);
router.post("/new", validateBody(CreateRideSchema), createRideController);
router.delete(
  "/:id",
  validateBody(deleteRideSchema, "params"),
  deleteRideController
);

router.put(
  "/:id",
  validateBody(getOneRideSchema, "params"),
  validateBody(CreateRideSchema),
  updateRideController
);

module.exports = router;
