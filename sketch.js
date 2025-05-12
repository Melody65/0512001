let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
                76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  console.log("Video capture started:", video);

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    console.log("Facemesh predictions:", results);
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 105, 180); // 粉紅色
    strokeWeight(5);
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const index = points[i];
      if (index >= keypoints.length) {
        console.error(`Index ${index} out of bounds for keypoints.`);
        continue;
      }
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
