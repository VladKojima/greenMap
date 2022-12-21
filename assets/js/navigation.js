let dark = document.getElementsByClassName('dark')[0];
let card = dark.getElementsByClassName('card')[0];
let img = card.getElementsByTagName('img')[0];
let coords = card.getElementsByClassName('coordinates')[0];
let h5 = card.getElementsByTagName('h5')[0];

let def = img.getAttribute('src');

function setDefImg(elem)
{elem.setAttribute('src', "../assets/images/testicon.png")}

img.onerror=()=>setDefImg(img)

function open_card(index) {

    img.setAttribute('src', "../assets/images/"+datas[index]['photo']);
    h5.innerHTML = datas[index]['name'];
    coords.innerHTML = datas[index]['coordinates'][0] + ", " + datas[index]['coordinates'][1];

    dark.style.display = "flex";
}

function close_card() {
    dark.style.display = "none";
}
