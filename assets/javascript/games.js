var charactersArray = [];

/* Manualt generate ID */
function charConstructor(id,name, hp, ap, img) {
	return{
		id: id,
		name: name,
		hp: hp,
		ap: ap,
		countAP: 1,
		img: img,
		attack: function(enemie) {
			enemie.hp -= this.ap * this.countAP;
			this.countAP++;
		},
		defense: function(enemie){
			enemie.hp -= this.ap * 4; // still working on it.
		}		
	};
};

/* Auto generate ID
var charConstructor = (function() {
  var nextId = 1;

   return function charConstructor(name, hp, ap) {
      this.id = nextId++;
      this.name = name;
      this.hp = hp;
      this.ap = ap;
      this.countAP = 1;
      this.attack = function(enemie) {
      	enemie.hp -= this.ap * this.countAP;
      	this.countAP++;
      };
      this.defense = function(enemie){
      	enemie.hp -= this.ap * 4; // still working on it.
      }	
   }
})();
 */

//= Declare Characters Here ==(id, name, Health Points, AttackPower)===
charactersArray.push(charConstructor("luke","luke Skywallker",100,5, "./assets/images/luke.png"));
charactersArray.push(charConstructor("obiWan","Obi-Wan Kenobi",120,8, "./assets/images/obiWan.png"));
charactersArray.push(charConstructor("dSidius","Darth Sidius",150,20, "./assets/images/dSidius.png"));
charactersArray.push(charConstructor("dMaul","Darth Maul",180,25, "./assets/images/dMaul.png"));
//=====================================================================

console.log(charactersArray);


for (var i = 0; i < charactersArray.length; i++){
	// create a container with id= "luke" class= "player"
	$("<div>").appendTo($(".row-characters")).addClass("character " + charactersArray[i].id);
	// create a <p> with a character name on it
	$("<p>").appendTo($("." + charactersArray[i].id)).text(charactersArray[i].name);
	// create a <img src"./assets/..."> inside a <div> just created above
	$("<img>").appendTo($("." + charactersArray[i].id)).attr("src",charactersArray[i].img);
	// create a <p> with character hp on it
	$("<p>").appendTo($("." + charactersArray[i].id)).text(charactersArray[i].hp);
}
/*
$("#characters").on("click", function(){
	this.ligthSide = true;

	for (var i = 0; i < charactersArray.length; i++){
		if (ligthSide !== true){
			// create a container with id= "luke" class= "player"
			$("<div>").appendTo($(".enemies")).addClass("player").attr("id",charactersArray[i].id);
			// create a <p> with a character name on it
			$("<p>").appendTo($("#" + charactersArray[i].id)).text(charactersArray[i].name);
			// create a <img src"./assets/..."> inside a <div> just created above
			$("<img>").appendTo($("#" + charactersArray[i].id)).attr("src",charactersArray[i].img);
			// create a <p> with character hp on it
			$("<p>").appendTo($("#" + charactersArray[i].id)).text(charactersArray[i].hp);
		}
	}





});

*/








