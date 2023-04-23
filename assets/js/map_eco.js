var myMap;
let clusterer;

var serverURL = 'https://inpit.sstu.ru/greenmapServer/api';
var url_gettrees = '/trees/getTrees';
var url_moveTree = '/trees/moveTree';
var serverURL_pics = 'https://inpit.sstu.ru/greenmapServer';

async function getTrees(location_id) {
    // это get-Запрос, поэтому id тоже пойдет с url
    return (await axios.get(serverURL + url_gettrees + '/' + location_id)).data;
}

async function moveTree(tree_id, lat, long) {
    var jsonbody = {};
    // тут координаты - не массив
    jsonbody['latitude'] = lat;
    jsonbody['longitude'] = long;
    jsonbody['tree_id'] = tree_id;

    await axios.post(serverURL + url_moveTree, JSON.stringify(jsonbody)).then(response => {
      console.log(response.data);
}).catch((error) => {
    console.log(error)
});
}

function setDefImg(elem)
{elem.setAttribute('src', "../assets/images/testicon.png")}

const m = new Map();
m.set(1, [51.529752, 45.977860]);
m.set(2, [51.529491, 45.982059]);
m.set(3, [51.529483, 45.982046]);
m.set(4, [51.540273,46.039105]);

const types = new Set();

const loadedLocations = new Set(); // сделать оптимизацию для ускорения загрузки

let balloon = document.getElementsByClassName('balloon')[0];

ymaps.ready(init);

async function init(){

  await loadData();

  data.forEach((item) => {
    types.add(item['name']);
  });

  let it = 0;

  for(let item of types)
  {
    let elem = typePrototype.cloneNode();
    let label = typePrototype.labels[0].cloneNode();
    elem.id = 'types'+it++;
    elem.checked = true;
    label.textContent = item;
    label.setAttribute('for',elem.id);
    typePrototype.parentElement.append(elem);
    typePrototype.parentElement.append(label);
    typePrototype.parentElement.append(document.createElement('br'));
  };
  typePrototype.labels[0].remove();
  typePrototype.remove();

  for(let item of await getLocations())
  {
    let elem = locationPrototype.cloneNode();
    let label = locationPrototype.labels[0].cloneNode();
    elem.id = 'location'+item['id'];
    elem.checked = false;
    label.textContent = item['name'];
    label.setAttribute('for',elem.id);
    locationPrototype.parentElement.append(elem);
    locationPrototype.parentElement.append(label);
    locationPrototype.parentElement.append(document.createElement('br'));
  }
  locationPrototype.labels[0].remove();
  locationPrototype.remove();

  if(!localStorage.getItem('location'))
  {
    let item = [1];
    localStorage.setItem('location',JSON.stringify(item));
  }

  JSON.parse(localStorage.getItem('location')).forEach((item) => {
    document.getElementById('location'+item).checked = true;
  });

    // Создание карты.
    myMap = new ymaps.Map("map_sstucity", {
        center: m.get(JSON.parse(localStorage.getItem('location'))[0]),
        // от 0 (весь мир) до 19.
        zoom: 17,
      },
      {
        /*restrictMapArea: [
            [51.546007, 45.967917],
            [51.521625, 46.054699]
        ]*/
      }
    );
    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    )

    array = [];

    for (let i = 0; i < data.length; i++) {
        let elem = balloon.cloneNode(true);
        let img =elem.querySelector('img');

        let photo = data[i]['photo'];

        if(!photo)
          photo = "uploads/default_tree.jpg";

        img.src=serverURL_pics+'/'+photo;

        img.setAttribute("onerror", "setDefImg(this)");

        elem.querySelector('span').textContent=data[i]['name'];
        elem.querySelector('a').setAttribute('onclick', 'open_card('+i+')')
        elem.style.display = null
        array[i] = new ymaps.Placemark([data[i]['latitude'],data[i]['longitude']], {
            hintContent: data[i]['name'],
            balloonContent: elem.outerHTML,
            clusterCaption: '<strong>' + data[i]['id']+' '+data[i]['name'] + '</strong>'

        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '../assets/images/'+'deciduous_tree.svg',
            iconImageSize: [28, 28],
            iconImageOffset: [-24, -24],
            iconContentLayout: MyIconContentLayout,
        });

        array[i].data = data[i];

        array[i].events.add('beforedragstart', (event)=>{
          drags.add(array[i]);
        })

        array[i].events.add('dragend', (event)=>{
          clusterer.remove(array[i]);
          clusterer.add(array[i]);
        })
    }

    myMap.controls.remove('rulerControl');
    myMap.controls.remove('searchControl');

    clusterer = new ymaps.Clusterer({
      gridSize: 128,
      preset: 'islands#invertedVioletClusterIcons',
      maxZoom:19,
      clusterDisableClickZoom: true });
    myMap.geoObjects.add(clusterer);

    app();

}

