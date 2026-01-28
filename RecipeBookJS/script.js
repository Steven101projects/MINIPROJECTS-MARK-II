const levelOpt = document.getElementById("level");
const typesOpt = document.getElementById("types");
const mealsOpt = document.getElementById("meals");

const selectionBoxes = document.querySelectorAll(".selectionBox");

levelOpt.addEventListener("click", () => {
   document.getElementById("levelOptions").style.display = "block";
   document.getElementById("typeOptions").style.display = "none";
   document.getElementById("mealOptions").style.display = "none";
});

typesOpt.addEventListener("click", () => {
   document.getElementById("typeOptions").style.display = "block";
   document.getElementById("levelOptions").style.display = "none";
   document.getElementById("mealOptions").style.display = "none";
});

mealsOpt.addEventListener("click", () => {
   document.getElementById("mealOptions").style.display = "block";
   document.getElementById("levelOptions").style.display = "none";
   document.getElementById("typeOptions").style.display = "none";
});

selectionBoxes.forEach(box => {
box.addEventListener("mouseleave", function(){
    console.log("round");
   document.getElementById("mealOptions").style.display = "none";
   document.getElementById("levelOptions").style.display = "none";
   document.getElementById("typeOptions").style.display = "none";
});

});

function openModal() {
  document.body.classList.add("no-scroll");
}

function closeModal() {
  document.body.classList.remove("no-scroll");
}

function darkenHexColor(hex, percent) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.max(0, Math.floor(r * (1 - percent)));
  g = Math.max(0, Math.floor(g * (1 - percent)));
  b = Math.max(0, Math.floor(b * (1 - percent)));

  return `rgb(${r}, ${g}, ${b})`;
}

var loadedRecipes = [];

fetch("recipeBook.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load file");
    }
    return response.json();
  })
  .then(data => {
    
    for(const d of data.recipes){
      loadedRecipes.push(d);
    }

    console.log(loadedRecipes);
    ViewRecipes();
  })
  .catch(error => {
    console.error(error);
  });

let goBackBut = document.querySelector(".goBackButton");

let modalPage = document.querySelector("#modal");

goBackBut.querySelector("p").addEventListener("click", () => {
   modalPage.style.display = "none";
})


function ViewRecipes(){
   for(const r of loadedRecipes){
      var foodTray = document.createElement("div");
      foodTray.classList.add("food");
      var title = document.createElement("span");
      title.textContent = r.title;
      foodTray.appendChild(title);
      foodTray.style.backgroundColor = r.themeHexColor;
      foodTray.style.borderBlockColor = darkenHexColor(r.themeHexColor, 0.2);

      document.querySelector(".foodGrid").append(foodTray);

      foodTray.addEventListener("click", () => {

         modalPage.style.display = "flex";

         document.querySelector(".titleContent").textContent = r.title;
         document.querySelector(".subtitleContent").textContent = r.subtitle;
         document.querySelector(".mealContent").textContent = r.meal;
         document.querySelector(".levelContent").textContent = r.level;
         document.querySelector(".typeContent").textContent = r.type;
         document.querySelector(".ingredientsContent").textContent = r.ingredients;
         let steps = r.steps;
         document.querySelector(".stepsContent").textContent = "";
         steps.forEach(step => {
            let li = document.createElement("li");
            li.textContent = step;
            document.querySelector(".stepsContent").append(li);
         })
         document.querySelector(".disclaimerContent").textContent = r.disclaimer;
      })

   }
}