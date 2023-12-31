const recipeName = document.querySelector(".recipe-name h2")
const stepContainer = document.querySelector(".step-container")
const stepBox = document.querySelector(".step-box")
const stepDetails = document.querySelector(".details-box")
const ingredientsContainer = document.querySelector(".list-container ul")
const next = document.getElementById("nextStep")
const prev = document.getElementById("prevStep")
var currStep, currRecipe;

onload = ()=>{
    currIndex = localStorage.getItem("currRecipe") ? localStorage.getItem("currRecipe"):0;
    allRecipes = localStorage.getItem("allRecipes") ? JSON.parse(localStorage.getItem("allRecipes")):defaultRecipe;
    currRecipe = allRecipes[currIndex]
    loadRecipe(currRecipe)
    currStep = 1
}

function loadRecipe(currRecipe){
    // fill all values in their responding elements
    recipeName.innerHTML = currRecipe.name
    stepBox.innerHTML = "step 1"
    stepDetails.innerHTML = currRecipe.steps[0]
    if(currRecipe.steps.length==1){
        next.style.visibility="hidden";
    }
    ingredientsContainer.innerHTML = loadIngredients(currRecipe.ingredients)
    // set the background to the recipe image
    document.body.style.backgroundImage = `linear-gradient(to top, rgb(0, 0, 0) 5% , rgba(255, 255, 255, 0)), url(${currRecipe.image})`
}

function loadIngredients(ingredients){
    // fill ingredients into list items
    let s = "";
    for(let ing of ingredients){
        s += `<li class="list-item">${ing}</li>`
    }
    return s;
}


// navigating through steps
function incrementStep(){
    currStep++;
    // change step number and details accordingly
    stepBox.innerHTML = `step ${currStep}`
    stepDetails.innerHTML = currRecipe.steps[currStep-1]

    // hide or show buttons if needed
    if(currStep==currRecipe.steps.length){
        // no more next steps if we are standing on the last one
        next.style.visibility = "hidden"
    }
    prev.style.visibility = "visible"
}
function decrementStep(){
    currStep--;
    // change step number and details accordingly
    stepBox.innerHTML = `step ${currStep}`
    stepDetails.innerHTML = currRecipe.steps[currStep-1]

    // hide or show buttons if needed
    if(currStep==1){
        // no more previous steps if we are standing on the first one
        prev.style.visibility = "hidden"
    }
    next.style.visibility = "visible"
}

function deleteRecipe(){
    if(confirm("Do you want to delete this recipe?")){
        currRecipe = localStorage.getItem("currRecipe") ? localStorage.getItem("currRecipe"):0;
        allRecipes = JSON.parse(localStorage.getItem("allRecipes"));
        allRecipes.splice(currRecipe, 1)
        localStorage.setItem("allRecipes", JSON.stringify(allRecipes))
        location.href = "../index.html"
    }
}


// copy ingredients
function copy() {
    // select the text needed
    const ingredients = ingredientsContainer.getElementsByTagName("li")
    s = "";
    for(let ingredient of ingredients){
        s += "- " + ingredient.innerHTML + "\n";
    }
  
     // copy the text to clipboard
    navigator.clipboard.writeText(s);
    alert("Recipe Ingredients Copied")
}


