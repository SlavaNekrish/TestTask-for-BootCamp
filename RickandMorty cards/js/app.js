const API_URL_CHARACTERS = "https://rickandmortyapi.com/api/character/";
const cardsEl = document.querySelector(".cards");

async function getCards(url) {
  try {
    const resp = await fetch(url);
    return await resp.json();
  }
  catch (e) {
    console.error(`Something is bad ---> ${e}`);
  }
}

getCards(API_URL_CHARACTERS)
  .then(({ results }) => {
    results
      .map(({ id, name, status, image }) => {
        const cardEl = document.createElement('div');
        cardEl.classList.add("card");
        cardsEl.appendChild(cardEl); 
        cardEl.innerHTML = `
          <div class="card">
            <div class="card_cover-inner">
              <img src='${image}' class="card_cover">
              <div class="card_cover--darkened"></div>
              </div>
              <div class="card_info">
              <div class="card_title">${name}</div>
            </div>
          </div>
        `;
      })
  })

