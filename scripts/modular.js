requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
requirejs(["abacus"], function(abacus) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});
const abacus= new Abacus(); 

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

const apiKey="G3W8GJRNbqbWGkFCS9Hd3c3iV4CtuQt8"; 
let numberStars;
let isCorrect=false; 
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
const checkMyAnswer= function(){
    if (numberStars === (abacus.spot)){
        abacus.isCorrect=true; 
        collectStars(); 
        // cb1(); 
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
                    // cb2(); 
                    abacus.moveAllBeadsLeft();
                }
            }); 
        });  
    } else {
        this.isCorrect=false; 
        $("#gradeCorrect").find($("#gradeCorrectTitle")).text("On No!"); 
        $("#gradeCorrect").find($(".modal-body")).html("Your count is not right<br> <br>Make sure the number of beads is the same as the number of stars.");
        answerSound("incorrect"); 
        $("#gradeCorrect").find($(".results")).attr("id", "goBack");
        $("#gradeCorrect").find($(".results")).text("Let me try again!"); 
    }
}


//play in/correct answer
function answerSound(answer){
    let audio = document.getElementById(answer+"audio");
    audio.play();
}



//event listeners
$("#slideLeft").on("click", abacus.moveAllBeadsLeft); 
$("#slideRight").on("click", abacus.moveAllBeadsRight); 
// $("#start").on("click", generateStars); 
$("#gradeBtn").on("click", checkMyAnswer); 
$("#instructionsBtn").on("click", $("#instructions").show());
$(".slider").on("click", function(){
    abacus.turnOnOffCount();
    abacus.displayCount(); 
}); 


$("#instructions").hide(); 
abacus.initialClickAssignments();
generateStars(); 
abacus.makeSoundFiles();  
