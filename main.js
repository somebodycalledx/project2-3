//https://teachablemachine.withgoogle.com/models/P53W30rjL/

  //adding code later

var prediction_1 = '';

Webcam.set({
    width: 350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("hand_gesture").innerHTML = '<img id="captured_image" src="'
        +data_uri+
        '"/>';
    })
}

console.log('ml5 Version is:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/P53W30rjL/model.json',modelLoaded)

function modelLoaded() {
    console.log('Model Loaded')
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
      console.log(result) 
      document.getElementById("result_emotion_name").innerHTML = result[0].label;
      prediction_1 = result[0].label;
      speak();
      if(result[0].label == "out") {
        document.getElementById("update_emoji").innerHTML = "&#9757;";
      }      
      if(result[0].label == "thumbs up") {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    if(result[0].label == "peace") {
        document.getElementById("update_emoji").innerHTML = "&#9996;";
    }
    if (result[0].label == "high five") {
        document.getElementById("update_emoji").innerHTML = "&#9995;"
    }
}

}
