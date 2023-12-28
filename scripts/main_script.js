const recipesContainer = document.getElementsByClassName("recipesContainer")[0]

// for testing
// reset data
    // localStorage.removeItem("allRecipes")


// duplicate recipes
    // allRecipes = JSON.parse(localStorage.getItem("allRecipes"));
    // s = allRecipes.length
    // for(let i=0; i<s;i++){
    //     allRecipes.push(allRecipes[i])
    // }
    // localStorage.setItem("allRecipes", JSON.stringify(allRecipes))


onload = ()=>{
    localStorage.setItem("currRecipe", -1);
    scroll({
        behavior:"auto",
        top:0,
        left:0
    })
    loadRecipes(readRecipes())
}


function loadRecipes(recipes){
    let s = ""
    for(let i=0; i<recipes.length; i++){
        s += createRecipeCard(recipes[i], i)
    }
    recipesContainer.innerHTML = s;
}

function readRecipes(){
    let defaultRecipe = [] // {
    //     "name":"any recipe",
    //     "ingredients":["1/2kg taste", "100ml fun"],
    //     "steps":["step 1", "step 2","step 3"],
    //      "image":"../images/yummy.jpg"
    // }
    result = localStorage.getItem("allRecipes") ? JSON.parse(localStorage.getItem("allRecipes")):defaultRecipe;
    return result
}

function createRecipeCard(data,i){
    let result = `
    <div class="recipe" onclick="openRecipe(${i})">
    <img src="${data.image}">
    <h3>${data.name}</h3>
    <p>${data.category}</p>
  </div>
    `;
    return result;
}

function openRecipe(index){
    localStorage.setItem("currRecipe",index);
    location.href = "pages/recipe.html"
}

// filter/search recipes in home
function filterRecipes(keyword){
    allRecipes = localStorage.getItem("allRecipes") ? JSON.parse(localStorage.getItem("allRecipes")):[];
    let filteredRecipes = []
    for(let i=0; i<allRecipes.length; i++){
        if(String(allRecipes[i].name).toLowerCase().includes(keyword)){
            filteredRecipes.push(allRecipes[i])
        }
    }
    loadRecipes(filteredRecipes)
}
