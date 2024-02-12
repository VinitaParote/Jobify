import { Router } from "express";
const router = Router();

import {getAllJobs, creatJob, getSingleJob, deleteJob, updateJob} from '../Controllers/JobController.js';
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js"; 
// router.get('/', getAllJobs);
//  router.post('/', createJob);

 router.route('/').get(getAllJobs).post(validateJobInput, validateIdParam, creatJob);
 router.route('/:id')
 .get(validateIdParam, getSingleJob)
 .patch(validateJobInput, validateIdParam, updateJob)
 .delete(validateIdParam, deleteJob);

 export default router;