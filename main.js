
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img src = "' + data_uri + '" id = "capturedImage">'
    });
}
console.log("ml5 version:", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/01RikonDh/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model has been loaded!");
}

function speak() {
    var synth = window.speechSynthesis;

    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function prediction() {
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        document.getElementById("emotionName1").innerHTML = results[0].label;
        document.getElementById("emotionName2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        speak();

        if (results[0].label == "Crying") {
            document.getElementById("emoji1").innerHTML = "&#128546;";
        
        } else if (results[0].label == "Sad") {
            document.getElementById("emoji1").innerHTML = "&#128532;";
        
        } else if (results[0].label == "Excited") {
            document.getElementById("emoji1").innerHTML = "&#128512;";

        } else if (results[0].label == "Angry") {
            document.getElementById("emoji1").innerHTML = "&#128545;";

        } else if (results[0].label == "Happy") {
            document.getElementById("emoji1").innerHTML = "&#128522;";
        }

        if (results[1].label == "Crying") {
            document.getElementById("emoji2").innerHTML = "&#128546;";
        
        } else if (results[1].label == "Sad") {
            document.getElementById("emoji2").innerHTML = "&#128532;";
        
        } else if (results[1].label == "Excited") {
            document.getElementById("emoji2").innerHTML = "&#128512;";

        } else if (results[1].label == "Angry") {
            document.getElementById("emoji2").innerHTML = "&#128545;";

        } else if (results[1].label == "Happy") {
            document.getElementById("emoji2").innerHTML = "&#128522;";
        }
    }
}