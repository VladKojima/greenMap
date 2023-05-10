let dgs = document.getElementsByTagName('canvas');
let filtered;
let chs = [];

const colors = {
  '--bs-blue': "#0d6efd",
	'--bs-indigo': "#6610f2",
	'--bs-purple': '#6f42c1',
	'--bs-pink': '#d63384',
	'--bs-red': '#dc3545',
	'--bs-orange': '#fd7e14',
	'--bs-yellow': '#ffc107',
	'--bs-green': '#198754',
	'--bs-teal': '#20c997',
	'--bs-cyan': '#0dcaf0',
	'--bs-black': '#000',
	'--bs-white': '#013486',
	'--bs-gray': '#6c757d',
	'--bs-gray-dark': '#343a40',
	'--bs-gray-100': '#f8f9fa',
	'--bs-gray-200': '#e9ecef',
	'--bs-gray-300': '#A0DDDF',
	'--bs-gray-400': '#A0D21D',
	'--bs-gray-500': '#344BB2',
	'--bs-gray-600': '#A72358',
	'--bs-gray-700': '#3245A7',
	'--bs-gray-800': '#2456A0',
	'--bs-gray-900': '#275637',
	'--bs-primary': '#0d6efd',
	'--bs-secondary': '#6c757d',
	'--bs-success':'#198754',
	'--bs-info': '#0dcaf0',
	'--bs-warning': '#ffc107',
	'--bs-danger': '#dc3545',
	'--bs-light': '#f8f9fa',
	'--bs-dark': '#212529',
};


(async () => {
  await loadData();


  // тестовые данные для диаграммы возраста
  data.forEach((item) => {
    item['age'] = Math.ceil(Math.random() * 20 + 10);
  });


  filtered = data.map(item => item);

  ddraw()

})()

function ddraw() {
  treeCount.textContent = filtered.length;

  chs.length = 0;
  {
    let types = new Map();

    function loader() {
      types.clear();

      types.set('Другое', []);
      filtered.forEach((item) => {
        if (!types.has(item['name']))
          types.set(item['name'], []);
        types.get(item['name']).push(item);
      });

      for (let item of types.entries()) {
        if (item[0] != 'Другое' && item[1].length < filtered.length / 75) {
          types.get('Другое').push(...item[1]);
          types.delete(item[0]);
        }
      }
    }

    loader();

    let colorarr = [];
    for(let item in colors){
      colorarr.push(colors[item]);
    }

    let chart = new Chart(dgs[1], {

      type: 'pie',
      data: {
        datasets: [{
          data: Array.from(types.values()).map(item => item.length),
          backgroundColor:colorarr,
        }],
        labels: Array.from(types.keys()),




      },
      options: {
        maintainAspectRatio: false,
        cutout: 115,
        plugins: {
          legend: {
            display: false,
          }
        },

        onClick: e => {
          let elem = chart.getActiveElements()[0];
          stack = [];
          if (elem && elem.element.$context.dataIndex === 0) {
            let arr = types.get('Другое');

            types.clear();

            arr.forEach((item) => {
              if (!types.has(item['name']))
                types.set(item['name'], []);
              types.get(item['name']).push(item);
            });

            stack.push(chart.options.onClick);
            stack.push(chart.data);

            chart.config.data = {
              datasets: [{
                data: Array.from(types.values()).map(item => item.length)
              }],
              labels: Array.from(types.keys())
            };

            chart.config.options.onClick = e => {

              chart.config.data = stack.pop();
              chart.config.options.onClick = stack.pop();

              loader();

              setTimeout(() => chart.update());
            };

            setTimeout(() => chart.update());
          }
        }
      }
    });
    chs.push(chart);
  }

  {
    let needed = filtered.filter(item=>item['overhanging_p'] || item['overhanging_d'] || item['overhanging_t']);

    value1.textContent = needed.filter(item=>item['overhanging_p']).length;
    value2.textContent = needed.filter(item=>item['overhanging_d']).length;
    value3.textContent = needed.filter(item=>item['overhanging_t']).length;

    value1.parentElement.parentElement.querySelector('.progress-bar').style.width = needed.length > 0 ? value1.textContent/needed.length * 100 + '%' : '0%';
    value2.parentElement.parentElement.querySelector('.progress-bar').style.width = needed.length > 0 ? value2.textContent/needed.length * 100 + '%' : '0%';
    value3.parentElement.parentElement.querySelector('.progress-bar').style.width = needed.length > 0 ? value3.textContent/needed.length * 100 + '%' : '0%';


    let ctx = dgs[2].getContext('2d');

    let gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
        gradientStroke1.addColorStop(0, '#259AFF');
        gradientStroke1.addColorStop(1, '#00539E');

    let gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
        gradientStroke2.addColorStop(0, '#EE513B');
        gradientStroke2.addColorStop(1, '#D13200');

    let gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
        gradientStroke3.addColorStop(0, '#ff8359');
        gradientStroke3.addColorStop(1, '#ffdf40');

    let chart =
      new Chart(dgs[2], {
        type: 'pie',
        data: {
          datasets: [{
            data: [filtered.length-needed.length, needed.length],
            label: 'Подлежит опиловке',
          backgroundColor:[
            gradientStroke1,
            gradientStroke2,
          ],



          },

        ],
          labels: ['Не подлежит опиловке', 'Подлежит опиловке'],
          options: {
            maintainAspectRatio: false,
            cutout: 110,
            plugins: {
              legend: {
                display: false,
              }
            }

          }
        }

      });
    chs.push(chart);
  }

  {
    ages = new Map();

    filtered.forEach((item) => {
      let age = item['age'];
      if (ages.has(age))
        ages.set(age, ages.get(age) + 1);
      else ages.set(age, 1);
    });

    let arr = Array.from(ages.keys()).sort((a, b) => a - b);

    let chart =
      new Chart(dgs[0], {
        type: 'line',
        data: {
          labels: arr,
          datasets: [{
            label: '',
            data: arr.map(item => ages.get(item)),
            backgroundColor: [
              '#5e72e4'
            ],
            fill: {
              target: 'origin',
              above: 'rgb(94 114 228 / 14%)',   // Area will be red above the origin
              below: 'rgb(94 114 228 / 14%)'   // And blue below the origin
            },
            tension: 0.44,
            borderColor: [
              '#5e72e4'
            ],
            pointRadius: "0",
            borderWidth: 3

          }]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            }
          },
        },
      });
    chs.push(chart);
  }

}

function setLocation(location) {
  filtered = data.filter(item => location.indexOf(item['location']) != -1);
  for (let item of chs)
    item.destroy();
  ddraw();
}
