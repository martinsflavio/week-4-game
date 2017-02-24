var charList = [];
var playerChosed = false;
var cpuChosed = false;
var player = {};
var cpu = {};
//--------------------------
function charConstructor(name, hp, ap, img) {
	return{
		id: 0,
		name: name,
		hp: hp,
		ap: ap,
		countAP: 1,
		img: img,
		$me:"",
		chosed: false,
		attack: function(enemie) {
			enemie.hp -= this.ap * this.countAP;
			this.countAP++;
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},
		defend: function(enemie){
			enemie.hp -= this.ap * 2; // still working on it.
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},		
	};
};
//--------------------------
function charDisplay (){
	//= Declare Characters Here ==(id, name, Health Points, AttackPower)===
	charList.push(charConstructor("luke Skywallker",100,5, "./assets/images/luke.png"));
	charList.push(charConstructor("Obi-Wan Kenobi",120,8, "./assets/images/obiWan.png"));
	charList.push(charConstructor("Darth Sidius",150,12, "./assets/images/dSidius.png"));
	charList.push(charConstructor("Darth Maul",180,13, "./assets/images/dMaul.png"));
	//=====================================================================
	for (var i = 0; i < charList.length; i++){
		var character;
		charList[i].id = i;

		character = $("<li class='character-list'>")
			.attr("id",charList[i].id);
		character
			.append($("<p class='name'>").text(charList[i].name));
		character
			.append($("<img>").attr("src",charList[i].img));
		character
			.append($("<p class='hp'>").text("HP - " + charList[i].hp));

		charList[i].$me = character;

		$("#character-container").append(charList[i].$me);
	}
}
/*========================= Logic ===========================*/
charDisplay();

$(document).ready( function(){

	//===== Chosing Characters=========
	$(".character-list").on("click", function(){
		var id = parseInt($(this).attr("id"));

		if (!playerChosed){
			$(this).attr("class", "player");
			player = charList[id];
			playerChosed = true;
			charList[id].chosed = true;
			$("#player").append(charList[id].$me);
		}else if (!cpuChosed && !charList[id].chosed){
			$(this).attr("class", "cpu");
			cpu = charList[id];
			cpuChosed = true;

			$("#cpu").append(charList[id].$me);
		}
	});

	//======= Fignt Table ================
	$("#btn-attack").on("click", function(){

		player.attack(cpu);
		cpu.defend(player);



		if(player.hp < 1 ){
			console.log("game over");
		}else if (cpu.hp < 1){
			console.log("enemie defeated, chose another one.");
			cpuChosed = false;
			$("#trash").append($(".cpu"));
		}

		console.log(player);
		console.log(cpu);
	});

	//============ Restart Game ============
	$("#btn-restart").on("click", function(){
		charList = [];
		playerChosed = false;
		cpuChosed =false;
		player = {};
		cpu = {};
		$("#cpu").empty();
		$("#player").empty();
		$("#trash").empty();
		$("#character-container").empty();
		charConstructor();
		charDisplay();
	});

});








console.log(charList);