import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  ref,
  push,
  onValue,
  getDatabase,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://playground-6bec4-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const collection = ref(db, "WeAreTheChampions");

console.log(db);

document.querySelector("button").addEventListener("click", () => {
  const input = document.querySelector("input");
  push(collection, input.value);
  input.textContent = "";
});

onValue(collection, (snapshot) => {
  const ul = document.querySelector("ul");
  if (snapshot.exists()) {
    const endorsements = Object.values(snapshot.val());
    ul.innerHTML = endorsements.map((e) => `<li>${e}</li>`).join("");
  } else {
    ul.innerHTML = "No endorsements found";
  }
});
