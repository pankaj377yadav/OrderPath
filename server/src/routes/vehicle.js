const Vehicle = require("../model/vehicle");
const express = require("express");
const router = express.Router();
const VehicleController = require("../controller/vehicle");

router.post("/vehicles", VehicleController.addVehicleInfo);

router.get("/vehicles/:id", VehicleController.getVehicleInfo);

router.delete("/vehicles/:id", VehicleController.deleteVehicleInfo);

router.put("/vehicles/:id", VehicleController.updateVehicleInfo);

router.get("/vehicles", VehicleController.getVehicles);

module.exports = router;
