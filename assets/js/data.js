let data = [];

async function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
  await new Promise((resolve,reject)=>{script.onload=resolve;});
}

async function loadData()
{
  await loadScript('../assets/js/datasstu.js');
  await loadScript('../assets/js/dataeco.js');
}
