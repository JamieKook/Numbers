function Abacus (){
    this.beadCount=1; 
    this.isDoneFunction= false;
    this.spot=null;  
    this.canClick=true; 
    this.isCounting=false;  
    this.beadSpot=null; 
}

//abacus- ones 

// Decide if a bead can be slide and what direction to slide it
Abacus.prototype.decideSlideBead= function(beadSpot){ 
    let x;
    this.beadSpot=beadSpot; 
    this.spot = this.beadChecker("left", "left");
    if (this.beadSpot === this.spot && this.canClick){
       this.moveBead("right");   
    } else {
        this.spot= this.beadChecker("right", "right"); 
        if (this.beadSpot === this.spot && this.canClick){
           this.moveBead("left");  
        }
    }
}

//Find a bead given a status- left, right, false
Abacus.prototype.findBead= function (status){
    let currentSpot= $(".beads").find("#spot"+this.beadCount); 
    if($(currentSpot).attr("data-counter")===status){
        this.spot=this.beadCount; 
        this.isDoneFunction=true; 
        return this.spot;
    }   
}

//  Look for the first bead with status left, right, or flase
Abacus.prototype.beadChecker= function (status, direction){
    this.spot= null; 
    if (direction === "left"){
        this.beadCount=1;
        while (this.beadCount < 13 && !this.isDoneFunction){
            this.spot= this.findBead(status);
            this.beadCount++;       
        }
    } else if (direction === "right"){
        this.beadCount=12;
        while (this.beadCount > 0 && !this.isDoneFunction){
            this.spot= this.findBead(status); 
            this.beadCount--; 
        }
    } 
    this.isDoneFunction=false; 
    return this.spot; 
}

//move a bead in a given direction - left or right
Abacus.prototype.moveBead= function(direction) {
    let oppDirection= null; 
    if (direction === "right"){
        oppDirection= "left"; 
    } else if (direction === "left"){
        oppDirection= "right"; 
    }
    this.canClick=false; 
    let moveSpot= this.beadChecker("false", oppDirection); 
    let counter= $("#spot"+this.beadSpot).find(".counter");
    this.animateBead(this.beadSpot, moveSpot, counter);  
    function wait(){
        let timer= setInterval(function(){
            let time=0; 
            if (time < 1) {
                clearInterval(timer);
                abacus.moveBeadHTML(abacus.beadSpot, moveSpot, direction);
                abacus.canClick=true;
                abacus.displayCount();   
            }
            time++;
           
        }, 100)
    }
    wait(); 
}



//give clickListeners to beads at load
Abacus.prototype.initialClickAssignments= function(){
    let counters= $(".counter"); 
    for (let i=0; i<counters.length; i++){
        this.giveClickListenerToBeadCounters(counters[i]); 
    }
}

//function to move beads on click 
Abacus.prototype.giveClickListenerToBeadCounters= function(counter){
    $(counter).on("click", function(){
        let beadEl = $(this).parent().attr("id"); 
        let beadSpot= parseInt(beadEl.split("ot")[1]); 
        abacus.decideSlideBead(beadSpot);
    }); 
}

//slides all beads to the left
Abacus.prototype.moveAllBeadsLeft= function(){
    let startSpot=abacus.beadChecker("right", "right");  
    let i=startSpot-1; 
    function leftWaitTimer(){let timer= setInterval(function(){
        if (i>-1){
            let counter= $("#beadrow").find("#spot"+(i+3)).find(".counter");
            abacus.animateBead((i+1), (i+3), counter); 
        }
       if (i<9 && i >-2){
            abacus.moveBeadHTML((i+2), (i+4), "left");
       }
        if(i< -3){
            clearInterval; 
        }
        i--; 
    }, 100); 
    } 
    leftWaitTimer(); 
    if (abacus.isCounting){
        $("#count").text(0); 
        abacus.countAloud(0);
    }
    this.spot=0;    
}

//the actual animation of the bead movement
Abacus.prototype.animateBead= function(from, to, counter){
    $(counter).css("position", "absolute");
    let x= $("#spot"+from).offset().left;  
    let xi = $("#spot"+ to).offset().left;
    $(counter).animate({
        right: (x-xi)
    }, 50);
}  

//moving the bead html 
Abacus.prototype.moveBeadHTML= function(from, to, status){
    $("#spot"+from).html(""); 
    $("#spot"+from).attr("data-counter", "false"); 
    let beadImageHtml= `<img class="counter img-fluid" src="images/counter.jpeg">`;
    $("#spot"+to).html(beadImageHtml);
    $("#spot"+to).attr("data-counter", status);
    this.giveClickListenerToBeadCounters($("#spot"+to).find(".counter"));
} 

//move all beads to the right
Abacus.prototype.moveAllBeadsRight= function(){
    let startSpot=abacus.beadChecker("left", "left"); 
    let i= startSpot-3;  
    this.spot=10;
    function rightWaitTimer(){
        let timer= setInterval(function(){
            if (i<10){
                let counter= $("#beadrow").find("#spot"+(i+3)).find(".counter");
                abacus.animateBead((i+3), (i+1), counter); 
            }
           if (i>0 && i <11){
                abacus.moveBeadHTML((i+2), (i), "right"); 
           }
            if(i> 12){
                clearInterval; 
            }
            i++; 
        }, 100); 
        this.spot=10; 
    }
    rightWaitTimer(); 
    debugger; 
    if(abacus.isCounting){
        $("#count").text(10);
        abacus.countAloud(10); 
    } 
}

// show the bead count on the page
//Also updates spot variable before check my answer
Abacus.prototype.displayCount= function(){
    count= this.beadChecker("right", "right"); 
    if (count === undefined){
        this.spot=0; 
    }
    if (this.isCounting){
        if (count === undefined){
            $("#count").text(0); 
            this.countAloud(0); 
        } else {
            $("#count").text(count); 
            this.countAloud(count); 
        }
    } else {
        $("#count").text(""); 
    }
}


//create html sound files
Abacus.prototype.makeSoundFiles= function(){
    let audioFile = $("#audio0"); 
    for (let i=1; i<11; i++){
        let newAudio = $(audioFile).clone();
        $(newAudio).attr("src", ("audio/child"+i+".ogg")); 
        $(newAudio).attr("id", "audio"+i);
        $("body").append(newAudio); 
    }   
}


//play number audio files
Abacus.prototype.countAloud= function(number){
    if(this.isCounting){
        let audio = document.getElementById("audio"+number);
        audio.play();
    }
}

//turn off numbers and audio count
Abacus.prototype.turnOnOffCount= function(){
    if (this.isCounting){
        this.isCounting=false; 
    } else {
        this.isCounting=true; 
    }
}; 

let abacus= new Abacus(); 
localStorage.setItem("abacus", JSON.stringify(abacus)); 