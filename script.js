let beadCount=1; 
let isDoneFunction= false;
let spot=null;  
let canClick=true; 
let numberStars;
let isCorrect=false; 
let isCounting=false;  
const apiKey="G3W8GJRNbqbWGkFCS9Hd3c3iV4CtuQt8"; 


//Userinput stuff
let userObject= JSON.parse(localStorage.getItem("user")); 
const {counter} = userObject; 
let {favoriteAnimal} = userObject; 
const {color} = userObject; 
let giphyCount=1; 
if (favoriteAnimal === ""){
    favoriteAnimal= "celebrate"; 
}

if (color !== null){
    $("body").css("background-image", `url(images/Backdrop/${color.toLowerCase()}Backdrop.jpg)`); 
}


//abacus- ones 
//Find a bead given a status- left, right, false
function findBead(status){
    let currentSpot= $(".beads").find("#spot"+beadCount); 
    if($(currentSpot).attr("data-counter")===status){
        spot=beadCount; 
        isDoneFunction=true; 
        return spot;
    }   
}

//  Look for the first bead with status left, right, or flase
function beadChecker(status, direction){
    let spot= null; 
    if (direction === "left"){
        beadCount=1;
        while (beadCount < 13 && !isDoneFunction){
            spot= findBead(status);
            beadCount++;       
        }
    } else if (direction === "right"){
        beadCount=12;
        while (beadCount > 0 && !isDoneFunction){
            spot= findBead(status); 
            beadCount--; 
        }
    } 
    isDoneFunction=false; 
    return spot; 
}

//move a bead in a given direction - left or right
function moveBead(direction) {
    let oppDirection= null; 
    if (direction === "right"){
        oppDirection= "left"; 
    } else if (direction === "left"){
        oppDirection= "right"; 
    }
    canClick=false; 
    moveSpot= beadChecker("false", oppDirection); 
    let counter= $("#spot"+beadSpot).find(".counter");
    animateBead(beadSpot, moveSpot, counter);  
    function wait(){
        let timer= setInterval(function(){
            let time=0; 
            if (time < 1) {
                clearInterval(timer);
                moveBeadHTML(beadSpot, moveSpot, direction);
                canClick=true;
                displayCount();   
            }
            time++;
           
        }, 100)
    }
    wait(); 
}

// Decide if a bead can be slide and what direction to slide it
function decideSlideBead(beadSpot){ 
    let x;
    spot = beadChecker("left", "left");
    if (beadSpot === spot && canClick){
       moveBead("right");   
    } else {
        spot= beadChecker("right", "right"); 
        if (beadSpot === spot && canClick){
           moveBead("left");  
        }
    }
}

//give clickListeners to beads at load
function initialClickAssignments(){
    let counters= $(".counter"); 
    for (let i=0; i<counters.length; i++){
        giveClickListenerToBeadCounters(counters[i]); 
    }
}

//function to move beads on click 
function giveClickListenerToBeadCounters(counter){
    $(counter).on("click", function(){
        let beadEl = $(this).parent().attr("id"); 
        beadSpot= parseInt(beadEl.split("ot")[1]); 
        decideSlideBead(beadSpot);
    }); 
}

//slides all beads to the left
function moveAllBeadsLeft(){
    let startSpot=beadChecker("right", "right");  
    let i=startSpot-1; 
    function leftWaitTimer(){let timer= setInterval(function(){
        if (i>-1){
            let counter= $("#beadrow").find("#spot"+(i+3)).find(".counter");
            animateBead((i+1), (i+3), counter); 
        }
       if (i<9 && i >-2){
            moveBeadHTML((i+2), (i+4), "left");
       }
        if(i< -3){
            clearInterval; 
        }
        i--; 
    }, 100); 
    } 
    leftWaitTimer(); 
    if (isCounting){
        $("#count").text(0); 
        countAloud(0);
    }
    spot=0;    
}

//the actual animation of the bead movement
function animateBead(from, to, counter){
    $(counter).css("position", "absolute");
    let x= $("#spot"+from).offset().left;  
    let xi = $("#spot"+ to).offset().left;
    $(counter).animate({
        right: (x-xi)
    }, 50);
}  

//moving the bead html 
function moveBeadHTML(from, to, status){
    $("#spot"+from).html(""); 
    $("#spot"+from).attr("data-counter", "false"); 
    let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
    $("#spot"+to).html(beadImageHtml);
    $("#spot"+to).attr("data-counter", status);
    giveClickListenerToBeadCounters($("#spot"+to).find(".counter"));
} 

