import Job from '../model/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

//Get All Jobs
export const getAllJobs = async (req, res) => {  //don`t get it
    const { search, jobStatus, jobType } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
      };
    
      if (search) {
        queryObject.$or = [
          { position: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
        ];
      }
      if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus;
      }
      if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
      }
    console.log(queryObject);
    const jobs = await Job.find({queryObject});
    console.log('jobs', jobs);
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
    const _id = req.params.id;
    const job = await Job.findById(_id);
    console.log(job);
    //const job = await Job.findById('_id');
    res.status(StatusCodes.OK).json({ job });
}

//Edit Job - update job
export const updateJob = async (req, res) => {
    const updatedjob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('updatedjob', updatedjob);
    res.status(StatusCodes.OK).json({ job: updatedjob });
};

//Delete Job
export const deleteJob = async (req, res) => {
    const removeJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Job delete' });
}

//Stats 
export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    console.log(stats);
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
}