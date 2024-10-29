import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup} from "@/components/ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const SignUp = () => {

  const[input,setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:null
  });

  const {loading,user} = useSelector(store=>store.auth); 

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFileHandler = (e) => {
    setInput({...input,file:e.target.files?.[0]});
  }

  const  submitHandler = async (e) => {
    debugger
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);

    const profiledata = input.file; // Get the first selected file
    if (profiledata) {
        formData.append('file', profiledata); // Append the file to FormData
    }

    try {
      dispatch(setLoading(true));
      debugger
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers:{
           "Content-Type":"multipart/form-data; boundary=------------------------abcdef123456"
       },
        withCredentials:true, 
      });

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message);   
     } finally{
      dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto w-full">
        <form onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange = {changeEventHandler} placeholder="Enter Your Name"></Input>
          </div>

          <div className="my-3">
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange = {changeEventHandler} placeholder="Enter Your Email"></Input>
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number" value={input.phoneNumber} name="phoneNumber" onChange = {changeEventHandler} placeholder="Enter Your Phone Number"></Input>
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange = {changeEventHandler} placeholder="Enter Your Password"></Input>
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Label>Profile</Label>
            <Input
              accept="audio/*,video/*,image/*,MIME_type,.jpg, .jpeg, .png, .gif, .pdf"
              type="file"
              onChange={changeFileHandler}
              placeholder="Upload Your Profile"
              className="cursor-pointer mb-6"
            ></Input>
          </div>

          <div className="my-10">
          {
              loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait!</Button> : <Button type="submit" className="w-full">
              Signup
            </Button>
            }
            <span className="my-10 text-sm">Already have a account? <Link className="text-blue-600" to="/login">Login</Link></span>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
