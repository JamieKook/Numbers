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
    // if (status==="right"){
    //     beadCount++; 
    // } else if (status === "left"){
    //     beadCount--; 
    // }
    
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

function slideBead(beadSpot){
    debugger; 
    let x;
    spot = beadChecker("right", "right");
    if (beadSpot === spot && canClick){
        canClick=false; 
        moveSpot= beadChecker("false", "right"); 
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
                    $("#spot"+moveSpot).find(".counter").on("click", function(){
                        let beadEl = $(this).parent().attr("id"); 
                        beadSpot= parseInt(beadEl.split("ot")[1]); 
                        slideBead(beadSpot); 
                    }); 
                    canClick=true;  
                }
                time++;
            }, 500)
        }
        wait();  
    } else {
        spot= beadChecker("left", "left"); 
        if (beadSpot === spot && canClick){
            canClick=false; 
            moveSpot= beadChecker("false", "left"); 
            x= $("#spot"+moveSpot).offset().left;  
            let counter= $("#spot"+beadSpot).find(".counter");
            var xi = $(counter).offset().left;
            $(counter).css("position", "absolute"); 
            $(counter).animate({
                left: (x-xi),
            });
            $("#spot"+moveSpot).attr("data-counter", "right");
            $("#spot"+beadSpot).attr("data-counter", "false");
            function wait(){
                let timer= setInterval(function(){
                   let time=0; 
                   if (time < 1) {
                        clearInterval(timer);
                        $("#spot"+beadSpot).html(""); 
                        let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
                        $("#spot"+moveSpot).html(beadImageHtml);
                        $("#spot"+moveSpot).find(".counter").on("click", function(){
                            let beadEl = $(this).parent().attr("id"); 
                            beadSpot= parseInt(beadEl.split("ot")[1]); 
                            slideBead(beadSpot); 
                        }); 
                        canClick=true;  
                    }
                    time++;
                }, 500)
            }
            wait(); 
        }
    }
}

$(".counter").on("click", function(){
    let beadEl = $(this).parent().attr("id"); 
    beadSpot= parseInt(beadEl.split("ot")[1]); 
    slideBead(beadSpot); 
}); 
