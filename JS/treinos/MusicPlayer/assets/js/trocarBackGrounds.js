function getAverageRGB(linkImg) {
    var img = new Image();
    img.src = linkImg
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

  var colorCounts = {};
  var maxCount = 0;
  var dominantColor;

  for (var i = 0; i < imageData.length; i += 4) {
    var r = imageData[i];
    var g = imageData[i + 1];
    var b = imageData[i + 2];

    var color = r + ',' + g + ',' + b;
    if (colorCounts[color]) {
      colorCounts[color]++;
    } else {
      colorCounts[color] = 1;
    }

    if (colorCounts[color] > maxCount) {
      maxCount = colorCounts[color];
      dominantColor = color;
    }
  }

  console.log(dominantColor);
  document.querySelector('body').style.background = `rgb(${dominantColor})`
}
