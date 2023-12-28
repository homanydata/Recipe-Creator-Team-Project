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
    currRecipe = localStorage.getItem("currRecipe") ? localStorage.getItem("currRecipe"):0;
    allRecipes = JSON.parse(localStorage.getItem("allRecipes"));
    allRecipes.splice(currRecipe, 1)
    localStorage.setItem("allRecipes", JSON.stringify(allRecipes))
    location.href = "../home.html"
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
            padding: 10px 0;
            background-attachment: fixed;
            background-size:cover;
            background-position:center;
            text-align: center;
            margin: 0;
        }
      </style>
      <title>Recipe</title>
    </head>
    <body>
      <div id="bg">
      <!-- header of the page -->
      <div class="recipe-name">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M176 56c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24zm24 48h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zM56 176H72c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24s10.7-24 24-24zM0 283.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4zM224 200c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H248c-13.3 0-24-10.7-24-24zm-96 0c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H104c-13.3 0-24-10.7-24-24s10.7-24 24-24zm216 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H344c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24zm120 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H440c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H392c-13.3 0-24-10.7-24-24s10.7-24 24-24zM296 32h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
          <h2>${currRecipe.name}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M176 56c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24zm24 48h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zM56 176H72c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24s10.7-24 24-24zM0 283.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4zM224 200c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H248c-13.3 0-24-10.7-24-24zm-96 0c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H104c-13.3 0-24-10.7-24-24s10.7-24 24-24zm216 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H344c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24zm120 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H440c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H392c-13.3 0-24-10.7-24-24s10.7-24 24-24zM296 32h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
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
