const div$$ = document.getElementById("listaPokemon");
const botone$$ = document.querySelectorAll(".btn-poke");

let url = "https://pokeapi.co/api/v2/pokemon/";

for(let i= 1; i <= 151; i++){
    fetch(url + i)
    .then((response) => response.json())
    .then(data=> pintarPokemon(data))
}
function pintarPokemon(data){
    let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = data.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
<div class="card">
<p>#${data.id}</p>
<h1 class="card-title">${data.name}</h1>
<img class="card-image" src="${data.sprites.other["official-artwork"].front_default}">
<p>Altura:${data.height}M</p>
<p>Peso:${data.weight}Kg</p>
<p>Tipos:${tipos}</p>
</div>
    `;
    div$$.append(div);
}

botone$$.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    div$$.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(url + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    pintarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        pintarPokemon(data);
                    }
                }

            })
    }
}))