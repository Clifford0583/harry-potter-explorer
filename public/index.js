document.addEventListener("mousemove", function (e) {
  const spell = document.createElement("div");
  spell.classList.add("potion-effect");
  spell.style.left = e.pageX + "px";
  spell.style.top = e.pageY + "px";
  document.body.appendChild(spell);

  setTimeout(() => {
    spell.remove();
  }, 500);
});

let currentPage = 1;

async function loadMore() {
  try {
    currentPage++;
    const response = await fetch(`/load-more?page=${currentPage}`);
    const data = await response.json();

    // If no more characters, hide the button
    if (data.characters.length === 0) {
      document.getElementById("load-more-btn").style.display = "none";
      return;
    }

    const container = document.querySelector(".container-page");

    // Append new characters dynamically
    data.characters.forEach((character) => {
      const card = document.createElement("div");
      card.className = "character-card bg-gray-800 p-5 rounded-lg shadow-lg";
      card.innerHTML = `
        <img class="character-img w-full h-60 object-contain rounded-lg" 
             src="${character.attributes.image || "/images/missing.png"}"
             alt="${character.attributes.name}">
        <h3 class="text-xl font-bold mt-3"><strong>Name:</strong> ${
          character.attributes.name
        }</h3>
        <p><strong>Gender:</strong> ${
          character.attributes.gender || "Unknown"
        }</p>
        <p><strong>House:</strong> ${
          character.attributes.house || "Unknown"
        }</p>
        <div class="flex justify-center">
        <a href="/characters/${character.id}">
          <button class="view-btn bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600">
            View More
          </button>
        </a>
        </div>
      `;

      container.appendChild(card);
    });

    // ✅ MAGIC: FORCE TAILWIND TO APPLY ON NEW CONTENT
    if (window.tailwind) {
      tailwind.config = tailwind.config;
    }
  } catch (error) {
    console.error("Error loading more characters:", error);
  }
}

async function loadSpells() {
  try {
    currentPage++;
    const response = await fetch("/load-spell?page=" + currentPage);
    const data = await response.json();
    const container = document.querySelector(".container-spell");

    if (data.spells.length === 0) {
      document.getElementById("load-spell-btn").style.display = "none";
      return;
    }
    data.spells.forEach((spells) => {
      const card = document.createElement("div");
      card.className = "spell-card bg-gray-800 p-5 rounded-lg shadow-lg";
      card.innerHTML = `
        <img class="spell-img w-full h-60 object-contain rounded-lg" 
             src="${spells.attributes.image || "/images/missing.png"}"
             alt="${spells.attributes.name}">
        <h3 class="text-xl font-bold mt-3"><strong>Name:</strong> ${
          spells.attributes.name
        }</h3>
        <p><strong>Effect:</strong> ${spells.attributes.effect}</p>
        <p><strong>Category:</strong> ${spells.attributes.category}</p>
        <div class="flex justify-center">
        <a href="/spell/${spells.id}">
          <button class="view-btn bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600">
            View More
          </button>
        </a>
        </div>
      `;

      container.appendChild(card);
    });
    if (window.tailwind) {
      tailwind.config;
    }
  } catch (error) {
    console.error("Error loading spells:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const closeButton = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && closeButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
    });

    closeButton.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }
});
