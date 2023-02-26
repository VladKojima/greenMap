let dgs = document.getElementsByTagName('canvas');
let filtered;
let chs = [];
(async ()=>
{
  await loadData();

  filtered = data.map(item=>item);

  ddraw()

})()

function ddraw()
{
  chs.length = 0;
  {
    let types = new Map();

    function loader(){
      types.clear();

      types.set('Другое', []);
      filtered.forEach((item) => {
        if(!types.has(item['name']))
          types.set(item['name'],[]);
        types.get(item['name']).push(item);
      });

      for(let item of types.entries())
      {
        if(item[0]!='Другое' && item[1].length<filtered.length/75)
        {
          types.get('Другое').push(...item[1]);
          types.delete(item[0]);
        }
      }
    }

    loader();

    let chart = new Chart(dgs[0],{
      type: 'doughnut',
      data: {
        datasets:[{
          data: Array.from(types.values()).map(item=>item.length)
        }],
        labels: Array.from(types.keys())
      },
      options:{
        onClick: e=>{
          let elem = chart.getActiveElements()[0];
          stack = [];
          if(elem && elem.element.$context.dataIndex === 0)
          {
            let arr = types.get('Другое');

            types.clear();

            arr.forEach((item) => {
              if(!types.has(item['name']))
                types.set(item['name'],[]);
              types.get(item['name']).push(item);
            });

            stack.push(chart.options.onClick);
            stack.push(chart.data);

            chart.config.data = {
              datasets:[{
                data: Array.from(types.values()).map(item=>item.length)
              }],
              labels: Array.from(types.keys())
            };

            chart.config.options.onClick=e=>{

              chart.config.data = stack.pop();
              chart.config.options.onClick = stack.pop();

              loader();

              setTimeout(()=>chart.update());
            };

            setTimeout(()=>chart.update());
          }
        }
      }
    });
    chs.push(chart);
  }

  ctx = dgs[1];

  {
    let opil = [0,0];

    filtered.forEach((item) => {
      if(item['overhanging_p']||item['overhanging_d']||item['overhanging_t'])
        opil[1]++;
      else opil[0]++;
    });

    let chart =
    new Chart(ctx,{
      type: 'doughnut',
      data: {
        datasets:[{
          data: opil
        }],
        labels: ['Не подлежит опиловке', 'Подлежит опиловке']
      }
    });
    chs.push(chart);
  }

}

function setLocation(location)
{
  filtered = data.filter(item=>location.indexOf(item['location'])!=-1);
  for(let item of chs)
    item.destroy();
  ddraw();
}
