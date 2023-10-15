var express = require('express');
var router = express.Router();
const {mongoose,usersModel} = require('../dbAddnews')
const {mongodb,dbName,dbUrl} = require('../dbConfig')
const {createToken,jwtDecode,validate,roleAdmin} = require('../auth')

mongoose.connect(dbUrl)


router.get('/getUserNews',async(req,res)=>{
  
      try {
        let token = req.headers.authorization.split(" ")[1];
        let data = await jwtDecode(token);
    
        let users = await usersModel.find({email:data.email});
      
        res.send({
          statusCode: 200,
          data: users,
        });
      } catch (error) {
        console.log(error);
        res.send({ statusCode: 401, message: "Internal Server Error", error });
      }
    });




router.post('/leadAdd', async(req,res)=>{
  try {
    let user = await usersModel.find({email:req.body.email})
    if(user.length)
    {
      res.send({
        statusCode:400,
        message:"lead Already Exists"
      })
    }
    else{
      let newUser = await usersModel.create(req.body)
      res.send({
        statusCode:200,
        message:"Lead added Successfull"
      })
    }
  } catch (error) {
    console.log(error)
    res.send({statusCode:200,message:"Internal Server Error",error})
  }
})



router.delete('/delete-userNews/:id',async(req,res)=>{
    try {
      let user = await usersModel.find({_id:mongodb.ObjectId(req.params.id)})
      if(user.length)
      {
         let users =await usersModel.deleteOne({_id:mongodb.ObjectId(req.params.id)})
        res.send({statusCode:200,message:"User deleted successfully"})
        }
      else
        res.send({statusCode:400,message:"User does not exists"})
    } catch (error) {
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
    }
  })

  router.get('/edit-userNews/:id',async(req,res)=>{
    try {
      let user = await usersModel.findOne({_id:mongodb.ObjectId(req.params.id)})
      console.log(user,"$$$$$$")
      if(user)
      {
        
        res.send(user)
        }
      else
        res.send({statusCode:400,message:"User does not exists"})
    } catch (error) {
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
    }
  })
   
  router.put('/edit-userNews/:id',async(req,res)=>{
    try {
      let user = await usersModel.findOne({_id:mongodb.ObjectId(req.params.id)})
      console.log(user)
      if(user)
      {
        user.name =req.body.name
        user.channelName =req.body.channelName
        user.title =req.body.title
        user.description =req.body.description
        user.email =req.body.email
       
        
        await user.save()
        res.send({statusCode:200,message:"User data saved successfully"})
        }
      else
        res.send({statusCode:400,message:"User does not exists"})
    } catch (error) {
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
    }
  })

  router.post('/addUserNews', async(req,res)=>{
    try {
      
        let newUser = await usersModel.create(req.body)
        res.send({
          statusCode:200,
          message:"News added Successfull"
        })
      
    } catch (error) {
      console.log(error)
      res.send({statusCode:200,message:"Internal Server Error",error})
    }
  })

  router.get('/getAllNews',async(req,res)=>{

    try {
      let users = await usersModel.find()

      console.log(users)
      res.send({
        statusCode:200,
        data:users
        
      })
  } catch (error) {
  console.log(error);
  res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
   })

module.exports = router;