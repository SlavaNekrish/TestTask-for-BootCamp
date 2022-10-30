const API_URL_CHARACTERS = "https://rickandmortyapi.com/api/character/";
// const API_URL_DETAILS = "https://rickandmortyapi.com/api/character/2";
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
        cardEl.addEventListener('click', () => openModal(id));
        cardsEl.appendChild(cardEl); 
      })
  });

// Modal 
const modalEl = document.querySelector(".modal");

async function openModal(ID) {
  try {
    const resp = await fetch(API_URL_CHARACTERS + ID);
    const respData = await resp.json();

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="modal_card">
    <img class="modal_character-backdrop" src="${respData.image}" alt="">
    <ul class="modal_character-info column1">
      <div class="loader"></div>
      <li class="modal_card_bold">Name:</li>
      <li class="modal_card-discription">${respData.name}</li>
      <li class="modal_card_bold">Status:</li>
      <li class="modal_card-discription">${respData.status}</li>
      <li class="modal_card_bold">Species:</li>
      <li class="modal_card-discription">${respData.species}</li>
    </ul>
    <ul class="modal_character-info column2">
      <div class="loader"></div>
      <li class="modal_card_bold">Origin:</li>
      <li class="modal_card-discription">${respData.origin.name}</li>
      <li class="modal_card_bold">Location:</li>
      <li class="modal_card-discription">${respData.location.name}</li>
      <li class="modal_card_bold">Gender:</li>
      <li class="modal_card-discription">${respData.gender}</li>
      <li class="modal_card_bold">Впервые - в эпизоде:</li>
      <li class="modal_card-discription">${respData.episode[0].split("https://rickandmortyapi.com/api/episode/").join(' ')}</li>
    </ul>
    <button type="button" class="modal_button-close"><img src="img/cross.png"></button>
    </div>  
  `
  const btnClose = document.querySelector(".modal_button-close");
  btnClose.addEventListener('click', () => closeModal());
  }
  catch (e) {
    console.error(`Something is bad ---> ${e}`);
  }
}

const closeModal = () => {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
})

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
})

// бесконечная прокрутка 

let page = 1;
window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 150 && page < 43) {
    page ++; 
    getCards(API_URL_CHARACTERS + "/?page=" + page)
      .then(({ results }) => {
        results
        .map(({ id, name, status, image }) => {
          const cardEl = document.createElement('div');
          cardEl.classList.add("card");
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
        cardEl.addEventListener('click', () => openModal(id));
        cardsEl.appendChild(cardEl); 
        console.log(page);
      })
  });
  }
})