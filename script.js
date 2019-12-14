let beadCount=1; 

function beadChecker(status){
    while (beadCount < 13){
        let currentSpot= $(".beads").find("#spot"+beadCount); 
         console.log($(currentSpot).attr("data-counter")); 
         if($(currentSpot).attr("data-counter")===status){
             spot=beadCount; 
            console.log(firstUnslidSpot); 
             return spot; 
         }
         beadCount++; 
     }
}

function checkForFirstUnslid(){
    beadCount=1;
    let firstUnslidSpot=null;  
    beadChecker("right"); 
}

function checkForFirstUnoccupiedSpot(){
    beadCount=1;
    let firstUnoccupied=null; 
    beadChecker("false"); 
}

function slideToTheLeft(bead){
    if (bead === checkForFirstUnslid()){
        checkForFirstUnslid()
    }
}

//How to slide from one div to another

// var x;
// var y;
// $('article').each(function(index){
//     $(this).click(function(){
//         $(this).addClass('selected') ;
//         x = $(this).offset().left;
//         y = $(this).offset().top;
//     })
//     });

// $('img').each(function(index){
//     var xi = $(this).offset().left;
//     var yi = $(this).offset().top;
//     $(this).css('left', xi).css('top', yi);
//     $(this).click(function(){
//          $(this).animate({
//     left: x,
//     top: y
//          })
//     })

// });