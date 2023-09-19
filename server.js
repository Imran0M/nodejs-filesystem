
// first we need to create one js file and 
// ----npm init -y /run this commant on cmd terminal for import package.json file
// and then we need to install express js
const express= require('express'); // import express for creating node server 
const fs = require('fs');
const path = require('path')
const outsideFolder = './output';

if(!fs.existsSync(outsideFolder)){
    fs.mkdirSync(outsideFolder)
}
const app = express();  //  calling express returns object
const port =3000;
app.get('/bio',(req, res)=>{
    res.send("Hello Iam Mohamed Imran ")
})

app.get('/createFiles',(req, res)=>{
    const currentTime = new Date()
    const year = currentTime.getFullYear().toString()
    const month = (currentTime.getMonth()+1)
    const date = currentTime.getDate()
    const hours = currentTime.getHours()
    const min = currentTime.getMinutes()
    const sec = currentTime.getSeconds()

    const currentTimeStamp = `${year}-${month}-${date}-${hours}-${min}-${sec}.txt`
    // console.log(currentTimeStamp)

    const filePath= path.join(outsideFolder, currentTimeStamp);
// write File first aruguments is where to write a file, second arguments is what to write inside a file
    fs.writeFile(filePath, currentTime.toISOString(),(err)=>{
        if(err){
            res.status(500).send("error")
        }
        else{
            res.send(filePath)
        }
    })
})


app.get('/inputReadFile',(req,res)=>{
    // readdir first argument is is where to read second arguments is callback (error , files) if files return true
    //else err
   fs.readdir(outsideFolder, (err, files)=>{
    if(err){
        res.status(500).send(`File is not working ${err}`)
    }
    const readFiles = files.filter((file)=>path.extname(file) === '.txt')
     res.json(readFiles)
   })
  
})
app.listen(port,()=>{
    console.log("App is listennig on port number :", port)
}) // listen app for application running on browser
