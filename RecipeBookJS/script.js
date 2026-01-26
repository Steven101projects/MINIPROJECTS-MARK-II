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