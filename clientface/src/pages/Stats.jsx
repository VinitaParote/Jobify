import React from 'react'
import { ChartsContainer, StatsContainer } from '../component';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const loader = async()=>{
  return null;
  const response = await customFetch.get('/jobs/stats')
  return response.data;
};

const Stats = () => {
  //const { defaultStats, monthlyApplications } = useLoaderData();
  const response = useQuery({
    queryKey: ['stats'],
    queryFn: () => customFetch.get('/jobs/stats'),
  });
  console.log(response);
  return <h1>React Query</h1>
  
  return (
    <>
    <StatsContainer defaultStats={defaultStats}/>
    {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}

export default Stats;