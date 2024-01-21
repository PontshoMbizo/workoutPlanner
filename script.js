// ---------------------------------------------------- firebase configuration --------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
        let data =  Object.values(snapshot.val());
        let mytable = document.getElementById("table");
        for (let i of data){
            i = i.split("|");
            mytable.innerHTML += `<tr><td>${i[0]}</td><td>${i[1]}</td><td>${i[2]}</td><td>${i[3]}</td></tr>`
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
