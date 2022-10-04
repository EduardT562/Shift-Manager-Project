const greetings = document.querySelector('#greetings');

function glowUsername() {
  setInterval(() => greetings.toggleClass('glow'), 1000);
}
