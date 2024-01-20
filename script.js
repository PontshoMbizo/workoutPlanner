// firebase configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://workout-a2d03-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const workouts = ref(db, "workouts");

// add popup function when addBTN(clicked)

const addBTN = document.getElementById("add-exercise");

addBTN.addEventListener('click', ()=>{
    let form = document.getElementById("add");
    form.style.display = "flex";
})

// push data to firebase at Event(click)

const exercise = document.getElementById("exercise");
const duration = document.getElementById("duration");
const sets = document.getElementById("sets");
const rest = document.getElementById("rest");

const pushbtn = document.getElementById("add-workout");
pushbtn.addEventListener('click', () =>  {
    push(workouts, `${exercise.value} ${duration.value} ${sets.value} ${rest.value}`);
    let form = document.getElementById("add");
    form.style.display = "none";
    // appendToTree(); // appends an updated version of the table
})

// closing the popup adder

let cancel = document.getElementById("cancel");

cancel.addEventListener('click',()=>{
    let form = document.getElementById("add");
    form.style.display = "none";
})

// collect updated data from firebase

// this just fixes the data from firebase
// data in the form: [exercise duration sets rest, exercise duration sets rest, exercise duration sets rest...]
onValue(workouts, (snapshot)=>{
    let data =  Object.values(snapshot.val());
    appendToTree(data);
})

alert(fixedData)

function appendToTree(fixedData){

    // appends data to the table
    // data in the form of [exercise duration sets rest].split(" ") => [exercise, duration, sets, rest]
    for (let i of fixedData){
    i = i.split(" ");
    let mytable = document.getElementById("table");
    mytable.innerHTML += `<tr><td>${i[0]}</td><td>${i[1]}</td><td>${i[2]}</td><td>${i[3]}</td></tr>`
    }
}