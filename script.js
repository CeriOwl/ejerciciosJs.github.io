const btn = document.getElementById("button");

btn.addEventListener("click", ()=>{
    let size = document.querySelectorAll(".imgPokemon");
    let sizeUlMoves = document.querySelectorAll(".ulMoves");
    let sizeUl = document.querySelectorAll(".ulTypes");
    let namePokemon = document.getElementById("pokemon");
    let nameLower = namePokemon.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${nameLower.toLowerCase()}`
    fetch(url).then((res) =>{
        return res.json();
    }).then((data) =>{
        console.log(data);
        if(size.length > 0){
            deleteImg(size);
        }
        if(sizeUl.length > 0){
            resetTypes(sizeUl);
        }
        if(sizeUlMoves.length > 0){
            resetMoves(sizeUlMoves);
        }
        createNameNumber(data);
        createImg(data);
        createTypes(data);
        setStats(data);
        setMoves(data)
    })
})

function resetMoves(eliminate){
    eliminate[0].remove();
}

function setMoves(data){
    let ul2 = document.createElement("ul");
    ul2.setAttribute("id", "ulMoves");
    ul2.classList.add("ulMoves");
    document.getElementById("moves").appendChild(ul2);
    let typesToIterate = data.moves;
    for(let i = 0; i < typesToIterate.length; i++){
        let element = document.createElement("li");
        element.innerHTML = `${typesToIterate[`${i}`].move.name}`;
        document.getElementById("ulMoves").appendChild(element);
    }
}

function setStats(data){
    document.getElementById("hp").innerHTML = `${data.stats["0"].base_stat}`;
    document.getElementById("attack").innerHTML = `${data.stats["1"].base_stat}`;
    document.getElementById("defense").innerHTML = `${data.stats["2"].base_stat}`;
    document.getElementById("sAttack").innerHTML = `${data.stats["3"].base_stat}`;
    document.getElementById("sDefense").innerHTML = `${data.stats["4"].base_stat}`;
    document.getElementById("speed").innerHTML = `${data.stats["5"].base_stat}`;
}

function resetTypes(eliminate){
    eliminate[0].remove();
}

function createTypes(data){
    let ul = document.createElement("ul");
    ul.setAttribute("id", "ulTypes");
    ul.classList.add("ulTypes");
    document.getElementById("tipos").appendChild(ul);
    let typesToIterate = data.types
    typesToIterate.forEach(type =>{
        let elemet = document.createElement("li");
        elemet.innerHTML = `${type.type.name}`;
        document.getElementById("ulTypes").appendChild(elemet);
    })
}

function deleteImg(img){
    img[0].remove();
}

function createImg(data){
    let img = document.getElementById("img");
    let imgCreated = new Image();
    imgCreated.classList.add("imgPokemon");
    imgCreated.src = `${data.sprites.other["official-artwork"].front_default}`;
    img.appendChild(imgCreated);
}

function createNameNumber(data){
    let name = data.forms[0].name;
    let number = data.id
    let numberSpan = document.getElementById("number");
    let nameSpan = document.getElementById("name");
    numberSpan.innerHTML = `#${number} -`
    nameSpan.innerHTML = `${name}`
}