ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [51.532677, 46.007514],
        // от 0 (весь мир) до 19.
        zoom: 14
    });
    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    sstucity = new ymaps.Placemark([51.529752, 45.977860], {
        hintContent: 'Студгородок',
        balloonContent: "<div class='balloon'><img src='images/sstucity.jfif'><span>Студгородок</span><a class='balloon_btn' href='sstucity.html'>Перейти</a></div>",
        iconContent: '1'
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'images/redc.webp',
        iconImageSize: [28, 28],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-24, -24],
        iconContentOffset: [8, 6],
        iconContentLayout: MyIconContentLayout
    });
    econom = new ymaps.Placemark([51.539232, 46.040464], {
        hintContent: 'СЭИ',
        balloonContent: "<div class='balloon'><img src='images/econom.jpg'><span>СЭИ</span><a class='balloon_btn' href='econom.html'>Перейти</a></div>",
        iconContent: '2'
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'images/redc.webp',
        iconImageSize: [28, 28],
        iconImageOffset: [-24, -24],
        iconContentOffset: [8, 6],
        iconContentLayout: MyIconContentLayout
    });
    ppk = new ymaps.Placemark([51.528391, 46.031858], {
        hintContent: 'ППК',
        balloonContent: "<div class='balloon'><img src='images/ppk.webp'><span>ППК</span><a class='balloon_btn' href='ppk.html'>Перейти</a></div>",
        iconContent: '3'
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'images/redc.webp',
        iconImageSize: [28, 28],
        iconImageOffset: [-24, -24],
        iconContentOffset: [8, 6],
        iconContentLayout: MyIconContentLayout
    });

    myMap.geoObjects
        .add(econom)
        .add(ppk)
        .add(sstucity);
}
