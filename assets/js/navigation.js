let card = document.getElementsByClassName('card')[0];
let img = card.querySelector('.card .top .img');
let coords = card.getElementsByClassName('coordinates')[0];
let h5_name = card.querySelector('h5 span.name');

img.onerror=()=>setDefImg(img)

let index_tree = -1;

let dark = document.getElementsByClassName('dark')[0];
let photo = dark.getElementsByTagName('img')[0];

function open_card(index) {

    index_tree = index;
    img.setAttribute("style", "background-image: url(../assets/images/"+datas[index]['photo']+")");
    h5_name.innerHTML = datas[index]['name'];
    coords.innerHTML = datas[index]['coordinates'][0] + ", " + datas[index]['coordinates'][1];

    card.style.display = "block";
}

function close_card() {
    card.style.display = "none";
}


function open_photo() {
    photo.setAttribute('src', '../assets/images/'+datas[index_tree]['photo']);
    dark.style.display = "flex";
}


function close_photo() {
    dark.style.display = "none";
}