function app(searchId){
    clusterer.removeAll();

    let datas = array.filter(function(elm){elm = elm.data;
      if(searchId)
      {
        if(searchId==elm['id']) return true;
        return false;
      }

        if(!document.getElementById('location'+elm['location']).checked) return false;

        if(!document.getElementById('types'+Array.from(types).indexOf(elm['name'])).checked) return false;
        if (document.getElementById('wires1').checked && document.getElementById('wires1').value==1 && elm['overhanging_p']==true);
        else if (document.getElementById('wires2').checked && document.getElementById('wires2').value==0 && elm['overhanging_p']==false);
        else{
            return false;
        }
        if (document.getElementById('sidewalk1').checked && document.getElementById('sidewalk1').value==1 && elm['overhanging_t']==true);
        else if (document.getElementById('sidewalk2').checked && document.getElementById('sidewalk2').value==0 && elm['overhanging_t']==false);
        else{
            return false;
        }
        if (document.getElementById('road1').checked && document.getElementById('road1').value==1 && elm['overhanging_d']==true);
        else if (document.getElementById('road2').checked && document.getElementById('road2').value==0 && elm['overhanging_d']==false);
        else{
            return false;
        }
        if (document.getElementById('dryBranches1').checked && document.getElementById('dryBranches1').value==1 && elm['dry']==true);
        else if (document.getElementById('dryBranches2').checked && document.getElementById('dryBranches2').value==0 && elm['dry']==false);
        else{
            return false;
        }
        if (document.getElementById('bark1').checked && document.getElementById('bark1').value==1 && elm['detachment']==true);
        else if (document.getElementById('bark2').checked && document.getElementById('bark2').value==0 && elm['detachment']==false);
        else{
            return false;
        }
        if (document.getElementById('cracks1').checked && document.getElementById('cracks1').value==1 && elm['cracks']==true);
        else if (document.getElementById('cracks2').checked && document.getElementById('cracks2').value==0 && elm['cracks']==false);
        else{
            return false;
        }
        if (document.getElementById('juice1').checked && document.getElementById('juice1').value==1 && elm['drips']==true);
        else if (document.getElementById('juice2').checked && document.getElementById('juice2').value==0 && elm['drips']==false);
        else{
            return false;
        }
        if (elm['height']==(''+document.getElementById('heightNumber1').value));
        else if (document.getElementById('heightNumber1').value=='');
        else{
            return false;
        }
        if (elm['tdiameter']==(''+document.getElementById('tDiameterNumber1').value));
        else if (document.getElementById('tDiameterNumber1').value=='');
        else{
            return false;
        }
        if (elm['cdiameter']==(''+document.getElementById('cDiameterNumber1').value));
        else if (document.getElementById('cDiameterNumber1').value=='');
        else{
            return false;
        }
        if (elm['tilt']==(''+document.getElementById('tiltNumber1').value));
        else if (document.getElementById('tiltNumber1').value=='');
        else{
            return false;
        }
        if (elm['latitude']==(''+document.getElementById('coordinatesNumber1').value) && elm['longitude']==(''+document.getElementById('coordinatesNumber2').value));
        else if (document.getElementById('coordinatesNumber1').value=='' || document.getElementById('coordinatesNumber2').value=='');
        else{
            return false;
        }
        return true;
    });
    // при неудачном поиске
    if(datas.length==0&&searchId)
    {
      return app();
    }

    clusterer.add(datas);

    let item = [];

    for(let checkbox of document.getElementById('tlocations').querySelectorAll('input'))
    {
      if(checkbox.checked) item.push(parseInt(checkbox.id.replace('location','')));
    }

    if(item.length>0)
    localStorage.setItem('location',JSON.stringify(item));

    if(dragMode) dragOn();
    dragReset();
}
let fhide=true;
function hideFilter(){
    if(fhide==true){
        document.getElementById("menufilters").style.display="none";
        fhide=false;
    }
    else if(fhide==false){
        document.getElementById("menufilters").style.display="initial";
        fhide=true;
    }
}

function clearMap(){
  data.forEach(elm=>document.getElementById('types'+Array.from(types).indexOf(elm['name'])).checked=true);

  document.getElementById('wires2').checked=true;
  document.getElementById('sidewalk2').checked=true;
  document.getElementById('road2').checked=true;
  document.getElementById('dryBranches2').checked=true;
  document.getElementById('bark2').checked=true;
  document.getElementById('cracks2').checked=true;
  document.getElementById('juice2').checked=true;
  document.getElementById('idNumber1').value='';
  document.getElementById('heightNumber1').value='';
  document.getElementById('tDiameterNumber1').value='';
  document.getElementById('cDiameterNumber1').value='';
  document.getElementById('tiltNumber1').value='';
  document.getElementById('coordinatesNumber1').value='';
  document.getElementById('coordinatesNumber2').value='';
}

const drags = new Set();
let dragMode = false;

function dragOn()
{
  array.forEach(item => item.options.set('draggable', true));
}

function dragOff()
{
  array.forEach(item => item.options.set('draggable', false));
}

function dragReset()
{
  for(let item of drags)
  {
    item.geometry.setCoordinates([item.data['latitude'],item.data['longitude']]);
    clusterer.remove(item);
    clusterer.add(item);
  }

  drags.clear();
}

function dragStart()
{
  dragOn();
  dragMode = true;
  dragButton.onclick = ()=>{
    dragOff();
    dragReset();
    dragButton.onclick = dragStart;
    dragButton.value = "Редактировать";

    dragLabel.hidden = true;
    resetButton.hidden = true;
    saveButton.hidden = true;
    editIndicator.hidden = true;

    dragMode = false;
  };
  dragButton.value = "Завершить редактирование";

  dragLabel.hidden = false;
  resetButton.hidden = false;
  saveButton.hidden = false;
  editIndicator.hidden = false;

}

function  dragSave()
{
  for(let item of drags)
  {
    let [latitude, longitude] = item.geometry.getCoordinates();

    moveTree(item.data['id'], latitude, longitude);

    [item.data['latitude'],item.data['longitude']]=[latitude, longitude];
  }

  drags.clear();

  savedImg.style.animationName = null;
  setTimeout(()=>savedImg.style.animationName = 'save');

}

dragButton.onclick=dragStart;

saveButton.onclick=dragSave;

resetButton.onclick=dragReset;

document.getElementsByName('idSearch')[0].onclick=()=>{
  if(!idNumber1.value) return;
  app(idNumber1.value);
}

window.onbeforeunload = function() {
  if(drags.size>0) return false;
  return;
};
