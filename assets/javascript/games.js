var charList = [];
var playerChosed = false;
var cpuChosed =false;
var player;
var cpu;

function charConstructor(name, hp, ap, img) {
	return{
		id: 0,
		name: name,
		hp: hp,
		ap: ap,
		countAP: 1,
		img: img,
		$me:"",
		attack: function(enemie) {
			enemie.hp -= this.ap * this.countAP;
			this.countAP++;
		},
		defend: function(enemie){
			enemie.hp -= this.ap * 4; // still working on it.
		},		
	};
};
//--------------------------
function charDisplay (){
	//= Declare Characters Here ==(id, name, Health Points, AttackPower)===
	charList.push(charConstructor("luke Skywallker",100,5, "./assets/images/luke.png"));
	charList.push(charConstructor("Obi-Wan Kenobi",120,8, "./assets/images/obiWan.png"));
	charList.push(charConstructor("Darth Sidius",150,20, "./assets/images/dSidius.png"));
	charList.push(charConstructor("Darth Maul",180,25, "./assets/images/dMaul.png"));
	//=====================================================================
	for (var i = 0; i < charList.length; i++){
		var character;
		charList[i].id = i;

		character = $("<li class='character-list'>")
			.attr("id",charList[i].id);
		character
			.append($("<p>").text(charList[i].name));
		character
			.append($("<img>").attr("src",charList[i].img));
		character
			.append($("<p>").text("HP - " + charList[i].hp));

		charList[i].$me = character;

		$(".character-container").append(charList[i].$me);
	}
}
//--------------------------
function fight(pl1,pl2){
	pl1.attack(pl2);
	pl2.defend(pl1);
}

/*========================= Logic ===========================*/
charDisplay();

$(document).ready( function(){

	$(".character-list").on("click", function(){
		var id = parseInt($(this).attr("id"));

		if (!playerChosed){
			$(this).attr("class", "player");
			player = charList[id];
			playerChosed = true;
			$("#player").append(charList[id].$me);
		}else if (!cpuChosed){
			$(this).attr("class", "cpu");
			cpu = charList[id];
			cpuChosed = true;
			$("#cpu").append(charList[id].$me);
		}

		
	});
});








console.log(charList);