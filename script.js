// ------------------------------------------------------ firebase configuration --------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://workout-a2d03-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const workouts = ref(db, "workouts");

//------------------------------------------------------ append everything onLoad ----------------------------------------------------------------

let body = document.getElementById('body');
body.onload = ()=>{
    onValue(workouts, (snapshot) => {
        let dataValues =  Object.values(snapshot.val());
        let dataKeys =  Object.keys(snapshot.val());
        let mytable = document.getElementById("tbody");
        for (let i = 0; i < dataValues.length; i++){
            let element = document.createElement("tr")
            element.addEventListener('click', ()=>{
                let elementLocation = ref(db, `workouts/${element.id}`)
                mytable.removeChild(element);
                remove(elementLocation);

            })
            let value = dataValues[i];
            value = value.split("|");
            element.innerHTML = `<td>${value[0]}</td><td>${value[1]}</td><td>${value[2]}</td><td>${value[3]}</td>`
            element.setAttribute("id", dataKeys[i]);
            mytable.appendChild(element);
        }
    })
}

//------------------------------------------------ add popup function when addBTN(clicked) -------------------------------------------------------

const addBTN = document.getElementById("add-exercise");

addBTN.addEventListener('click', ()=>{
    let form = document.getElementById("add");
    form.style.display = "flex";
})

// --------------------------------------------------- closing the popup adder -------------------------------------------------------------------

let cancel = document.getElementById("cancel");

cancel.addEventListener('click',()=>{
    let form = document.getElementById("add");
    form.style.display = "none";
})

//---------------------------------------------- push data to firebase at Event(click) -----------------------------------------------------------

const exercise = document.getElementById("exercise");
const duration = document.getElementById("duration");
const sets = document.getElementById("sets");
const rest = document.getElementById("rest");

const pushbtn = document.getElementById("add-workout");
pushbtn.addEventListener('click', () =>  {
    push(workouts, `${exercise.value}|${duration.value}|${sets.value}|${rest.value}`);
    let form = document.getElementById("add");
    form.style.display = "none";
})



// ----------------------------------------------------------------- the date -------------------------------------------------------------------------

const dateURL = "http://worldtimeapi.org/api/timezone/Africa/Johannesburg";
let dateElement = document.getElementById("date-text");
async function getDate(){
    const response = await fetch(dateURL);
    let data = await response.json()
    data = data.datetime.slice(0, 10)
    dateElement.innerHTML = " "+data;
}

getDate()

