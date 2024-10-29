import {v2 as cloudinary} from "cloudinary";
import dotenv  from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: 'dmr0roowl',
    api_key:'493254278817313',  
    api_secret: 'VouWbJ25xvDEwfjLdHxoLeVTrKQ',
    secure: true,
});

export default cloudinary;