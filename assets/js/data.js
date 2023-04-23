let data = [];

var serverURL = 'https://inpit.sstu.ru/greenmapServer/api';
var url_getLocations = '/locations/getLocations';

async function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
  await new Promise((resolve,reject)=>{script.onload=resolve;});
}

async function getLocations() {
    return (await axios.get(serverURL + url_getLocations)).data.locations;
}

async function loadData()
{
  /*await loadScript('../assets/js/datasstu.js');
  await loadScript('../assets/js/dataeco.js');*/

  for (let item of await getLocations())
  {
    data.push(...await getTrees(item.id));
  }

  //data.push(...await getTrees(1))

}
