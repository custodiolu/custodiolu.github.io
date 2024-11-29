var mudar = document.getElementById("botão")

function modonoturno() {
    if(document.body.style.backgroundColor=="white" && document.body.style.color=="black") {
        document.body.style.backgroundColor="black"
        document.body.style.color="white"
        mudar.innerText = "Modo Padrão"
    }
    else {
        document.body.style.backgroundColor="white"
        document.body.style.color="black"
        mudar.innerText = "Modo Noturno"
    }
}
