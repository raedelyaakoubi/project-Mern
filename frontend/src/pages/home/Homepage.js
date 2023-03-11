import React, { useEffect} from 'react'
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import { SignUp } from '../../components/signUp/SignUp'
import { SignIn } from '../../components/signIn/SignIn'
import {  useNavigate } from 'react-router-dom'



const  Homepage =()=> {
 
  const navigate=useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
  

    if (!user){
      navigate('/chat')
    }
  }, [navigate])
  
  return (
  <Container  maxW="xl" centerContent>
<Box
 display="flex"
 justifyContent="center"
 p={3}
 bg="white"
 w="100%"
 m="40px 0 15px 0"
 borderRadius="lg"
 borderWidth="1px"

  

>
  <Text
  fontSize="4xl" fontFamily="Work sans"
  
  
  >Live-Chat</Text>
</Box>
<Box bg="white" w="100%" p={4} borderRadius="lg" color='black'  borderWidth="1px">
<Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList  mb="1em" >
    <Tab width="50%"   >Sign In</Tab>
    <Tab  width="50%" >Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     {<SignIn/>}
    </TabPanel>
    <TabPanel>
       {<SignUp/>}
 
    </TabPanel>
  </TabPanels>
</Tabs>

</Box>


  </Container>
  )
}

export default Homepage