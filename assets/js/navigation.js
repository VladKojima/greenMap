let card = document.getElementsByClassName('card')[0];
let img = card.querySelector('.card .top .img');
let coords = card.getElementsByClassName('coordinates')[0];
let h5_name = card.querySelector('h5 span.name');

let index_tree = -1;

let dark = document.getElementsByClassName('dark')[0];
let photo = dark.getElementsByTagName('img')[0];

function open_card(index) {

    index_tree = index;
    img.setAttribute("style", "background-image: url('../assets/images/"+datas[index]['photo']+"'), url('../assets/images/testicon.png')");
    h5_name.innerHTML = datas[index]['name'];
    coords.innerHTML = datas[index]['coordinates'][0] + ", " + datas[index]['coordinates'][1];
    card.querySelector('[class=number]').innerHTML = datas[index]['id'];
    card.querySelector('[clas=size]').innerHTML = datas[index]['height'];
    card.querySelectorAll('[clas=d]')[0].innerHTML = datas[index]['cdiameter'];
    card.querySelectorAll('[clas=d]')[1].innerHTML = datas[index]['tdiameter'];
    card.querySelector('[class="content stick"]').innerHTML = datas[index]['dry']?'да':'нет';
    card.querySelector('[class="content cora"]').innerHTML = datas[index]['detachment']?'да':'нет';
    card.querySelector('[class="content crack"]').innerHTML = datas[index]['cracks']?'да':'нет';
    card.querySelector('[class="content juice"]').innerHTML = datas[index]['drips']?'да':'нет';
    card.querySelector('[class="content incline"]').innerHTML = datas[index]['tilt']?'да':'нет';
    card.querySelector('[class="content sidewalk"]').innerHTML = datas[index]['overhanging_t']?'да':'нет';
    card.querySelector('[class="content cabels"]').innerHTML = datas[index]['overhanging_p']?'да':'нет'
    card.querySelector('[class="content cabels_comments"]').innerHTML = datas[index]['overhanging_comment'];
    card.querySelector('[class="content road"]').innerHTML = datas[index]['overhanging_d']?'да':'нет'
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
