const express=require("express");
const app=express();
const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));


app.listen(3000,()=>
{
    console.log(`app is listening on port ${3000}`);
});



app.get("/notes",(req,res)=>
{
    res.render("home.ejs");
    
});



let notes=[
    {
        taskName:"wake up at 5:00",
        Aboutthetask:"have to study for upcoming ete",
    },
    {
          taskName:"got to the gym ",
        Aboutthetask:"have to improve thehealth for the wedding"
    }
]


app.get("/notes/new",(req,res)=>
{
    res.render("notes.ejs");
});

app.post("/notes",(req,res)=>
{
    let {taskName,Aboutthetask}=req.body;
    notes.push({taskName,Aboutthetask});
    console.log("post submitted successfully");
    res.redirect('/notes');

})