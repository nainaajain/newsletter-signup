const express=require("express");
const request=require("request");
const bodyParser= require("body-parser");
const https=require("https");
const app= express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const ename=req.body.email;
    // console.log(firstname ,lastname,ename);
    const data={
        members:[
            {
                email_address: ename,
                status:"subscribed",
                merge_fields:{
                FNAME: firstname,
                LNAME: lastname
                }

            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us12.api.mailchimp.com/3.0/lists/b67172821d";
    const option = {
        method:"POST",
        auth: "naina1:095d088f7b876e24a0495212ac4dc06c-us12"

    }
    const request= https.request(url,option,function(response){


        if(response.statusCode===200){
            res.sendFile(__dirname +"/success.html");
            
        }
        else{
            res.sendFile(__dirname +"/failure.html");
        };



        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
     request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at 3000");
});



// apikey
// 095d088f7b876e24a0495212ac4dc06c-us12


// listid
// b67172821d