//move all beads to the right
function moveAllBeadsRight(){
    let startSpot=beadChecker("left", "left"); 
    let i= startSpot-3;  
    spot=10;
    function rightWaitTimer(){
        let timer= setInterval(function(){
            if (i<10){
                let counter= $("#beadrow").find("#spot"+(i+3)).find(".counter");
                animateBead((i+3), (i+1), counter); 
            }
           if (i>0 && i <11){
                moveBeadHTML((i+2), (i), "right"); 
           }
            if(i> 12){
                clearInterval; 
            }
            i++; 
        }, 100); 
        spot=10; 
    }
    rightWaitTimer(); 
    if(isCounting){
        $("#count").text(10);
        countAloud(10); 
    } 
}

// show the bead count on the page
function displayCount(){
    count= beadChecker("right", "right"); 
    if (isCounting){
        if (count === undefined){
            $("#count").text(0); 
            countAloud(0); 
        } else {
            $("#count").text(count); 
            countAloud(count); 
        }
    } else {
        $("#count").text(""); 
    }

}

//star game code 

//randomly generate 1-10 stars
function generateStars(){
    $(".star").empty(); 
    let stars= null; 
    if (counter !== null){
        stars=  `<img class="countStar img-fluid" src="images/${counter}.jpeg"></img>`;
    } else{
        stars=  `<img class="countStar img-fluid" src="images/Stars.jpeg"></img>`;
    }
    
    numberStars= Math.ceil(Math.random()*10); 
    let count=0; 
    while (count < numberStars){
        let starEl=$(stars); 
        $(".star").append(starEl); 
        count++; 
    }
}

function collectStars(){
    let stars= $(".countStar"); 
    for (let i=0; i<stars.length; i++){
        $(stars[i]).addClass("animated rotateOut"); 
    }
}; 

//check answer if it matches star number
function checkMyAnswer(){
    if (numberStars === (spot)){
        isCorrect=true; 
        collectStars();
        $("#gradeCorrect").find($("#gradeCorrectTitle")).text("Congratulations"); 
        let giphyUrl= `https://api.giphy.com/v1/gifs/search?q=${favoriteAnimal}&api_key=${apiKey}&limit=1&offset=${giphyCount}&rating=g&lang=en`; 
        let imgUrl=null; 
        $.ajax({
            url: giphyUrl,
            method: "GET"
        }).then(function(response){
            giphyCount++; 
            imgUrl= response.data[0].images.original.url;
            $("#gradeCorrect").find($(".modal-body")).html(`You are right!<br> <img class="celebrate" src="${imgUrl}"> <br>Good job.`); 
            answerSound("correct");
            $("#gradeCorrect").find($(".results")).attr("id", "tryAgain");
            $("#gradeCorrect").find($(".results")).text("Play Again!");
            $("#gradeCorrect").find($(".results")).on("click", function(){
                if (isCorrect){
                    generateStars();
                    moveAllBeadsLeft();
                }
            }); 
        });  
    } else {
        isCorrect=false; 
        $("#gradeCorrect").find($("#gradeCorrectTitle")).text("On No!"); 
        $("#gradeCorrect").find($(".modal-body")).html("Your count is not right<br> <br>Make sure the number of beads is the same as the number of stars.");
        answerSound("incorrect"); 
        $("#gradeCorrect").find($(".results")).attr("id", "goBack");
        $("#gradeCorrect").find($(".results")).text("Let me try again!"); 
    }
}

//create html sound files
function makeSoundFiles(){
    let audioFile = $("#audio0"); 
    for (let i=1; i<11; i++){
        let newAudio = $(audioFile).clone();
        $(newAudio).attr("src", ("audio/child"+i+".ogg")); 
        $(newAudio).attr("id", "audio"+i);
        $("body").append(newAudio); 
    }   
}

//play in/correct answer
function answerSound(answer){
    let audio = document.getElementById(answer+"audio");
    audio.play();
}

//play number audio files
function countAloud(number){
    if(isCounting){
        let audio = document.getElementById("audio"+number);
        audio.play();
    }
}

//turn off numbers and audio count
function turnOnOffCount(){
    if (isCounting){
        isCounting=false; 
    } else {
        isCounting=true; 
    }
}; 

// Future use
// function generateRandomNum(){
//     $(".star").empty(); 
//     let numberEl=  $("<h1>"); 
//     let number= Math.ceil(Math.random()*10); 
//     let count=0; 
//     numberEl.text(number); 
//     numberEl.addClass("count"); 
//     $(".star").append(numberEl); 
// }

//event listeners
$("#slideLeft").on("click", moveAllBeadsLeft); 
$("#slideRight").on("click", moveAllBeadsRight); 
// $("#start").on("click", generateStars); 
$("#gradeBtn").on("click", checkMyAnswer); 
$("#instructionsBtn").on("click", $("#instructions").show());
$(".slider").on("click", function(){
    turnOnOffCount();
    displayCount(); 
}); 


$("#instructions").hide(); 
initialClickAssignments();
generateStars(); 
makeSoundFiles();  
