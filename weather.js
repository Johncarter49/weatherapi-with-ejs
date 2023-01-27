
// http://api.weatherapi.com/v1/current.json?key=0c104561cd4d4366b4f124022232301&q=London

const axios = require('axios'); 
const { response } = require('express');
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const viewPath = path.join(__dirname, "./views")

// console.log(viewPath);
app.use(express.static(path.join(__dirname,"./public")))
app.set("view engine", "ejs");
app.set("views", viewPath)


app.get("/",(req,res)=>{
    // res.send("Hello")
    const content = "That is Your Weather App";

    res.render("index", {data: content});
});

app.get("/myform", (req,res)=>{
    const content = "That is Your Weather App";
    const myText = req.query.mytext;
    res.render("index", {data: content, "your city:": myText})
    console.log();
})

app.get("/about", (req,res)=>{
    res.render("about");
})


  async function posts(){
      try{
          const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.KEY}&q=${process.argv[2]}&days=7`);
          console.log(`
          ${response.data.location.name} is the city and 
          `);
          console.log(`
          It is now ${response.data.current.temp_c}°C in ${response.data.location.name}
          `);
          console.log(`
          The current weather conditions are:  ${response.data.current.condition.text}
          `);
         response.data.forecast.forecastday.map((date)=>{
             console.log(`
             ${date.date} is the date and the temperature is max: ${date.day.maxtemp_c}
              `);
         }) 
        // response.data.forecast.forecastday[0].day.maxtemp_c);
        // console.log(response.data); 
        
        //   console.log(response.data.location.name);
        //   console.log(response.data.current.temp_c);
        //   console.log(response.data.current.condition.text);
      } catch(error){
          console.error(error.message);
      }
  }

 posts();



app.listen(6001,()=>{
    console.log("port work on 6001");
})