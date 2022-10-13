stat = ""
objects = []

function setup(){
    canvas = createCanvas(380,380)
    canvas.position(550,350)
    video = createCapture(VIDEO)
    video.hide()
}

function draw(){
    image(video,0,0,380,380)
    if(stat!=""){
        for(i=0;i<objects.length;i++){
           
            percent=floor(objects[i].confidence * 100)
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15)
            if(objects[i].label == input){
                video.stop()
                objectDetetctor.detect(gotResult)
                document.getElementById("status").innerHTML = "Object Found"
            }else{
                document.getElementById("status").innerHTML = "Object Not Found"
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    input = document.getElementById("object").value
}

function modelLoaded(){
    console.log("ModelLoaded")
    stat = ""
}

function draw(){
    image(video,0,0,380,380)
}

function gotResults(error,results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        objects = results
    }
}

