let beadCount=1; 
let isDoneFunction= false;
let spot=null;  
let canClick=true; 

function findBead(status){
    let currentSpot= $(".beads").find("#spot"+beadCount); 
    console.log($(currentSpot).attr("data-counter")); 
    if($(currentSpot).attr("data-counter")===status){
        spot=beadCount; 
        console.log(spot); 
        isDoneFunction=true; 
        return spot;
    }
    beadCount++; 
}

function beadChecker(status, direction){
    let spot= null; 
    if (direction === "right")
    {beadCount=1;
        while (beadCount < 13 && !isDoneFunction){
            spot= findBead(status);      
        }
    }  
    isDoneFunction=false; 
    return spot; 
}

function slideToTheLeft(beadSpot){
    debugger; 
    let x;
    spot = beadChecker("right", "right");
    if (beadSpot === spot && canClick){
        canClick=false; 
        moveSpot= beadChecker("false", "right"); 
        console.log("#spot"+moveSpot);
        console.log($("#spot"+moveSpot));
        x= $("#spot"+moveSpot).offset().left;  
        let counter= $("#spot"+beadSpot).find(".counter");
        var xi = $(counter).offset().left;
        $(counter).css("position", "absolute"); 
        $(counter).animate({
            left: (x-xi),
        });
        $("#spot"+moveSpot).attr("data-counter", "left");
        $("#spot"+beadSpot).attr("data-counter", "false");
        function wait(){
            let timer= setInterval(function(){
               let time=0; 
               if (time < 1) {
                    clearInterval(timer);
                    $("#spot"+beadSpot).html(""); 
                    let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
                    $("#spot"+moveSpot).html(beadImageHtml);
                    canClick=true;  
                }
                time++;
            }, 500)
        }
        wait(); 
        
    }
}

// function slideOneBead(beadSpot, direction){
//     let x;
//     spot = beadChecker(direction);
//     if (beadSpot === spot){
//         moveSpot= beadChecker("false"); 
//         console.log("#spot"+moveSpot);
//         console.log($("#spot"+moveSpot));
//         x= $("#spot"+moveSpot).offset().left;  
//         let counter= $("#spot"+beadSpot).find(".counter");
//         var xi = $(counter).offset().left;
//         $(counter).css("position", "absolute"); 
//         $(counter).animate({
//             left: (x-xi),
//         });
//         $("#spot"+moveSpot).attr("data-counter", "left");
//         $("#spot"+beadSpot).attr("data-counter", "false");
//     }
// }


$(".counter").on("click", function(){
    let beadEl = $(this).parent().attr("id"); 
    beadSpot= parseInt(beadEl.split("ot")[1]); 
    slideToTheLeft(beadSpot); 
}); 
