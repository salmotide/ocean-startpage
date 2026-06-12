/*Wallpaper Custom*/
const openPersonalize = document.getElementById("open-personalize");
const closePersonalize = document.getElementById("close-personalize");
const personalizePanel = document.getElementById("personalize-panel");

function personalPanel() {
  personalizePanel.classList.toggle("active");

  if (personalizePanel.classList.contains("active")) {
    openPersonalize.textContent = "Customized";
  } else {
    openPersonalize.textContent = "Customize";
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

openPersonalize.addEventListener("click", personalPanel);
closePersonalize.addEventListener("click", personalPanel);

const wallpaperInput = document.getElementById("wallpaper-input");
const resetWallpaper = document.getElementById("reset-wallpaper");
const defaultWallpaper = "image/bg.webp";

function setWallpaper(imageUrl) {
  document.body.style.backgroundImage = `
    linear-gradient(
      rgba(5,11,22,.65),
      rgba(5,11,22,.85)
    ),
    url("${imageUrl}")
  `;
}

const savedWallpaper = localStorage.getItem("wallpaper");

if (savedWallpaper) {
  setWallpaper(savedWallpaper);
}

wallpaperInput.addEventListener("change", () => {
  const file = wallpaperInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 1280;
      const scale = Math.min(maxWidth / img.width, 1);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedImage = canvas.toDataURL("image/jpeg", 0.55);

      try {
        localStorage.setItem("wallpaper", compressedImage);
      } catch (error) {
        console.error("Wallpaper terlalu besar untuk localStorage", error);
      }

      setWallpaper(compressedImage);
    };

    img.src = reader.result;
  };

  reader.readAsDataURL(file);
});

resetWallpaper.addEventListener("click", () => {
  localStorage.removeItem("wallpaper");
  setWallpaper(defaultWallpaper);
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

document.querySelectorAll("[data-theme]").forEach(button => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;

    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  });
});

document.querySelectorAll("[data-wallpaper]").forEach(button => {
  button.addEventListener("click", () => {
    const wallpaper = button.dataset.wallpaper;

    localStorage.setItem("wallpaper", wallpaper);
    setWallpaper(wallpaper);
  });
});

const wallpaperUrl = document.getElementById("wallpaper-url");
const applyWallpaperUrl = document.getElementById("apply-wallpaper-url");

applyWallpaperUrl.addEventListener("click", () => {
  const url = wallpaperUrl.value.trim();

  if (!url) return;

  const testImage = new Image();

  testImage.onload = () => {
    localStorage.setItem("wallpaper", url);
    setWallpaper(url);
    wallpaperUrl.value = "";
  };

  testImage.onerror = () => {
    alert("URL harus direct image, bukan halaman web. Pakai link yang berakhir .jpg, .webp, atau .webp.");
  };

  testImage.src = url;
});
