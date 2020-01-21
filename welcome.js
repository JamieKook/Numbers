let color=null; 
let counter= null; 

let userObject= {}; 

$(".color").click(function(){
    color=$(this).text(); 
    $(".colorSelected").text(color); 
    $(".colorSelected").css("color", color); 
}); 

$(".counter").click(function(){
    counter=$(this).text(); 
    $(".counterSelected").text(counter); 
}); 

const generateIndex= ()=>{
    $(".main").hide(); 
    $(".index").show(); 
    const indexHtml=`
        <h1 class="p-3"> Hi ${userObject.name} </h1>
        <h2 class= "p-3"> Select Your Activity</h2>
        <ul>
            <li class="p-3"> Learn to count to 10 with the abacus <button class="btn btn-success" id="count1to10Btn">Go!</button></li>
            <li class="p-3"> Represent 1 to 10 with the abacus <button class="btn btn-success" id="test1to10Btn">Go!</button></li>
        </ul>
        <button class="btn btn-secondary my-5" id="preferences" class="btn btn-secondary"> Update My Preferences </button>
    `
    $(".index").html(indexHtml); 
    $("#count1to10Btn").on("click", function(){
        window.location.href = "count1to10.html";
    }); 
    $("#test1to10Btn").on("click", function(){
        window.location.href = "test1to10.html";
    });  
    $("#preferences").on("click", function(){
        console.log(event); 
        restart(); 
    });  

}

const restart= ()=>{
    debugger;  
    $(".index").empty();
    $(".main").show(); 
    $(".submit").click(function(){
        event.preventDefault(); 
        let name= $("#nameInput");
        let animal= $("#favoriteAnimalInput"); 
        userObject.name= name[0].value.trim(); 
        userObject.favoriteAnimal= animal[0].value.trim(); 
        userObject.color= color;
        userObject.counter= counter; 
        localStorage.setItem("user", JSON.stringify(userObject)); 
        // window.location.href = "count1to10.html";  
        generateIndex();
    });
}

$(".submit").click(function(){
    event.preventDefault(); 
    let name= $("#nameInput");
    let animal= $("#favoriteAnimalInput"); 
    userObject.name= name[0].value.trim(); 
    userObject.favoriteAnimal= animal[0].value.trim(); 
    userObject.color= color;
    userObject.counter= counter; 
    localStorage.setItem("user", JSON.stringify(userObject)); 
    // window.location.href = "count1to10.html";  
    generateIndex();
});

function initializeLocalStorage(){
    debugger; 
    let user= localStorage.getItem("user"); 
    if (user === null){
        userObject = {}; 
        restart(); 
    } else {
        userObject= JSON.parse(user); 
    }
}

initializeLocalStorage(); 

if (userObject.name !== "" || userObject !== null) {
    generateIndex(); 
} else {
    $(".index").hide(); 
    restart(); 
}
   
