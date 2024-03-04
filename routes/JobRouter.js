import { Router } from "express";
const router = Router();

import {getAllJobs, creatJob, getSingleJob, deleteJob, updateJob, showStats} from '../Controllers/JobController.js';
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js"; 
import { checkForTestUser } from "../middleware/AuthMiddleware.js";
// router.get('/', getAllJobs);
//  router.post('/', createJob);
 
 router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, validateIdParam, creatJob);

 router.route('/stats').get(showStats);
 router.route('/:id')
 .get(validateIdParam, getSingleJob)
 .patch(checkForTestUser,validateJobInput, validateIdParam, updateJob)
 .delete(checkForTestUser, validateIdParam, deleteJob);

 export default router;