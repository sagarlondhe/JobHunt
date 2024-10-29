import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData =[
    {
        filterType:"Location",
        array:["Mumbai","Navi Mumbai","Pune","Bangalore","Hyderabad","Chennai","Gujarat","Delhi"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","Full Stack Developer","Quality Assurance Tester","Cloud Engineer","DevOps Engineer","Business Analyst","UI/UX Designer","Software Developer"]
    }, 
    // {
    //     filterType:"Salary",
    //     array:["0-40k","41k-1L","1L-5L","5L-10L","10L-25L","26L-50L"]
    // }
]

const FiterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                filterData.map((data,index)=>(
                    <div>
                        <h1 className='font-bold text-lg '>{data.filterType}</h1>
                        {
                            data.array.map((item,idx)=>{
                                const itemId = `id${index}-${idx}`
                                return(
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label  htmlFor={itemId}>{item}</Label>
                                    </div>

                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FiterCard