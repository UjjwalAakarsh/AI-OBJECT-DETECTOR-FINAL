objects=[]
status=""
function preload(){
}
function setup(){
    canvas=createCanvas(350,350)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(350,350)
    video.hide()
}

function start(){
    objectdetector=ml5.objectDetector("cocossd",modelloaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
    findobject=document.getElementById("input").value

}
function modelloaded() {
    console.log("Model Loaded")
    status=true
}
function gotResults(error,result){
    if (error) {
        console.log(error)
    }
    else{
        console.log(result)
        objects=result
    }
}
function draw(){
    image(video,0,0,350,350)
    if (status !="") {
        objectdetector.detect(video,gotResults)
        for (let i = 0; i < objects.length; i++) {
            accuracy=floor(objects[i].confidence*100)+"%"
            objectname=objects[i].label
            x=objects[i].x
            y=objects[i].y
            width=objects[i].width
            height=objects[i].height

            if (objectname == findobject) {
                document.getElementById("found").innerHTML=findobject+"Found"
                speech=window.speechSynthesis;
                saythis=new SpeechSynthesisUtterance(findobject+"Found");
                speech.speak(saythis);
            }
            else{
                document.getElementById("found").innerHTML=findobject+"Not Found"
                speech=window.speechSynthesis;
                saythis=new SpeechSynthesisUtterance(findobject+"Not Found");
                speech.speak(saythis);
            }
        }

    }
}