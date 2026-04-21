// images
const imageNames = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const altValues = [
  "The Panoply repeterar i lantlig trädgård",
  "The Panoply spelar för kvarteret i Södertälje i samband med födelsedagsfest",
  "The Panoply underhåller på Gekås Sommarscen 2025 i Ullared",
  "The Panoply spelar på kvällen under Eksjö Stadsfest 2023",
  "The Panoply på scen under Caribbean Ting 2024 i Malmö Folkets Park",
  "The Panoply spelar på kvällen under Eksjö Stadsfest 2023",
  "The Panoply förbereder för spelning i Södertälje centrum",
  "The Panoply levererar underhållning för deltagarna i löpeventet Tjejmilen",
  "The Panoply deltar i Järna Kulturfest 2024",
  "The Panoply ställer upp med medley i Talang 2020",
  "The Panoply på scen inför spelning med Isak Sundström och Victoria Verseau på Uppsala Slotts konstmuseum 2022",
  "The Panoply spelar ambient inom Lumen Project med Isak Sundström och Victoria Verseau i Eric Ericssonhallen 2022"
]

// Check webp support and fallback to jpeg in old browsers
function checkWebPSupport() {                                                                                                                                                                   
  const canvas = document.createElement("canvas");
  if (canvas.getContext && canvas.getContext("2d")) {
    const isSupported =
      canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    return isSupported;
  }
  return false; // Fallback for very old browsers
}
const extension = (checkWebPSupport() && "webp") || "jpg";

// Pick large or small images based on screen width
const large = imageNames.map((img) => `images/carousel/${img}.${extension}`);
const small = imageNames.map(
  (img) => `images/carousel/${img}.small.${extension}`,
);
const images = screen.width > 1000 ? large : small;

// Set up images
const slideContainer = document.getElementById("slide_container");
images.forEach((url, id) => {
  const img = document.createElement("img");
  if (id == 0) {
    img.setAttribute("class", "currentImage");
  };
  img.setAttribute("role", "group");
  img.setAttribute("alt", altValues[id]);
  img.setAttribute("aria-label", `${id} of ${images.length}`);
  img.setAttribute("aria-roledescription", "slide");
  img.setAttribute("src", url);
  img.setAttribute("width", "100%");
  img.setAttribute("id", `imageNumber${imageNames[id]}`)
  slideContainer.appendChild(img);
});

// Fading slideshow
var curIndex = 0;
var nextIndex = 1;
const imgDuration = 3000;
function slideShow() {
  // Determine if it is the last slide, and set next slide accordingly
  lastSlide = (curIndex + 1 == images.length);
  if (lastSlide) {
    nextIndex = 0;
  };

  // Fade out current image and promote next image
  const currentImage = document.getElementById(`imageNumber${imageNames[curIndex]}`);
  const nextImage = document.getElementById(`imageNumber${imageNames[nextIndex]}`);
  currentImage.className = "fadeOut";
  nextImage.className = "nextImage";
  setTimeout(function() {
    currentImage.className = "";
    nextImage.className = "currentImage"
  }, 1000);

  // Increment counters
  curIndex++;
  nextIndex++;
  if (lastSlide) {
    // Wrap around on last slide
    curIndex = 0;
    nextIndex = 1;
  };

  // Wait until next image shall be faded in
  setTimeout(slideShow, imgDuration);
}

// Start slideshow
setTimeout(slideShow, imgDuration);