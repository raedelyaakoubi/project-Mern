import { Box } from "@chakra-ui/react"
import { useState } from "react"
import ChatBox from "../../components/chatComponents/ChatBox"
import MyChat from "../../components/chatComponents/MyChat"
import SIdeDrawer from "../../components/chatComponents/SIdeDrawer"
import { ChatState } from "../../Context/ChatProvider"


const Chatpage = () => {
 const {user} = ChatState()
 const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <div  style={{ width: "100%" }} >
     {user && <SIdeDrawer/>}
    <Box
     display="flex"
     justifyContent='space-between'
     width='100%'
     height='91vh'
     p='10'
    >
      
    {user && <MyChat fetchAgain={fetchAgain}      />}
    {user && <ChatBox fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />}
    </Box>

    </div>
  )
}

export default Chatpage