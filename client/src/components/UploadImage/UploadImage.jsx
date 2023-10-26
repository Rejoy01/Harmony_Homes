import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai"
import './UploadImage.css'
import { Button, Group } from '@mantine/core';


const UploadImage = ({prevStep,propertyDetails,setPropertyDetails,nextStep}) => {
    const [active,setActive] = useState(0);
    const {user} = useAuth0()

    const [imageUrl,setImageUrl] = useState(propertyDetails.image);

    const cloudinaryRef = useRef()

    const widgetRef = useRef()

    const handleNext =()=>{
        setPropertyDetails((prev)=>({
            ...prev,image:imageUrl
        }))
        nextStep()
    }

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName:"dk3chvzj3",
                uploadPreset:"pw0fq1zx",
                maxFiles:1
            },
            (err,result)=>{
                if(result.event === "success"){
                    setImageUrl(result.info.secure_url)
                }
            }
        )
    },[])
  return (
    <div className='flexColCenter uploadWrapper'>

        {
            !imageUrl?(
                <div className="flexColCenter uploadZone" onClick={()=>widgetRef.current?.open()}>
                    <AiOutlineCloudUpload size={50} color = "grey" />
                    <span>Upload Image</span>
                </div>
            ):(
                <div className="uploadedImage" onClick={()=>widgetRef.current?.open()}>
                    <img src={imageUrl} alt="" />
                </div>
            )
        }
       <Group position="center" mt={"xl"}>
        <Button type="submit" onClick={prevStep}>Back Step</Button>
        <Button type="submit" onClick={handleNext} disabled={!imageUrl}>Next Step</Button>
      </Group>
    </div>
  )
}

export default UploadImage
