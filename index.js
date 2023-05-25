document
  .querySelector("input[type='submit']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    render();
  });

const render = () => {
  const color = document.querySelector("input[type='color']").value;
  const mode = document.querySelector("select").value.toLowerCase();
  const url =
    "https://www.thecolorapi.com/scheme?" +
    new URLSearchParams({ hex: color, mode });
  fetch(url)
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      r.colors.map((data, idx) => setColor(idx, data.hex.value));
    })
    .catch((e) => console.log(e));
};

const setColor = (idx, hexCode) => {
  console.log(idx, hexCode);
  const i = idx + 1;
  const container = document.querySelector(
    `div.color-container:nth-of-type(${i})`
  );
  container.querySelector(`div:nth-of-type(1)`).style.backgroundColor = hexCode;
  container.querySelector(`div:nth-of-type(2)`).textContent = hexCode;
};

render();