function share_as_image(){
    // create the whole document I want, add all steps, recipe details btw {}
    let result_html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../styling/common_styling.css">
      <link rel="stylesheet" href="../styling/recipe_styling.css">
      <style>
        .details-box{
            height: fit-content;
        }
        ol{
            margin-left: 30px;
            width:fit-content;
            text-align:left;
        }
        .big-container{
            margin-right:0;
            margin-bottom: 30px;
        }
        #empty{
            height:50px;
        }
        #bg{
            background-image: linear-gradient(to top, rgb(0, 0, 0) 5% , rgba(255, 255, 255, 0)), url(${currRecipe.image});
            width:100%;
            background-attachment: fixed;
            background-size:cover;
            background-position:center;
            text-align: center;
            margin: 0;
        }
        .recipe-name svg{
            transform: translate(0, -4px);
        }
      </style>
      <title>Recipe</title>
    </head>
    <body>
      <div id="bg">
      <!-- header of the page -->
      <div class="recipe-name">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 122.7 131.2" style="enable-background:new 0 0 122.7 131.2;" xml:space="preserve">
     <path d="M46.1,1.5c-5.3,2.1-9.6,6.3-10.8,10.6c-1,3.3-1.8,4.3-3.6,4.3c-1.2,0-4.5,1.4-7.2,3.1c-5.8,3.6-10.5,12.1-10.5,18.8
     c0,7.8,6,14.6,13.1,15c5,0.2,4.5-2.5-0.8-4.3c-5.6-1.9-8-5-8-10.3c0-7.8,5.8-16,12.7-18c3.2-0.9,3.5-0.8,4.9,2.6
     c2,4.8,6.9,8.6,8.9,6.9c1.3-1.1,1.1-1.6-1.2-3.4C34,18.6,38.8,6.7,52.7,4.1c4.9-0.9,11.9,1,15.7,4.2l3,2.6l-2.5,4.4
     c-2.7,4.7-2.8,9.2-0.2,9.2c0.9,0,1.8-1.5,2.3-3.5C73.5,8.1,93.8,6,102,17.7c1.7,2.3,2.6,5.4,2.9,9.7c0.4,5.5,0.1,6.9-2.4,10.6
     c-3.3,4.9-8.2,7.4-14.6,7.4h-4.4l2.1-2.8c2.7-3.3,4.8-9.7,4-11.7c-1.2-3.1-3.5-1.6-4.3,2.7c-0.9,5.8-6.2,11.8-10.5,11.8
     c-2.8,0-3.1-0.3-2.4-2.5c2.1-6.7-0.6-8.2-3.9-1.9c-1.8,3.6-2.7,4.4-5.4,4.4c-2.1,0-3.8-0.9-4.9-2.7c-1.7-2.6-2.3-10.2-1-12.3
     c0.3-0.6-0.1-1.4-1.1-1.8c-1.1-0.3-2.3,0-2.8,0.9c-1.3,2-1.2,9.9,0.1,13.2c0.9,2.4,0.8,2.8-1.1,2.8c-1.4,0-2.9-1.5-4.3-4.3
     c-1.2-2.4-2.7-4.3-3.2-4.3c-1.9,0-2.3,2.3-0.8,5.3c1.4,2.9,1.4,3.2-0.3,3.6c-2.5,0.6-9.4-6.3-10.6-10.6C32.9,33.4,31.8,32,31,32
     c-2.9,0-2.1,4.5,1.7,10.2l3.9,5.7l-2.3,2.4c-5.2,5.5-4.6,14.4,1.1,19.2c2.8,2.3,3.2,3.4,3.2,8c0,2.9,0.5,5.7,1.2,6.1
     c0.6,0.3,2.5-0.5,4.1-2.1l2.9-2.8l2.8,2.8c3.5,3.6,5.2,2.6,5.2-3.3v-4.8l18-0.2c15.1-0.3,17.9-0.5,17.9-1.9s-2.8-1.6-17.9-1.9
     l-18-0.2v-3.8v-3.8l18-0.2c15.1-0.3,17.9-0.5,17.9-1.9c0-1.4-3.5-1.6-25.8-1.6H39.1l-0.5,4.7c-0.4,3.8-0.8,4.4-1.7,3.2
     c-2.3-2.8-2.8-6.4-1.4-9.7c2.4-5.9,4.7-6.3,32.3-6.3c22,0,25.5-0.3,29.3-2C114,39.9,113.3,15.8,96,7.7c-5.3-2.5-13.5-2.6-17.7-0.4
     c-3,1.5-3.2,1.5-5.9-1.2C70.9,4.6,68,2.7,66,1.8C61.8,0.1,50.2-0.1,46.1,1.5z M50.7,66c1.1,9.9,0.5,12-2.3,9.2
     c-1.1-1.1-1.8-1.1-3.4,0c-2,1.3-2.1,1-2.1-6.2v-7.5h3.6C50.1,61.5,50.3,61.7,50.7,66z"/>
    </svg>
          <h2>${currRecipe.name}</h2>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 122.7 131.2" style="enable-background:new 0 0 122.7 131.2;" xml:space="preserve">
       <path d="M46.1,1.5c-5.3,2.1-9.6,6.3-10.8,10.6c-1,3.3-1.8,4.3-3.6,4.3c-1.2,0-4.5,1.4-7.2,3.1c-5.8,3.6-10.5,12.1-10.5,18.8
       c0,7.8,6,14.6,13.1,15c5,0.2,4.5-2.5-0.8-4.3c-5.6-1.9-8-5-8-10.3c0-7.8,5.8-16,12.7-18c3.2-0.9,3.5-0.8,4.9,2.6
       c2,4.8,6.9,8.6,8.9,6.9c1.3-1.1,1.1-1.6-1.2-3.4C34,18.6,38.8,6.7,52.7,4.1c4.9-0.9,11.9,1,15.7,4.2l3,2.6l-2.5,4.4
       c-2.7,4.7-2.8,9.2-0.2,9.2c0.9,0,1.8-1.5,2.3-3.5C73.5,8.1,93.8,6,102,17.7c1.7,2.3,2.6,5.4,2.9,9.7c0.4,5.5,0.1,6.9-2.4,10.6
       c-3.3,4.9-8.2,7.4-14.6,7.4h-4.4l2.1-2.8c2.7-3.3,4.8-9.7,4-11.7c-1.2-3.1-3.5-1.6-4.3,2.7c-0.9,5.8-6.2,11.8-10.5,11.8
       c-2.8,0-3.1-0.3-2.4-2.5c2.1-6.7-0.6-8.2-3.9-1.9c-1.8,3.6-2.7,4.4-5.4,4.4c-2.1,0-3.8-0.9-4.9-2.7c-1.7-2.6-2.3-10.2-1-12.3
       c0.3-0.6-0.1-1.4-1.1-1.8c-1.1-0.3-2.3,0-2.8,0.9c-1.3,2-1.2,9.9,0.1,13.2c0.9,2.4,0.8,2.8-1.1,2.8c-1.4,0-2.9-1.5-4.3-4.3
       c-1.2-2.4-2.7-4.3-3.2-4.3c-1.9,0-2.3,2.3-0.8,5.3c1.4,2.9,1.4,3.2-0.3,3.6c-2.5,0.6-9.4-6.3-10.6-10.6C32.9,33.4,31.8,32,31,32
       c-2.9,0-2.1,4.5,1.7,10.2l3.9,5.7l-2.3,2.4c-5.2,5.5-4.6,14.4,1.1,19.2c2.8,2.3,3.2,3.4,3.2,8c0,2.9,0.5,5.7,1.2,6.1
       c0.6,0.3,2.5-0.5,4.1-2.1l2.9-2.8l2.8,2.8c3.5,3.6,5.2,2.6,5.2-3.3v-4.8l18-0.2c15.1-0.3,17.9-0.5,17.9-1.9s-2.8-1.6-17.9-1.9
       l-18-0.2v-3.8v-3.8l18-0.2c15.1-0.3,17.9-0.5,17.9-1.9c0-1.4-3.5-1.6-25.8-1.6H39.1l-0.5,4.7c-0.4,3.8-0.8,4.4-1.7,3.2
       c-2.3-2.8-2.8-6.4-1.4-9.7c2.4-5.9,4.7-6.3,32.3-6.3c22,0,25.5-0.3,29.3-2C114,39.9,113.3,15.8,96,7.7c-5.3-2.5-13.5-2.6-17.7-0.4
       c-3,1.5-3.2,1.5-5.9-1.2C70.9,4.6,68,2.7,66,1.8C61.8,0.1,50.2-0.1,46.1,1.5z M50.7,66c1.1,9.9,0.5,12-2.3,9.2
       c-1.1-1.1-1.8-1.1-3.4,0c-2,1.3-2.1,1-2.1-6.2v-7.5h3.6C50.1,61.5,50.3,61.7,50.7,66z"/>
      </svg>
      </div>
    
      <!--step number m3 step details-->
      <div class="step-container">
          <div class="step-box">Steps</div>
          <div class="details-box">${createSteps()}</div>
      </div>
    
    
      <div class="top"> <!-- contains ingredients title -->
        <div class="ingredients-box">Ingredients</div>
      </div>
      <div class="big-container"> <!-- contains ingredients-list w edit delete share copy buttons-->
        <div class="ingredients-container"> <!--contains list w copy share buttons-->
          <div class="list-container">
            ${createIngredients()}
          </div>
        </div>
      </div>
    <div id="empty"></div>
    </div>
      <script src="../scripts/recipe_script.js"></script>
    </body>
    </html>
    `
    // create new element with id
    let htmlContent = document.createElement("div");
    htmlContent.id = "htmlContent"

    // set HTML content to it
    htmlContent.innerHTML = result_html;
    document.body.append(htmlContent)

    // create result needed element, download it, then delete
    html2canvas(document.getElementById('htmlContent')).then(function(canvas) {
        // create link to download with needed attributes
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = 'html_to_image.png';
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';

        // click the link, download the image
        link.click();

        // delete element
        document.body.removeChild(link);
        document.body.removeChild(htmlContent)
    });
}

// used to put all steps together in a list
function createSteps(){
    result = "<ol>"
    for(const step of currRecipe.steps){
        result += `<li>${step}</li>`
    }
    result += "</ol>"
    return result
}
function createIngredients(){
    result = "<ul>"
    for(const ingrd of currRecipe.ingredients){
        result += `<li>${ingrd}</li>`
    }
    result += "</ul>"
    return result
}
