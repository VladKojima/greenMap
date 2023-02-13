var myMap;
let clusterer;

function setDefImg(elem)
{elem.setAttribute('src', "../assets/images/testicon.png")}

const m = new Map();
m.set(1, [51.529752, 45.977860]);
m.set(2, [51.529491, 45.982059]);
m.set(3, [51.529483, 45.982046]);
m.set(4, [51.540273,46.039105]);

const types = new Set();

let balloon = document.getElementsByClassName('balloon')[0];

data.forEach((item) => {
  types.add(item['name']);
});

let it = 0;
types.forEach((item) => {
  let elem = protot.cloneNode();
  let label = protot.labels[0].cloneNode();
  elem.id = 'types'+it++;
  elem.checked = true;
  label.textContent = item;
  label.setAttribute('for',elem.id);
  protot.parentElement.append(elem);
  protot.parentElement.append(label);
  protot.parentElement.append(document.createElement('br'));
});
protot.labels[0].remove();
protot.remove();

if(!localStorage.getItem('location'))
{
  let item = [1];
  localStorage.setItem('location',JSON.stringify(item));
}

JSON.parse(localStorage.getItem('location')).forEach((item) => {
  switch (item) {
    case 1:
      studTown.checked=true
      break;
    case 2:
      streetPoliteh.checked=true
      break;
    case 3:
      admissionCommittee.checked=true
      break;
    case 4:
      econom.checked=true
      break;
  }
});


localStorage.setItem('p','0');
localStorage.setItem('t','0');
localStorage.setItem('d','0');

ymaps.ready(init);
function init(){

    // Создание карты.
    myMap = new ymaps.Map("map_sstucity", {
        center: m.get(JSON.parse(localStorage.getItem('location'))[0]),
        // от 0 (весь мир) до 19.
        zoom: 17,
      },
      {
        restrictMapArea: [
            [51.546007, 45.967917],
            [51.521625, 46.054699]
        ]
      }
    );
    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    array = [];

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
let datas;
function app(searchId){
    clusterer.removeAll();

    datas = data.filter(function(elm){
      if(searchId)
      {
        if(searchId==elm['id']) return true;
        return false;
      }
        let fl=false;
        if (document.getElementById('studTown').checked && elm['location']==1) {
            fl = true;
        }
        else if (document.getElementById('streetPoliteh').checked && elm['location']==2) {
            fl = true;
        }
        else if (document.getElementById('admissionCommittee').checked && elm['location']==3) {
            fl = true;
        }
        else if (document.getElementById('econom').checked && elm['location']==4) {
            fl = true;
        }
        else{
            return false;
        }

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
        if (elm['coordinates'][0]==(''+document.getElementById('coordinatesNumber1').value) && elm['coordinates'][1]==(''+document.getElementById('coordinatesNumber2').value));
        else if (document.getElementById('coordinatesNumber1').value=='' || document.getElementById('coordinatesNumber2').value=='');
        else{
            return false;
        }
        return fl;
    });
    // при неудачном поиске
    if(datas.length==0&&searchId)
    {
      return app();
    }

    array = [];

    for (let i = 0; i < datas.length; i++) {
        let elem = balloon.cloneNode(true);
        let img =elem.querySelector('img');
        img.src="../assets/images/"+datas[i]["photo"];
        img.setAttribute("onerror", "setDefImg(this)")
        elem.querySelector('span').textContent=datas[i]['name'];
        elem.querySelector('a').setAttribute('onclick', 'open_card('+i+')')
        elem.style.display = null
        array[i] = new ymaps.Placemark(datas[i]['coordinates'], {
            hintContent: datas[i]['name'],
            balloonContent: elem.outerHTML,
            clusterCaption: '<strong>' + datas[i]['id']+' '+datas[i]['name'] + '</strong>'

        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '../assets/images/'+datas[i]['icon'],
            iconImageSize: [28, 28],
            iconImageOffset: [-24, -24],
            iconContentLayout: MyIconContentLayout,
        });

        array[i].events.add('beforedragstart', (event)=>{
          if(!drags.has(array[i]))
          {
            drags.set(array[i], datas[i]);
          }

        })
        array[i].events.add('dragend', (event)=>{
          clusterer.remove(array[i]);
          clusterer.add(array[i]);
        })
    }

    clusterer.add(array);

    let item = [];
    if(studTown.checked) item.push(1);
    if(streetPoliteh.checked) item.push(2);
    if(admissionCommittee.checked) item.push(3);
    if(econom.checked) item.push(4);
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
  document.getElementById('studTown').checked=false;
  document.getElementById('streetPoliteh').checked=false;
  document.getElementById('admissionCommittee').checked=false;
  document.getElementById('econom').checked=true;
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

const drags = new Map();
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
  for(let item of drags.entries())
  {
    item[0].geometry.setCoordinates(item[1]['coordinates']);
    clusterer.remove(item[0]);
    clusterer.add(item[0]);
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
  for(let item of drags.entries())
  {
    // сохранение координат на сервере

    item[1]['coordinates']=item[0].geometry.getCoordinates();
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
