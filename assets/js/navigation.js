let dark = document.getElementsByClassName('dark')[0];
let card = dark.getElementsByClassName('card')[0];
let img = card.getElementsByTagName('img')[0];
let coords = card.getElementsByClassName('coordinates')[0];
let h5 = card.getElementsByTagName('h5')[0];


function open_card(index) {

    img.setAttribute('src', "../assets/images/"+data[index]['photo']);
    h5.innerHTML = data[index]['name'];
    coords.innerHTML = data[index]['coordinates'][0] + ", " + data[index]['coordinates'][1];

    dark.style.display = "flex";
}

function close_card() {
    dark.style.display = "none";
}
