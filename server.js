const express=require("express");
const app=express();
const path=require("path");
const methodOverride = require('method-override');
const multer=require("multer");
const crypto=require("crypto");

app.use(express.static("public"));

app.use(methodOverride("_method"));

const { v4: uuidv4 } = require('uuid');
uuidv4();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

//storing the files in the server using diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/images')
  },
  filename: function (req, file, cb) {
     crypto.randomBytes(12,function(error,bytes){
        const fn=bytes.toString("hex")+path.extname(file.originalname)
    cb(null, fn)
  })
}

})


const upload = multer({ storage: storage })


app.listen(3000,()=>
{
    console.log(`app is listening on port ${3000}`);
});

app.get("/uploads",(req,res)=>
{
    
    res.render("notesUpload.ejs");
})

app.post("/uploads",upload.single('image'),(req,res)=>
{

    console.log(req.file);
    let image=req.file.filename;
    res.render("image.ejs",{image});
     console.log("file upload successfully");
})


let notes=[
    {
        id:uuidv4(),
        taskName:"wake up at 5:00",
        Aboutthetask:"have to study for upcoming ete",
          image: "download.jpg",
    },
    {
          id:uuidv4(),
          taskName:"got to the gym ",
        Aboutthetask:"have to improve thehealth for the wedding",
          image: "download.jpg",
    }
]

app.get("/notes",(req,res)=>
{
    res.render("home.ejs",{notes});
    
});

app.get("/notes/new",(req,res)=>
{
    res.render("notes.ejs");
});



//postRoute
app.post("/notes",upload.single('image'),(req,res)=>
{

    let {taskName,Aboutthetask}=req.body;
    let image=req.file.filename;
    let id=uuidv4();
    notes.push({id,taskName,Aboutthetask,image});
    console.log("post submitted successfully");
      console.log("file upload successfully");
    res.redirect('/notes');
   

});



app.get("/notes/:id",(req,res)=>
{
    let {id}=req.params;
    // console.log("Param id");
    // console.log(id);
    let note=notes.find((p)=> id===p.id);
    // console.log("find note");
    // console.log(note);
    res.render("show.ejs",{note});

})

app.get("/notes/:id/edit",(req,res)=>{
     let {id}=req.params;
      let note=notes.find((p)=> id===p.id);
    res.render("edit.ejs",{note});
})


//to update the edit form
app.patch("/notes/:id",(req,res)=>
{
    let {id}=req.params;
    let {newtaskName,newAboutthetask}=req.body;
    let note=notes.find((p)=> id===p.id);
    note.taskName=newtaskName;
    note.AboutThetask=newAboutThetask;
    res.redirect("/notes");
});


// app.patch("/posts/:id",(req,res)=>
// {
//   let {id}=req.params;
//   let newContent=req.body.content;
//   let newPost=req.body.post;
//   let post=posts.find((p)=> id===p.id);
//   post.content=newContent;
//   post.post=newPost;
//   // console.log(post);
//   res.redirect("/posts");
//   // res.send("patch request accepted");
// });



//deleteRoute
app.delete("/notes/:id",(req,res)=>
{
   let {id}=req.params;
//    console.log(id);
  notes=notes.filter((p)=> id!==p.id);
  res.redirect("/notes");
})





