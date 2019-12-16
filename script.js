let beadCount=1; 
let isDoneFunction= false;
let spot=null;  
let canClick=true; 

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
    if (direction === "right"){
        beadCount=1;
        while (beadCount < 13 && !isDoneFunction){
            spot= findBead(status);
            beadCount++;       
        }
    } else if (direction === "left"){
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
    moveSpot= beadChecker("false", direction); 
    let counter= $("#spot"+beadSpot).find(".counter");
    animateBead(beadSpot, moveSpot, counter);  
    function wait(){
        let timer= setInterval(function(){
            let time=0; 
            if (time < 1) {
                clearInterval(timer);
                moveBeadHTML(beadSpot, moveSpot, oppDirection);
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
    spot = beadChecker("right", "right");
    if (beadSpot === spot && canClick){
       moveBead("right");   
    } else {
        spot= beadChecker("left", "left"); 
        if (beadSpot === spot && canClick){
           moveBead("left");  
        }
    }
}

// show the bead count on the page
function displayCount(){
    count= beadChecker("left", "left")
    if (count === undefined){
        $("#count").text(0); 
    } else {
        $("#count").text(count); 
    }
    
}

//Reveal button to slide all beads over
// function askToSlideAll(){
//     debugger; 
//     count= beadChecker("left", "left")
//     if (count === 10){
//         let newButton=$("<button>"); 
//         newButton.addClass("btn btn-secondary"); 
//         newButton.text("Yes"); 
//         $(newButton).on("click",function(){
//             let x= $("#spot10").offset().left;  
//             let xi = $("#spot12").offset().left;
//             $(".counter").animate({
//                 left: (x-xi),
//             });
//         }); 
//         $(".question").append(newButton); 
//         $(".question").removeAttr("hidden"); 
//         $(".question").show();
//     } else {
//         $(".question").hide(); 
//         $(".question").find("button").remove(); 
//     }
// }

function initialClickAssignments(){
    let counters= $(".counter"); 
    for (let i=0; i<counters.length; i++){
        giveClickListenerToBeadCounters(counters[i]); 
    }
}

function giveClickListenerToBeadCounters(counter){
    $(counter).on("click", function(){
        debugger;
        let beadEl = $(this).parent().attr("id"); 
        beadSpot= parseInt(beadEl.split("ot")[1]); 
        decideSlideBead(beadSpot);
    }); 
}

//slides all left beads to the right
function resetBeadsRight(){
    let startSpot=beadChecker("left", "left");  
    let i=startSpot-1; 
    function rightWaitTimer(){let timer= setInterval(function(){
        if (i>-1){
            let counters= $(".counter"); 
            let counter= counters[i]; 
            animateBead((i+1), (i+3), counter); 
        }
       if (i<9 && i >-2){
            moveBeadHTML((i+2), (i+4), "right");
       }
        if(i< -3){
            clearInterval; 
        }
        i--; 
    }, 100); 
    } 
    rightWaitTimer(); 
    
    $("#count").text(0);   
}

function animateBead(from, to, counter){
    $(counter).css("position", "absolute");
    let x= $("#spot"+from).offset().left;  
    let xi = $("#spot"+ to).offset().left;
    $(counter).animate({
        right: (x-xi)
    }, 50);
}  

function moveBeadHTML(from, to, status){
    $("#spot"+from).html(""); 
    $("#spot"+from).attr("data-counter", "false"); 
    let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
    $("#spot"+to).html(beadImageHtml);
    $("#spot"+to).attr("data-counter", status);
    giveClickListenerToBeadCounters($("#spot"+to).find(".counter"));
} 

function moveAllBeadsLeft(){
    debugger; 
    let startSpot=beadChecker("right", "right"); 
    let i= startSpot-3;  
    function leftWaitTimer(){
        let timer= setInterval(function(){
            if (i<10){
                let counters= $(".counter"); 
                let counter= counters[i]; 
                animateBead((i+3), (i+1), counter); 
            }
           if (i>0 && i <11){
                moveBeadHTML((i+2), (i), "left"); 
           }
            if(i> 12){
                clearInterval; 
            }
            i++; 
        }, 100); 
    }
    leftWaitTimer(); 
    $("#count").text(10);   
}

$("#slideOver").on("click", moveAllBeadsLeft); 
$("#slideReset").on("click", resetBeadsRight); 

initialClickAssignments(); 