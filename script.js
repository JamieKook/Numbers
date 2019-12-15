let beadCount=1; 
let isDoneFunction= false;
let spot=null;  
let canClick=true; 

function findBead(status){
    let currentSpot= $(".beads").find("#spot"+beadCount); 
    if($(currentSpot).attr("data-counter")===status){
        spot=beadCount; 
        isDoneFunction=true; 
        return spot;
    }   
}

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

function moveBead(direction) {
    let oppDirection= null; 
    if (direction === "right"){
        oppDirection= "left"; 
    } else if (direction === "left"){
        oppDirection= "right"; 
    }
    canClick=false; 
    moveSpot= beadChecker("false", direction); 
    x= $("#spot"+moveSpot).offset().left;  
    let counter= $("#spot"+beadSpot).find(".counter");
    let xi = $(counter).offset().left;
    $(counter).css("position", "absolute"); 
    $(counter).animate({
        left: (x-xi),
    });
    $("#spot"+moveSpot).attr("data-counter", oppDirection);
    $("#spot"+beadSpot).attr("data-counter", "false");
    function wait(currentBead){
        let timer= setInterval(function(){
            let time=0; 
            if (time < 1) {
                clearInterval(timer);
                $(currentBead).html(""); 
                let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
                $("#spot"+moveSpot).html(beadImageHtml);
                $("#spot"+moveSpot).find(".counter").on("click", function(){
                    let beadEl = $(this).parent().attr("id"); 
                    beadSpot= parseInt(beadEl.split("ot")[1]); 
                    slideBead(beadSpot);
                    displayCount(); 
                    // slideAllBeads();  
                }); 
                canClick=true;  
            }
            time++;
        }, 500)
    }
    wait($("#spot"+beadSpot)); 
}


function slideBead(beadSpot){ 
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

function displayCount(){
    count= beadChecker("left", "left")
    if (count === undefined){
        $("#count").text(0); 
    } else {
        $("#count").text(count); 
    }
    
}

// function slideAllBeads(){
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

$(".counter").on("click", function(){
    let beadEl = $(this).parent().attr("id"); 
    beadSpot= parseInt(beadEl.split("ot")[1]); 
    slideBead(beadSpot);
    displayCount(); 
    // slideAllBeads(); 
}); 

$("#slideAll").on("click", function(){
    debugger; 
    let counters= $(".counter");  
    // let x= $("#spot10").offset().left;  
    // let xi = $("#spot12").offset().left;
    let i=9;  
    let timer= setInterval(function(){
        if (i>-1){
            let counter= counters[i]; 
            $(counter).css("position", "absolute");
            let x= $("#spot"+(i+1)).offset().left;  
            let xi = $("#spot"+ (i+3)).offset().left;
            $(counter).animate({
                right: (x-xi)
            }, 50);
        }
       if (i<9 && i >-2){
           $("#spot"+(i+2)).html(""); 
           $("#spot"+(i+2)).attr("data-counter", "false"); 
           let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
           $("#spot"+(i+4)).html(beadImageHtml);
           //change direction to opposite direction
           $("#spot"+(i+4)).attr("data-counter", "right");
           $("#spot"+(i+4)).find(".counter").on("click", function(){
               debugger;
               let beadEl = $(this).parent().attr("id"); 
               beadSpot= parseInt(beadEl.split("ot")[1]); 
               slideBead(beadSpot);
               displayCount(); 
           }); 
       } 
        if (i< -3){
            clearInterval; 
        }
        i--; 
    }, 100); 
}); 
