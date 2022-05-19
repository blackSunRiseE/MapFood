const express = require('express');
const bodyParser = require('body-parser');
var uniqid = require('uniqid'); 
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
var DB = require('./database.json');
const config = require('./config.js');
const fs = require("fs");
const isAuth = require("./isAuth");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const userId = uniqid()
    if(DB.users.findIndex(user=>user.login===req.body.login) === -1){
        res.status(400).json()
    }
    DB.users.push({
        user_id:userId,
        name:req.body.login,
        login:req.body.login,
        password:req.body.password,
        user_reviews_id:[],
    })
    var DBobject = JSON.stringify(DB);
    fs.writeFile("./database.json", DBobject, err => {
        if (err) {
          console.error(err)
          return
        }
    });
    const token = jwt.sign({ userId }, config.secret, {expiresIn: 86400});
    res.status(200).json({'JWT':token})
});

app.post('/login', (req, res) => {
    
    const index = DB.users.findIndex(user=>{
        return (user.login ==req.body.login && user.password ==req.body.password)
    })
    if(index == -1){
        res.status(200).json({'success':false})
    }else{
        const user = DB.users[index]
        const userId = user.user_id
        const token = jwt.sign({ userId}, config.secret, {expiresIn: 86400});
        res.status(200).json({'success':true,'JWT':token,'name':user.name,'id':userId})
    }
    
    
});
app.get('/markersData', (req, res) => {
    res.status(200).json(DB.map)
});
app.post('/addReview',isAuth, (req, res) => {
    const reviewId =uniqid()
    const place = DB.map.find((item) => item.place_id == req.body.placeId)
    const userId = DB.users.find((item) => item.name == req.body.user).user_id
    DB.reviews.push({
        name:place.name,
        review:req.body.reviewValue,
        place_id:req.body.placeId,
        review_id:reviewId,
        rating:req.body.starsValue,
        date:req.body.date,
        likes:0,
        user_id:userId
    })
    DB.users.forEach(user=>{
        if(user.user_id == userId){
            user.user_reviews_id.push(reviewId)
        }
    })
    var DBobject = JSON.stringify(DB);
    fs.writeFile("./database.json", DBobject, err => {
        if (err) {
          console.error(err)
          return
        }
    });
    if(req.body.starsValue == 0){
        res.status(400).json({"suckass":true})
    }
    else{
        res.status(200).json({"suckass":true})
    }
});

app.post('/newMarker', (req, res) => {   
    DB.reviews.push(req.body)
    var DBobject = JSON.stringify(DB);
    fs.writeFile("./database.json", DBobject, err => {
        if (err) {
          console.error(err)
          return
        }
    });
    res.status(200).json({"norm":5})
})

app.post('/addPlace', (req, res) => {   
    const placeId =uniqid()
    DB.map.push({
        geometry:req.body.coords,
        name:req.body.placeName,
        description:req.body.description,
        place_id:placeId,
        adress:req.body.adress,
        webSite:req.body.webName,
        phone:req.body.phone
    })
    var DBobject = JSON.stringify(DB);
    fs.writeFile("./database.json", DBobject, err => {
        if (err) {
          console.error(err)
          return
        }
    });
    res.status(200).json({"suckass":true})
})

app.get('/placeList', (req, res) => {   
    const place = DB.map.map(place=>{
        let count = 0 
        let average = DB.reviews.reduce((sum, value) =>{
            if(value.place_id == place.place_id){
                count++;
                sum += value.rating;
            }
            return sum
        }, 0);
        if(average){
            place.avgScore = average/count
            place.countReviews = count
        }
        else{
            place.avgScore = 0
            place.countReviews = 0
        }

        return place
    })
    res.status(200).json(place)
})

app.post('/userData', (req, res) => {   
    const user = DB.users.filter(user => user.user_id == req.body.userId)
    res.status(200).json({'name':user[0].name,'reviews':user[0].user_reviews_id})
})

app.get('/reviewList/:placeId',(req,res)=>{
    const placeById = DB.map.filter(place =>{
        return place.place_id == req.params.placeId
    })
    const reviewById = DB.reviews.reduce((result,review) =>{
        if(review.place_id == req.params.placeId)
            {
                const userIndex = DB.users.findIndex((user)=>
                user.user_id == review.user_id)
                review.userInfo = {"name":DB.users[userIndex].name,"reviewCount":DB.users[userIndex].user_reviews_id.length}
                result.push(review)
            }
            return result;
      
    },[])
    const userInfo = DB.users.map(review =>{
        if(review.place_id == req.params.placeId)
        return 
    })
    res.status(200).json({reviewById,placeById})
})

app.patch('/addLike',(req,res)=>{
    let add = 1
    if(req.body.isLiked){
        add = -1
    }
    DB.reviews.forEach(item =>{
        if(item.review_id === req.body.reviewId){
            item.likes+=add
        }
    })
    var DBobject = JSON.stringify(DB);
    fs.writeFile("./database.json", DBobject, err => {
        if (err) {
          console.error(err)
          return
        }
    });

})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))


