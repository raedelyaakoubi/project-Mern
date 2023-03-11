import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';



export const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast()
  const navigate = useNavigate()
  
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  


  //SUBMITHANDLER
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config ={
        headers:{
          "Content-type": "application/json",
        }
      };
      const {data} = await axios.post( `http://localhost:4000/api/user/register`,{
        name,
        email,
        password,
        pic,
      },config)
      
      //IF SUCCEFULL
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false)
      navigate ('/chat')
      


    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    
  };

 
  //POSTDETAILS
  const postDetails = (pic) => {
    setPicLoading (true)
    if (pic === undefined ){
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;

    }
    if (pic.type === "image/jpg" || pic.type === "image/png"){
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "fatmabj");
      data.append("cloud_name", "dkgfrmzry");
      fetch(`https://api.cloudinary.com/v1_1/dkgfrmzry/`,{
        method: "post",
        body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        console.log(data.url.toString());
        setPicLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoading(false);
      });
    }else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  
    

  return (
    <VStack  spacing='Spx'>
      <FormControl  id="first-name" isRequired >
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl  id="email" isRequired >
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl  id="password" isRequired >
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
           type={show ? "text" : "password"}
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement  width="4.5rem"   >
          <Button h="1.75rem" size="sm" onClick={handleClick} >
          {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
        
        
        </InputGroup>
        
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>


      <FormControl  id="pic" isRequired >
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}>
        Sign Up
      </Button>



    </VStack>
  )
}
