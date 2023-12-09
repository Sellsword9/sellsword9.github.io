document.getElementById('imageInput').addEventListener('change', handleImage);

function handleImage(e) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];     // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  };

  img.src = URL.createObjectURL(e.target.files[0]);
}

document.getElementById('downloadBtn').addEventListener('click', function () {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'negative_image.png';
  link.click();
});