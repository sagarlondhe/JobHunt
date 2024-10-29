import React, { useEffect, useState } from 'react'
import { Badge } from './badge'
import { Button } from './button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const params = useParams();   
    const jobId = params.id;

  const dispatch = useDispatch();
  const navigate =useNavigate();

  const applyJobHandler = async()=>{
    try {
        const res =  await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
        if(res.data.success){
            setIsApplied(true); // update the local state
            const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
            dispatch(setSingleJobs(updatedSingleJob)); // helps us to real time UI Update
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
  }
  
  useEffect(()=>{
    const fetchSingleJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setSingleJobs(res.data.job));
                setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) //ensure the state is in sync with fetch data
            }
        } catch (error) {
            console.log(error);
          
        }
    }
    fetchSingleJobs();
  },[jobId,dispatch,user?._id]);

  return (
    <div className='max-7xl mx-auto my-10 mr-8 ml-8'>
        <div className='flex items-center justify-between'>
            <div>
            <h1 className='font-bold text-xl'> {singleJob?.title} </h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant='ghost'>{singleJob?.position}  Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{singleJob?.jobType}</Badge>
                    <Badge className={'text-[#ae76d3] font-bold'} variant='ghost'>{singleJob?.salary} LPA</Badge>
                </div>
            </div>
            <Button 
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied} 
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                      { isApplied ? 'Alreday Applied':'Apply Now'}
            </Button>

        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description} </h1>
        <div className='my-4'>
            <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} Year/s</span></h1>
            <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length} </span></h1>
            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]} </span></h1>
            <Button className="bg-[#7209b7] hover:bg-[#5f32ad] text-white mt-5" onClick ={()=> navigate(`/jobs`)} variant='outline'>Back</Button>

        </div>
    </div>
  )
}

export default JobDescription
