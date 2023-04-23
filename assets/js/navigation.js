let card = document.getElementsByClassName('card')[0];
let img = card.querySelector('.card .top .img');
let coords = card.getElementsByClassName('coordinates')[0];
let h5_name = card.querySelector('h5 span.name');

let index_tree = -1;

let dark = document.getElementsByClassName('dark')[0];
let photo = dark.getElementsByTagName('img')[0];

function open_card(index) {

    index_tree = index;
    img.setAttribute("style", "background-image: url('"+serverURL_pics+"/"+data[index]['photo']+"'), url('../assets/images/testicon.png')");
    h5_name.innerHTML = data[index]['name'];
    coords.innerHTML = data[index]['latitude'] + ", " + data[index]['longitude'];
    card.querySelector('[class=number]').innerHTML = data[index]['id'];
    card.querySelector('[clas=size]').innerHTML = data[index]['height'];
    card.querySelectorAll('[clas=d]')[0].innerHTML = data[index]['cdiameter'];
    card.querySelectorAll('[clas=d]')[1].innerHTML = data[index]['tdiameter'];
    card.querySelector('[class="content stick"]').innerHTML = data[index]['dry']?'да':'нет';
    card.querySelector('[class="content cora"]').innerHTML = data[index]['detachment']?'да':'нет';
    card.querySelector('[class="content crack"]').innerHTML = data[index]['cracks']?'да':'нет';
    card.querySelector('[class="content juice"]').innerHTML = data[index]['drips']?'да':'нет';
    card.querySelector('[class="content incline"]').innerHTML = data[index]['tilt'];
    card.querySelector('[class="content sidewalk"]').innerHTML = data[index]['overhanging_t']?'да':'нет';
    card.querySelector('[class="content cabels"]').innerHTML = data[index]['overhanging_p']?'да':'нет'
    card.querySelector('[class="content cabels_comments"]').innerHTML = data[index]['overhanging_comment'] ?? '';
    card.querySelector('[class="content road"]').innerHTML = data[index]['overhanging_d']?'да':'нет';
    card.querySelector('#locationName').innerHTML = data[index]['name_location'];
    card.querySelector('[class="content species"]').innerHTML = data[index]['name_species'];

    card.style.display = "block";
}

function close_card() {
    card.style.display = "none";
}


function open_photo() {
    photo.setAttribute('src',serverURL_pics+'/'+data[index_tree]['photo']);
    dark.style.display = "flex";
}


function close_photo() {
    dark.style.display = "none";
}
