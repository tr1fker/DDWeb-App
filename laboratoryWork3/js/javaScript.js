function showImage(){
    const value = document.getElementById('imgSelector').value;
    const img = document.getElementById('transport-image');

    const images = {
        airplane: '../resources/airplane.jpeg',
        car: '../resources/car.jpg',
        motorbike: '../resources/motorbike.jpg',
        tractor: '../resources/tractor.jpg',
        train: '../resources/train.jpg'
    };

    if (images[value]){
        img.src = images[value];
    }

}

function openWindow() {
    const imgVal = document.getElementById('imgSelector').value;
    const colVal = document.getElementById('colSelector').value;
    const tranVal = document.getElementById('tranSelector').value;
    const titVal = document.getElementById('titSelector').value;
    const widVal = document.getElementById('widSelector').value;

    const images = {
        airplane: '../resources/airplane.jpeg',
        car: '../resources/car.jpg',
        motorbike: '../resources/motorbike.jpg',
        tractor: '../resources/tractor.jpg',
        train: '../resources/train.jpg'
    };

    const win = window.open('', '_blank', 'width=400,height=400');
    win.document.write(`
        <h1>${titVal}</h1>
        <img src="${images[imgVal]}" style="width:${widVal}; border:3px solid ${colVal}; opacity:${tranVal};">
    `);
  }