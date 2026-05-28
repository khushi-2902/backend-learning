const express=require("express");
const app=express();
const path=require("path");
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require('uuid');
uuidv4();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));


app.listen(3000,()=>
{
    console.log(`app is listening on port ${3000}`);
});

let notes=[
    {
        id:uuidv4(),
        taskName:"wake up at 5:00",
        Aboutthetask:"have to study for upcoming ete",
    },
    {
          id:uuidv4(),
          taskName:"got to the gym ",
        Aboutthetask:"have to improve thehealth for the wedding"
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
app.post("/notes",(req,res)=>
{

    let {taskName,Aboutthetask}=req.body;
    let id=uuidv4();
    notes.push({id,taskName,Aboutthetask});
    console.log("post submitted successfully");
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



