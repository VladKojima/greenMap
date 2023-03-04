let dgs = document.getElementsByTagName('canvas');
let filtered;
let chs = [];
(async ()=>
{
  await loadData();


  // тестовые данные для диаграммы возраста
  data.forEach((item) => {
    item['age'] = Math.ceil(Math.random()*20+10);
  });


  filtered = data.map(item=>item);

  ddraw()

})()

function ddraw()
{
  treeCount.textContent = filtered.length;

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

    let chart = new Chart(dgs[1],{
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

  {
    let opil = [0,0];

    filtered.forEach((item) => {
      if(item['overhanging_p']||item['overhanging_d']||item['overhanging_t'])
        opil[1]++;
      else opil[0]++;
    });

    let chart =
    new Chart(dgs[2],{
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

  {
     ages = new Map();

    filtered.forEach((item) => {
      let age = item['age'];
      if(ages.has(age))
        ages.set(age, ages.get(age)+1);
      else ages.set(age,1);
    });

    let arr = Array.from(ages.keys()).sort((a,b)=>a-b);

    let chart =
    new Chart(dgs[0],{
      type: 'line',
      data:{
        labels: arr,
        datasets: [{
          label: '',
          data: arr.map(item=>ages.get(item))
        }]
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
