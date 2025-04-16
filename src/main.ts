document.querySelector<HTMLDivElement>("#app")!.innerHTML = `<div class="card"></div>`;

// Card flip functionality
const card = document.querySelector('.card');

if (card) {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
}
