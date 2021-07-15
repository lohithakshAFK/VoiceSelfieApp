var speech_recognition = window.webkitSpeechRecognition;
var recognition = new speech_recognition();

function start(){
    document.getElementById("textbox").innerHTML = "";

    recognition.start();
}

recognition.onresult=function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie"){
        console.log("taking your sellfie in 5 seconds");
        speak();
    }
}

function speak(){
    var synthesis = window.speechSynthesis;
    speak_data = "taking your selfie in 5 seconds";
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synthesis.speak(utterthis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

Webcam.set({
width:200,
height:200,
image_format:"jpeg",
jpeg_quality:90
});
camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("result").innerHTML = '<img id="selfie_img" src="'+data_uri+'">';
        }
    );
};

function save(){
    link = document.getElementById("link");
    img  = document.getElementById("selfie_img").src;
    link.href = img;
    link.click();
    
}