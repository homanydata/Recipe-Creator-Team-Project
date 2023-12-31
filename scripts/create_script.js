const stepsContainer = document.getElementById("steps")
const ingredientsContainer = document.getElementById("ingredients")

// selectin form elements
const recipeName = document.getElementById("recipeName")
const recipeCategory = document.getElementById("recipeCategory")
const recipeImage = document.getElementById("recipeImage")

const create = document.getElementById("createButton")

document.getElementById("addStep").addEventListener("click", addStep)
document.getElementById("addIngredient").addEventListener("click", addIngredient)


onload = ()=>{
    // if index is -1, we need to create a new recipe, otherwise, we are editing an existing one
    if(localStorage.getItem("currRecipe")==-1){return;}

    create.innerHTML = "update"
    recipeImage.removeAttribute("required")

    allRecipes = localStorage.getItem("allRecipes") ? JSON.parse(localStorage.getItem("allRecipes")):[];
    // if array empty stop process, shouldnt happen but anyway to avoid errors
    if(allRecipes.length==0) {return;}

    // get current recipe data to load it into inputs
    currIndex = localStorage.getItem("currRecipe")
    currRecipe = allRecipes[currIndex]

    loadRecipeDetails(currRecipe)
}

function loadRecipeDetails(recipe){
    recipeName.value = recipe.name
    recipeCategory.value = recipe.category
    // recipeImage.value = recipe.image
    loadIngredients(currRecipe.ingredients)
    loadRecipeSteps(currRecipe.steps)
}
function loadIngredients(ingredients){
    ingredientsContainer.innerHTML = "<label>ingredients</label>"
    for(let ingrd of ingredients){
        let quantity = ingrd.split(' ')[0]
        let item = ingrd.split(' ').slice(1)
        ingredientsContainer.innerHTML += `<div class="ingrd">
        <input required type="text" placeholder="item" value="${item}">
        <input required type="text" placeholder="quantity" value="${quantity}">
      </div>`
    }
    ingredientsContainer.innerHTML += '<svg onclick="deleteLastIngredient()" id="deleteIngredient" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>'
}
function loadRecipeSteps(steps){
    stepsContainer.innerHTML = "<label>steps</label>"
    for(let step of steps){
        stepsContainer.innerHTML += `<input required type="text" placeholder="step details" value="${step}">`
    }
    stepsContainer.innerHTML += '<svg onclick="deleteLastStep()" id="deleteStep" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>'
}

// adding steps and ingredients
function addIngredient(){
    ingredientsContainer.removeChild(ingredientsContainer.lastElementChild)
    ingredientsContainer.insertAdjacentHTML('beforeend', `<div class="ingrd">
    <input required type="text" placeholder="item">
    <input required type="text" placeholder="quantity">
    </div>`);
    ingredientsContainer.insertAdjacentHTML('beforeend', '<svg onclick="deleteLastIngredient()" id="deleteIngredient" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>')
}

function addStep(){
    stepsContainer.removeChild(stepsContainer.lastElementChild)
    stepsContainer.insertAdjacentHTML('beforeend', '<input required type="text" placeholder="step details">');
    stepsContainer.insertAdjacentHTML('beforeend', '<svg onclick="deleteLastStep()" id="deleteStep" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>')
}


// save data
async function createRecipe(){
    let steps = []
    const stepInputs = stepsContainer.getElementsByTagName("input")
    for(let step of stepInputs){
        steps.push(step.value)
    }
    let ingredients = []
    const ingredientsInputs = ingredientsContainer.getElementsByClassName("ingrd")
    for(let ingrd of ingredientsInputs){
        let inputs = ingrd.getElementsByTagName("input")
        ingredients.push(inputs[1].value.replace(/\s+/g, '') + " " + inputs[0].value)
    }

    let recipe = {
        "name":recipeName.value,
        "category":recipeCategory.value,
        "ingredients":ingredients,
        "steps":steps,
    }
    try {
        if(recipeImage.files.length>0){
            const imageUrl = await save_img(recipeImage.files[0]);
            recipe.image = imageUrl;
        }else{
            recipe.image = currRecipe.image;
        }

        addToStorage(recipe);

    } catch (error) {
        console.error("Error processing image:", error);
    }
}

function save_img(img_file) {
    return new Promise((resolve, reject) => {
        if (img_file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                // Resolve with the loaded data URL
                resolve(e.target.result);
            };

            reader.onerror = function (error) {
                // Reject with the error
                reject(error);
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(img_file);
        } else {
            // Resolve with null if there is no image file
            resolve(null);
        }
    });
}


// add recipe instance to recipes array in local storage
function addToStorage(recipe){
    allRecipes = localStorage.getItem("allRecipes") ? JSON.parse(localStorage.getItem("allRecipes")):[];
    currRecipe = localStorage.getItem("currRecipe");
    if(currRecipe==-1){
        allRecipes.push(recipe);
    }else{
        allRecipes.splice(currRecipe, 1, recipe)
    }
    navigator.clipboard.writeText(JSON.stringify(allRecipes));
    localStorage.setItem("allRecipes", JSON.stringify(allRecipes));
}

// change label styling when file input is filled
function handleFileInputChange() {
    // Get the file input and label elements
    var fileInput = document.getElementById('recipeImage');
    var label = document.querySelector('label[for="recipeImage"]');

    // Check if the file input has a selected file
    if (fileInput.files.length > 0) {
      // If a file is selected, add the 'filled' class to the label
      label.classList.add('filled');
    } else {
      // If no file is selected, remove the 'filled' class from the label
      label.classList.remove('filled');
    }
  }


function deleteLastStep(){
    stepsContainer.removeChild(stepsContainer.lastChild)
    stepsContainer.removeChild(stepsContainer.lastChild)
    stepsContainer.insertAdjacentHTML('beforeend', '<svg onclick="deleteLastStep()" id="deleteStep" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>')
}
function deleteLastIngredient(){
    ingredientsContainer.removeChild(ingredientsContainer.lastElementChild)
    ingredientsContainer.removeChild(ingredientsContainer.lastElementChild)
    ingredientsContainer.insertAdjacentHTML('beforeend', '<svg onclick="deleteLastIngredient()" id="deleteIngredient" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>')
}