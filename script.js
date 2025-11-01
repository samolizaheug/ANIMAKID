let animals = [];

class Animal {
  constructor(name, soundFile, imageFile) {
    this.name = name;
    this.soundFile = soundFile;
    this.imageFile = imageFile;
  }
}

const SoundManager = {
  playSound(path) {
    const audio = new Audio(path);
    audio.play().catch(err => console.error("Error al reproducir:", err));
  }
};

function renderAnimalButtons() {
  const container = document.getElementById('animal-container');
  const banner = document.getElementById('animal-name-banner');

  animals.forEach(animal => {
    const btn = document.createElement('button');
    btn.classList.add('animal-button');
    btn.innerHTML = `
      <img src="${animal.imageFile}" alt="${animal.name}" />
      <span>${animal.name}</span>
    `;
    btn.addEventListener('click', () => {
      SoundManager.playSound(animal.soundFile);
      showAnimalName(banner, animal.name);

      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 300);
    });
    container.appendChild(btn);
  });
}

function showAnimalName(banner, name) {
  banner.textContent = name;
  banner.style.opacity = 1;
  setTimeout(() => {
    banner.style.opacity = 0;
  }, 1500);
}

function setupMusicToggle() {
  const btn = document.getElementById('toggle-music');
  const music = document.getElementById('bg-music');
  let playing = false;

  btn.addEventListener('click', () => {
    if (!playing) {
      music.play();
      btn.textContent = '🔇 Apagar música';
      playing = true;
    } else {
      music.pause();
      btn.textContent = '🎵 Encender música';
      playing = false;
    }
  });
}

async function loadAnimals() {
  try {
    const res = await fetch('data/animals.json');
    const data = await res.json();
    animals = data.map(item => new Animal(item.name, item.sound, item.image));
    renderAnimalButtons();
  } catch (error) {
    console.error("❌ Error al cargar animals.json:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadAnimals();
  setupMusicToggle();
});
