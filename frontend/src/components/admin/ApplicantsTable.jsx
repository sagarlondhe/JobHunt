import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const statusHandler = async (status,id) =>{
  debugger
  try {
    axios.defaults.withCredentials = true;
    const res= await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{ status });
    if(res.data.success){
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    //toast.error(error.response.data.message);
  }
}

const ApplicantsTable = () => {
  const {applicants} =useSelector(store=>store.application);

  return (
    <div>
      <Table>
        <TableCaption className="mb-7">A List of Your Recent Applied User</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
            {
              applicants && applicants?.applications.map((item)=>(
                <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                {
                  item?.applicant?.profile?.resume ?  <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>

                }
                
                </TableCell>
                <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 ">
                      {
                      shortlistingStatus.map((status, index) => {
                        return (
                          <div onClick={()=> statusHandler(status, item?._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
              ))
            }
           
          </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
