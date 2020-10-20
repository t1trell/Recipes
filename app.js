const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const appID = '691937a6';
const apiKey = 'bd6f065542c6b6bd506c162ff7529252';


searchForm.addEventListener('submit',  (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `${proxy}https://api.edamam.com/search?q=${searchQuery}&app_id=${appID}&app_key=${apiKey}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map(result => {
    generatedHTML +=
    `
        <div class="item">
          <img src="${result.recipe.image}">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: 'No Data Found'}</p>
          <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
      `
  })
  searchResultDiv.innerHTML = generatedHTML;
}
