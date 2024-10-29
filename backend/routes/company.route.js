import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompnay, getCompnayById, registerCompnay, updateCompany } from "../controllers/company.controller.js";
import { singleupload } from '../middlewares/multer.js';

const router =  express.Router();

router.route("/register").post(isAuthenticated,registerCompnay);
router.route("/get").get(isAuthenticated,getCompnay);
router.route("/get/:id").get(isAuthenticated,getCompnayById);
router.route("/update/:id").post(isAuthenticated,singleupload,updateCompany);

export default router;