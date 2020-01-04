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

$(".submit").click(function(){
    event.preventDefault(); 
    let name= $("#nameInput");
    let animal= $("#favoriteAnimalInput"); 
    userObject.name= name[0].value.trim(); 
    userObject.favoriteAnimal= animal[0].value.trim(); 
    userObject.color= color;
    userObject.counter= counter; 
    localStorage.setItem("user", JSON.stringify(userObject)); 
    window.location.href = "count1to10.html";  
});