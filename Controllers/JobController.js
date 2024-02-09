import Job from '../model/jobModel.js';
import { StatusCodes } from 'http-status-codes';

//Get All Jobs
export const getAllJobs = async (req, res) => {  //don`t get it
    console.log(req.user);
    const jobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({ jobs });
};

//Creat Job
export const creatJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const { company, position } = req.body;
    const job = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ job });
};

//Get Single Job
export const getSingleJob = async (req, res) => {
   const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({ job });
}

//Edit Job - update job
export const updateJob = async (req, res) => {
    const updatedjob = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(StatusCodes.OK).json({ job: updatedjob});
};

//Delete Job
export const deleteJob = async (req, res) => {
    const removeJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Job delete'});
}