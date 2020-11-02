//Create variables here
var dog;
var happyDog;
var database;
var foodS = 0;
var foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database(); 
  createCanvas(500, 500);
  dog = createSprite(250,400,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(4);
  text("Note: Press Up arrow key to feed drago Milk",10,50);
  
//readStock();
writeStock();

}

function readStock(data){
 foodS = data.val();
 //console.log(data)
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x+1
  }
  database.ref('/').update({
    Food:x
  })
}


