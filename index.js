const meter_to_feet = 3.281;
const liter_to_gallon = 0.264;
const kilogram_to_pound = 2.204;

const inputField = document.getElementById("input-field");

const updateField = (kind, curr, baseUnit, factor, otherUnit) => {
  document.getElementById(kind).querySelector(".result-value").textContent = `
    ${curr} ${baseUnit} = ${(curr * factor).toFixed(3)} ${otherUnit}
    |
    ${curr} ${otherUnit} = ${(curr / factor).toFixed(3)} ${baseUnit}`;
};

const render = () => {
  const curr = inputField.value;
  updateField("length", curr, "meters", meter_to_feet, "feet");
  updateField("volume", curr, "liters", liter_to_gallon, "gallons");
  updateField("mass", curr, "kilos", kilogram_to_pound, "pounds");
};

inputField.addEventListener("keyup", render);
document.getElementById("convert-btn").addEventListener("click", render);

if (inputField.value !== null) {
  render();
}
