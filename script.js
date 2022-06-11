let result = document.querySelector("#result");

let formData = document.querySelector("#form_data");

let allInputs = document.querySelector("#inputs");

let brands = document.querySelector("#brands");

let loader = `<div><h1>Carregando...</h1></div>`;

function getAllCars() {
  result.innerHTML = loader;
  fetch("https://e-carros-api.herokuapp.com/adverts")
    .then((res) => res.json())
    .then((response) => {
      result.innerHTML = `${response
        .map(
          (elemento, index) =>
            `
          <div key="${index}"> 
            <h6> ${elemento.model} </h6>
            <img src="${elemento.photos[0]}" width="300px" heigth="auto"/>
          </div>
        `
        )
        .join("")}`;
    });
}

getAllCars();

function getBrands() {
  brands.innerHTML = loader;
  fetch("https://e-carros-api.herokuapp.com/brands")
    .then((res) => res.json())
    .then((response) => {
      brands.innerHTML = `${response
        .map(
          (element, index) =>
            `
            <center key="${index}">
              <img src="${element.logo}"  width="80px" heigth="auto"/>
              <p> ${element.name} </p>

            </center>
          `
        )
        .join("")}`;
    });
}

getBrands();

function getColors() {
  fetch("https://e-carros-api.herokuapp.com/colors")
    .then((res) => res.json())
    .then((result) => {
      allInputs.innerHTML = `${result
        .map(
          (el, index) =>
            ` <input key="${index}" type="radio" value="${el}">
        <label for="${el}"> ${el} </label>  
        <br />      
      `
        )
        .join("")}`;
    });
}

getColors();

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  result.innerHTML = loader;

  let colors = document.querySelectorAll('input[value][type="radio"]:checked');

  let colorsSelected = [];

  colors.forEach((element) => {
    colorsSelected.push(element.value);
  });

  fetch(
    `https://e-carros-api.herokuapp.com/adverts?${
      colorsSelected.length > 0 && `color=${colorsSelected}`
    }`
  )
    .then((res) => res.json())
    .then((response) => {
      result.innerHTML = `${response.map(
        (elemento, index) =>
          `
          <div key="${index}"> 
            <h6> ${elemento.model} </h6>
            <img src="${elemento.photos[0]}" width="300px" heigth="auto"/>
          </div>
        `
      )}`;
    });
});
