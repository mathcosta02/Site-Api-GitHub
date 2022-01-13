onload = () =>{
    requisicao("https://api.github.com/users/mathcosta02", perfil);

    pesqForm.onsubmit = (evento) =>{
        document.querySelector("#pesqResultados").innerHTML = '<div class="row"></div>';
        requisicao(`https://api.github.com/search/users?q=${pesqText.value}`, pesquisa);
        evento.preventDefault();
    }
}

function requisicao(apiUrl, perf) {
    let user = new XMLHttpRequest();
    user.onload = perf;
    user.onerror = erro;
    user.open("GET", apiUrl);
    user.send();
}

function erro() {
    alert(`Erro na requisição:\nCódigo do erro: ${this.status} - ${this.statusText}`)
}

//Perfil do GitHub do usuário
function perfil() {
    var perfUsuario = JSON.parse(this.responseText);
    requisicao(perfUsuario.repos_url, repositorio);

    foto.innerHTML +=`
        <img src="${perfUsuario.avatar_url}" alt="Foto de ${perfUsuario.login}">`;

    usuario.insertAdjacentHTML("afterBegin",`
        <a class="nome">${perfUsuario.name}</a>
        <a class="login">${perfUsuario.login}</a>
        <p class="bio">${perfUsuario.bio}</p>
        <a style="background-color: grey; font-size: 1.0em; width: 25%;" href="${perfUsuario.html_url}" target="_blank" class="btn">Perfil no GitHub</a>`);
}

//Repositórios do perfil no GitHub
function repositorio(){
    var perfRep = JSON.parse(this.responseText);
    for(i=0; i<perfRep.length; i++){
        document.querySelector("#rep .row").innerHTML += `
            <div class="col-12">
                <div class="reposBox">
                    <a class="reposTitle">Repositório ${perfRep[i].name}</a>
                    <p>${perfRep[i].created_at.substring(8,10)+"/"+perfRep[i].created_at.substring(5,7)+"/"+perfRep[i].created_at.substring(0,4)}</p>
                    <a style="background-color: grey; font-size: 1.0em;" href="${perfRep[i].html_url}" target="_blank" class="btn">Ir para o GitHub</a>
                </div>
            </div>`;
    }
}

//Pesquisa de usuários no GitHub
function pesquisa(){
    var pesqUsuarios = JSON.parse(this.responseText).items;
    
    for(i=0; i<pesqUsuarios.length && i<pesqMaximo.value; i++){
        document.querySelector("#pesqResultados>.row").innerHTML += `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${pesqUsuarios[i].avatar_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><i class="fa fa-caret-right" aria-hidden="true"></i>\t${pesqUsuarios[i].login}</h5>
                    <a href="${pesqUsuarios[i].html_url}" target="_blank" class="btn">Pefil no GitHub</a>
                </div>
            </div>
        </div>`;
    }
}