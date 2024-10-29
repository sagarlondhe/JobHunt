import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompnay = async (req,res) => {
    try {
        const {companyName} =req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"Company already exists or You can't register same compnay.",
                success:false
            })
        };
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        
        return res.status(200).json({
            message:"Company Registered Successfully.",
            company,
            success:true
           
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompnay = async (req,res) => {
    try {
        const userId = req.id; //logged in user id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found.",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompnayById = async (req,res) => {
    try {
        debugger;
        const CompanyId = req.params.id; 
        const company = await Company.findById(CompanyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req,res) => {
    try {
        const {name,description,website,location} = req.body; 
        const file = req.file;
        //cloundnary 

        // const updateData = {name,description,website,location};
        
        // const compnay = await Company.findByIdAndUpdate(req.params.id, updateData,{new:true});


        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            })
        } return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}