const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const deadlineDate = document.querySelector(".deadline");
const  about = document.querySelector(".deadline-container");
const timerDisplay = document.querySelectorAll(".deadline-count h4");

// to set the timer such that everytime the page is loaded then it initiates the days remaining to  +15days
 let theDate = new Date();
 let theYear = theDate.getFullYear();
 let theMonth = theDate.getMonth();
 let theDay = theDate.getDate();

//  let futureDate = new Date(2020, 8, 25, 19, 30, 00); //  console.log(futureDate);

const  futureDate = new Date(theYear, theMonth, theDay + 15, 19, 30, 00);
const year = futureDate.getFullYear();
const month = futureDate.getMonth();
// console.log(month); //--> month index starts from 0 ie   Jan = index 0, May = 4
 const Month = months[month];
//  console.log(Month);
const day = weekDays[futureDate.getDay()];
// weekdays are given as numbers in getDay();
const date = futureDate.getDate();
const hours= futureDate.getHours();
const minutes = futureDate.getMinutes();

deadlineDate.textContent = `Offer deadline is on: ${day}, ${date}th ${Month} ${year} at ${hours}:${minutes}pm`;

//set the time -- timer
  const futureTime = futureDate.getTime();
//   console.log(futureTime);

//    find the time in milliseconds
function getRemainingTime(){
    const todayTime = new Date().getTime();
// console.log(todayTime);
const timeRemain =  futureTime - todayTime;

/*
get the time in:  ms
1sec = 1000ms
1min = 60sec
1hr = 60mins
1dy = 24hr
*/
 const oneDay = 24*60*60*1000;
 const oneHr = 60*60*1000;
 const oneMin = 60*1000;

//  calculate all the values --> Express the values in whole numbers
let days = timeRemain/oneDay;
days = Math.floor(days);

// to find the rest use the remainder of the days
let hours = Math.floor((timeRemain % oneDay) / oneHr);
// console.log(hours);
let minutes = Math.floor((timeRemain % oneHr) / oneMin);
let seconds = Math.floor((timeRemain % oneMin) / 1000);


//   loop thru the deadline div and place the values accordingly
const values = [ days, hours, minutes, seconds];
    //   set the 0's before the values less than 10
   function formatZero(value){
       if(value < 10){
           return (value = `0${value}`);
       }
       else{
           return value;
       }
   }

    // alliterate the remaining time with the values array to display the time in the HTML
   timerDisplay.forEach((number, index)=>{
   //also include the zero before:
    number.innerHTML = formatZero(values[index]);
})

   //add info to be displayed after the countDown runs 
   if(timeRemain < 0){
       clearInterval(countTimer);
       about.innerHTML = `<h3 class="expire"> Sorry, the offers have expired!!</h3>`;
       about.style.display = "flex";
   }
}
//   set the contdown timer
let countTimer = setInterval(getRemainingTime, 1000);
getRemainingTime();