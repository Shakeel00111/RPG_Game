var xp = 0;
var health = 100;
var gold = 50;
var currentWeapon = 0;
let fighting ;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");

const button2 = document.querySelector("#button2");

const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");

const xpText = document.querySelector("#xpText");

const healthText = document.querySelector("#healthText");

const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");

const monsterNameText = document.querySelector("#monstername");

const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [

  {
    name: "slime",
    level: 2 ,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8 ,
    health: 60
  },
  {
    name: "dragon",
    level: 20 ,
    health: 300
  }

]

const locations = [
 
  
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)" , "Buy weapon (30 gold)" , "Go to town square:"],
    "button functions": [  buyHealth , buyWeapon,  goTown],
    text: "You entered the store"
    },
  
  {
    name: "town square",
    "button text": ["Go to store" , "goCave" , "Fight Dragon"],
  "button functions": [ goStore , goCave, fightDragon],
    text: "You are in the town square , you see a sign that says \"store\"."

    },
  
  {
    name: "cave",
    "button text": ["Fight slime" , "Fight fanged beast" , "Go to store"],
    "button functions": [ fightSlime , fightBeast, goStore],
    text: "You entered the cave . You see some monsters."
  },

  {
    name: "fight",
    "button text": ["Attack", "Dodge" , "Run"],
    "button functions": [ attack,dodge,goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monsters",
    "button text": ["|", "Go to town square" , "easter egg"],
    "button functions": [ goTown,goTown,easterEgg],
    text: "The monsters screems Arggg!! as it dies . You gain  experiance points and find gold."
  },
  {
    name: "lose",
    "button text": ["|","REPLAY?","|"],
    "button functions": [ restart,restart,restart],
    text: "You Die "
  },
  {
    name: "win",
    "button text": ["|","REPLAY?","|"],
    "button functions": [ restart,restart,restart],
    text: "You defeat the dragon! YOU WIN THE GAME!"


  },
  {
    name: "easter egg",
    "button text": ["2","8","Go to town square"],
    "button functions": [ pickTwo,pickEight,goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"


  }


];


button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;



function update(location){
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;

}

function goStore(){

        update(locations[0]);
}

function goTown(){

        update(locations[1]);

}

function goCave(){
         update(locations[2]);
}

function buyHealth(){

  if(gold >= 10 ){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }else{
    text.innerText = "You do not have enough gold to buy health"
  
  }
  
}
function buyWeapon(){
if (currentWeapon < weapons.length -1)
{
  
  if(gold >= 30){
    gold -= 30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = "You now have a " + newWeapom + ".";
    inventory.push(newWeapon);
    text.innerText += "In your inventory you have: " + inventory
  }else{
    text.innerText = "You do not have a gold to buy a weapon"
  }
}else{
  text.innerText = "You already have the most powerful weapon"
  button2.innerText = "Sell weapon for 15 gold"
  button2.onclick = sellWeapon;
}
}

function sellWeapon(){

  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); //which means removes the element from the array and returning that to the currentWeapon variable
    text.innerText = "You sold a " + currentWeapon +"."+ "  In your invenntory you have "+ inventory ;
    
  }else{
    text.innerText = "Dont sell your only weapon"
  }
  
}

function fightSlime(){
  fighting = 0;
  gofight();

}
function fightBeast(){

  fighting = 1;
  gofight();
}
function fightDragon(){
  fighting = 2;
  gofight();
}

function gofight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerTest = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  
}
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks";
  text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
  if(MonsterHit()){
    health -= getMonsterAttackvalue(monsters[fighting].level);
  }else{
    text.innerText += "You miss";
  }
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if(health<=0){
    lose();
  }else if(monsterHealth<=0){

    fighting === 2 ? winGame() : defeatMonster();
  
  }

  if(Math.random() <= .1 && inventory.length !== 1){
    text.innerText += "Your " + inventory.pop() + " breaks";
    currentWeapon--;
  }

}
function MonsterHit(){
  return (Math.random() > .2 || health < 20);
}

function getMonsterAttackvalue(level){
  let hit = (level * 5) + Math.floor(Math.random() * xp);
  console.log(hit);
  return hit;
}


function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";

}
function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  
}
function lose(){
  update(locations[5]);
  
}
function winGame(){
  update(locations[6]);
}
function restart(){
   xp = 0;
   health = 100;
   gold = 50;
   currentWeapon = 0;
   inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = health;
  goTown();
}

function easterEgg(){
  update(locations[7]);
}
function pickTwo(){
  pick(2);
}
function pickEight(){
  pick(8);
}
function pick(guess){

  let numbers = [];
  while(numbers.length < 5){
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the numbers:\n";

  for(let i = 0 ; i < 5 ; i++){
    text.innerText += numbers[i] + "\n";
  }

  if(numbers.indexOf(guess) !== -1){
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
    
  }else{

      text.innerText += "You lose 10 gold!";
      health -= 10;
      healthText.innerText = health;
   
    if(health <= 0){
      lose();
    }

  }

  
}
