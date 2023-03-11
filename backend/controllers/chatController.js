const Chat = require ('../models/chatModel')
const User  = require('../models/userModel')


//ACCES CHAT
//création one on one chat ou récupération ...
const accessChat = async (req,res)=>{
    //if chat with this userId exist retur if no create chat with this userId
const {userId}  =  req.body
//chat dont exist
if (!userId){
    return res.status(400).send({message: "user don't exist"})
}
//chat exist
var isChat = await Chat.find({
    isGroupChat:false,
    //trouver les deux users
    $and:[
        //user connect and userID que nous essayons de créer chat 
        {users: { $elemMatch: { $eq: req.user._id}}},
        {users: { $elemMatch: { $eq: userId}}}
    ]

}).populate("users", "-password")
  .populate("latestMessage")    //remplir user array with userid and information sauf passsword
isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
} );
//if chat exist
if (isChat.length > 0) {
    res.send (isChat[0])
}else {
    var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId]
    };
    try {
        const createdChat = await Chat.create(chatData)
        const fullChat = await Chat.findOne({_id: createdChat._id}).populate(
            "users", "-password"
            );
            res.status(200).send(fullChat);
        
    } catch (error) {
        res.status(400).send("error message")
        
    }
}
}

//FETCHCHAT

const fetchChat = async (req,res) => {
    try {
        Chat.find({users: { $elemMatch: { $eq: req.user._id}} })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updateAt: -1})
        .then(async(results)=>{
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email",

            });
            res.status(200).send(results);
        })

    } catch (error) {
        res.status(400).send("error message")
        
    }
}

//CREATE GROUP CHAT

const createGroupChat = async (req,res)=>{
    if (!req.body.users  || !req.body.name ) {
        return res.status(400).send({message :"Please fill all the feilds"})
    }
    var users = JSON.parse(req.body.users)

    if (users.length < 2) {
        return res.status(400).send ("More then two users to form a group")
    }
    users.push(req.user)

    try {
    const groupChat =await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,

    });
    const fullGroupChat = await Chat.findOne({_id: groupChat._id})
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    res.status(200).json(fullGroupChat)

        
    } catch (error) {
        res.status(400).send("error message")
        
    }

}

//RENAME GROUP

const renameGroup = async (req,res) =>{
    const {chatId,chatName} = req.body;

    const updatedChat =  await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },{
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    if(!updatedChat){
        res.status(400).send("chat not found")
    }else {
        res.json(updatedChat)
    }
}

//ADD TO GROUP

const addToGroup = async (req,res) => {
   const {chatId,userId} = req.body;

   const added =await  Chat.findByIdAndUpdate(chatId, {
    $push: { users: userId},
   },
   {new: true}
   )
.populate("users", "-password")
.populate("groupAdmin", "-password");

if (!added) {
    res.status(400).send("chat not found")
}else {
    res.json(added)
}

}

//REMOVE TO GROUP

const removeFromGroup = async (req,res) => {
    const {chatId,userId} = req.body;
 
    const removed = await Chat.findByIdAndUpdate(chatId, {
     $pull: { users: userId},
    },
    {new: true}
    )
 .populate("users", "-password")
 .populate("groupAdmin", "-password");
 
 if (!removed) {
     res.status(400).send("chat not found")
 }else {
     res.json(removed)
 }
 
 }
 











module.exports={accessChat,fetchChat,createGroupChat,renameGroup,addToGroup,removeFromGroup}