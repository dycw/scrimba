import { dogs } from "./data.js";

const numDogs = dogs.length;

const getRandomDog = () => {
  const i = Math.floor(numDogs * Math.random());
  return dogs[i];
};

let currentDog = getRandomDog();

const getRandomDogUnequalToCurrent = () => {
  let candidate;
  do {
    candidate = getRandomDog();
  } while (candidate.name === currentDog.name);
  return candidate;
};

const render = () => {
  document.querySelector("img.dog-photo").src = currentDog.avatar;
  document.querySelector("div.card-text").innerHTML = `
    <p>${currentDog.name}, ${currentDog.age}</p>
    <p>${currentDog.bio}</p>
  `;
  document.getElementById("badge-like").style.display = currentDog.hasBeenLiked
    ? "inline"
    : "none";
  document.getElementById("badge-nope").style.display = "none";
};

render();

const updateStatus = (hasBeenLiked) => {
  currentDog.hasBeenLiked = hasBeenLiked;
  currentDog.hasBeenSwiped = true;
  render();
  setTimeout(() => {
    currentDog = getRandomDogUnequalToCurrent();
    render();
  }, 2000);
};

document.querySelector("div.button-cross").addEventListener("click", () => {
  updateStatus(false);
  document.getElementById("badge-nope").style.display = "inline";
});
document
  .querySelector("div.button-heart")
  .addEventListener("click", () => updateStatus(true));
