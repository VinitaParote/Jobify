import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  console.log("data",data)
  const { jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
// import Job from './Job';
// import Wrapper from '../assets/wrappers/JobsContainer';

// import { useAllJobsContext } from '../pages/AllJobs';

// const JobsContainer = () => {
// //   const { data } = useAllJobsContext();
// const { data } = useAllJobsContext() || {}; // Default to an empty object if useAllJobsContext() returns undefined

//   const { jobs } = data;
//   if (jobs.length === 0) {
//     return (
//       <Wrapper>
//         <h2>No jobs to display...</h2>
//       </Wrapper>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className='jobs'>
//         {jobs.map((job) => {
//           return <Job key={job._id} {...job} />;
//         })}
//       </div>
//     </Wrapper>
//   );
// };

// export default JobsContainer;
