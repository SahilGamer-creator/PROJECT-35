//Create variables here
var database;
var dog,happyDog,foodS,foodStock;
var dogimg,happydogimg;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogimg=loadImage("images/Dog.png");
  happydogimg = loadImage("images/happyDog.png");
}

function setup() {

database = firebase.database();

createCanvas(1000, 750);

 dog = createSprite(500,400,10,10);


  dog.addImage(dogimg);

  foodObj = new Food();
  
   foodStock = database.ref('Food');
 foodStock.on("value",readStock);

 feed = createButton("Feed the Dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood = createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87);
  drawSprites();


  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogimg);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

if(x<=0){
  x=0;
}else{
  x=x-1;
} 

  database.ref('/').update({
    Food:x
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if (lastFed ==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :" + lastFed + "AM",350,30);
  }

  }
