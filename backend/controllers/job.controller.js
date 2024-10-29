import { Job } from "../models/job.model.js";

//admin
export const postJob= async (req, res) => {
try {
    debugger;
    const {title,description,requirements,salary,jobType,experience,position,companyId,location} = req.body;
    const userId = req.id;
    if(!title || !description || !requirements || !salary || !jobType|| !experience || !position || !companyId || !location){
        return res.status(400).json({
            message: "Something is missing. OR Please fill in all fields.",
            success:false
        });
    };
    const job = await Job.create({
        title,
        description,
        requirements:requirements.split(','),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId
    });

   
    return res.status(200).json({
        message: "New Job posted successfully",
        job,
        success:true
    });
} catch (error) {
    console.log(error);
}    
}

//student
export const getAllJobs = async (req, res) => {
    try {
        const keyword =req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company",
        }).sort({created_by:-1});
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//student 
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",

        });
        if(!job){
        return res.status(400).json({
            message: "Job not found",
            success:false
        })
        };
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        debugger
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path: "company",
            createdAt:-1
        })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }
        return res.status(200).json({
           jobs,
           success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}