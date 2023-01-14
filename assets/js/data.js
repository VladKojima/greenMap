{let arr = [
    {
        "location" : 1,
        "coordinates": [51.529752, 45.977860],
        "name": "Тополь",
        "height": 20.5,
        "photo": "topol.jpg",
        "icon" : "deciduous_tree.svg",
        'overhanging_d' : false,
        'overhanging_t' : false,
        'overhanging_p' : false,

        "id" :999
    },
    {
      "location" : 1,
    "coordinates": [51.528, 45.977],
    "name": "Липа",
    "height": 25.5,
    "photo": "lipa.jpg",
    "icon" : "deciduous_tree.svg",
    'overhanging_d' : false,
    'overhanging_t' : false,
    'overhanging_p' : false,

    "id" : 998
    }
]
arr.forEach((item) => {
  data.push(item);
});

}
