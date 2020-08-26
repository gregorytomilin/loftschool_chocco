// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [67.296325, 32.474641],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14,
        controls: []
    });
    const coords = [
        [67.294102, 32.473483],
        [67.297294, 32.477345],
        [67.297642, 32.481680],
        [67.295537, 32.477646]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/icons/marker.svg',
        iconImageSize: [36, 47],
        iconImageOffset: [-25, -47]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
      })

      myMap.geoObjects.add(myCollection);

      myMap.behaviors.disable('scrollZoom');

}
