// para fazer sumir o pesquisar

var divinicial = document.querySelector("#escolher");
var div_buscar_comida = document.querySelector("#nome_comida");
var div_buscar_bebida = document.querySelector("#nome_bebida");
div_buscar_comida.style.display = "none";
div_buscar_bebida.style.display = "none";
divinicial.style.display = "block";
var diverror = document.querySelector("#error");


function buscar_Comidas(){ //mudar nome da function
  divinicial.style.display = "none";
  div_buscar_comida.style.display = "block";
}

function buscar_Bebidas() {
    divinicial.style.display = "none";
    div_buscar_bebida.style.display = "block";
}

//////////////// FOODS


document.getElementById('formulario').addEventListener('submit', pesquisarComida);
function pesquisarComida(e) {
    var ComidaPesquisa = document.getElementById('pesquisar').value;
    buscarComidas(ComidaPesquisa);
    e.preventDefault();
}

//funçao q pesquisa as comidas com o ingrediente procurado
async function buscarComidas(ComidaPesquisa) {
    
    let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ComidaPesquisa;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.meals);

    
    
    var Comidas = json.meals;
    
    var mostrarComidas = '';

    if (json.meals == undefined){
        document.getElementById('error').innerHTML = "Receitas não encontradas! (tente novamente)";
    };

    



    for (var i = 0; i < Comidas.length; i++) {
            mostrarComidas += `
        <div class="col-sm-6 col-md-4">  
            <div class="thumbnail">
            <img class="imagemgerada"src="${Comidas[i].strMealThumb}" class="img-thumbnail"
            <h3> ${Comidas[i].strMeal}</h3>
            <p><a href="#"  id="botaoescolha2" class="botaoEscolher" role="button" onclick="ComidaDetalhes(${Comidas[i].idMeal})">Ver Detalhes</a></p>
            </div>
        </div>
        `;
    }
    diverror.style.display = "none";
    document.getElementById('Comidas').innerHTML = mostrarComidas;
}
/// 
function ComidaDetalhes(idMeal) {
    sessionStorage.setItem('ComidaID', idMeal);
    window.location = 'detalhes.html';
    return false;
}

//funçao que pesquisa o item selecionado e abre nova página 
async function mostraComida() {
    var ComidaID = sessionStorage.getItem('ComidaID');
    let url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + ComidaID;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    var Comida = json.meals;
    

    var mostraComida = `


            <div class="col-md-6">
                <h2> ${Comida[0].strMeal}</h2>
                <img src="${Comida[0].strMealThumb}" class="img-responsive">
                <h3 class="mostranacionalidade"> Nacionalidade: ${Comida[0].strArea}</h3>
                <h3 class="mostracategoria"> Categoria: ${Comida[0].strCategory}</h3>
                <h3 class="mostrainstructions"> Instruções de preparo: <p>
                    ${Comida[0].strInstructions}
                </p></h3>

            </div>

           

    `
    document.getElementById('Comidas').innerHTML = mostraComida;
    }



//
//////// DRINKS


document.getElementById('formulario2').addEventListener('submit', pesquisarBebida);

function pesquisarBebida(e) {
    var BebidaPesquisa = document.getElementById('pesquisar2').value;
    buscarBebidas(BebidaPesquisa);
    e.preventDefault();

}

async function buscarBebidas(BebidaPesquisa) {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + BebidaPesquisa;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.drinks);
    var Bebidas = json.drinks;

    

    var mostrarBebidas = '';

    

    for (var i = 0; i < Bebidas.length; i++) {
            mostrarBebidas += `
        <div class="col-sm-6 col-md-4">  
            <div class="thumbnail">
            <h3> ${Bebidas[i].strDrink}</h3>
            <img class="imagemgerada" src="${Bebidas[i].strDrinkThumb}" class="img-thumbnail"
            <p><a href="#" id="botaoescolha" class="botaoEscolher" role="button" onclick="BebidaDetalhes(${Bebidas[i].idDrink})">Ver Detalhes</a></p>
            </div>
        </div>
        `;
        
    }
    diverror.style.display = "none";

    document.getElementById('Bebidas').innerHTML = mostrarBebidas;
}

function BebidaDetalhes(idDrink) {
    sessionStorage.setItem('BebidaID', idDrink);
    window.location = 'detalhes2.html';
    return false;
}

async function mostraBebida() {
    var BebidaID = sessionStorage.getItem('BebidaID');
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + BebidaID;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    var Bebida = json.drinks;



    


    var mostraBebida = `


            <div class="col-md-6">
                <h2 class="nomeoutrapg">${Bebida[0].strDrink}</h2>
                <img src="${Bebida[0].strDrinkThumb}" class="img-responsive">
                <h3 class="mostracategoria">categoria: ${Bebida[0].strCategory}</h3>
                <h3 class="mostrainstructions">
                    instruções <p class="pinstrucoes">
                        ${Bebida[0].strInstructions}
                    </p>
                </h3>
            </div>

            
    `
    document.getElementById('Bebidas').innerHTML = mostraBebida;
    
    }


