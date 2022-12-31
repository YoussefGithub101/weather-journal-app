/* Global Variables */

const ApiKeyHere = 'aab37de1de27498f77cca68f67b959e2'
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = `&appid=${ApiKeyHere}&units=metric`; 
//'&units=metric' gets the temperature in celsius from openweathermap.org 


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    // get user input values
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    getWeather(baseURL, newZip, apiKey)
      .then(function (data) {
        // add data to POST request
        postData('/add', { date: newDate, temperature: data.list[0].main.temp, feelings })
        console.log(data)
        retrieveData()
      }).catch(function(error) {
        console.log(error);
        alert('zip code is invalid.');

    });
    }
  
  /* Function to GET Web API Data*/
  const getWeather = async (baseURL, newZip, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + newZip + apiKey);
    try {
      // userData equals to the result of fetch function
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
       
    }
  }
  
  /* Function to POST data */
  const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
     
    }
};
  
  
const retrieveData  = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = 'date:'+allData.date;
          document.getElementById('temp').innerHTML ='temperature: '+ Math.round(allData.temperature)+"°C";
          document.getElementById('content').innerHTML = `you're feeling ${allData.feelings}` ;
    }
    catch(error) {
      console.log("error", error);
       
      // appropriately handle the error
    }
   }