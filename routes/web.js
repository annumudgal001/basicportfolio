import express from 'express';
import {homecontroller} from '../controller/homecontroller.js';
import {contactcontroller,saveusercontroller} from '../controller/contactcontroller.js';
import {servicescontroller} from '../controller/servicescontroller.js';
import {skillscontroller} from '../controller/skillcontroller.js';

const app=express();
const router= express.Router();

router.post("/submit-contact",saveusercontroller)
router.get("/",homecontroller)
router.get("/contact",contactcontroller)
router.get("/skills",skillscontroller)
router.get("/services",servicescontroller)

export default router