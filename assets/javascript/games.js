var charList = [];
var playerChosed = false;
var cpuChosed = false;
var player = {};
var cpu = {};
var winTest = false;

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
			totalAP = this.ap * this.countAP;
			enemie.hp -= totalAP;
			this.countAP++;
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},
		totalAP: 0,
		defend: function(enemie){
			totalDP = this.ap * 2;
			enemie.hp -= totalDP; // still working on it.
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},
		totalDP: 0		
	};
};
//--------------------------
function charDisplay (){
	//= Declare Characters Here ==(id, name, Health Points, AttackPower)===
	charList.push(charConstructor("Anakin Skywallker",170,8, "./assets/images/luke.png"));
	charList.push(charConstructor("Obi-Wan Kenobi",180,8, "./assets/images/obiWan.png"));
	charList.push(charConstructor("Darth Maul",160,13, "./assets/images/dMaul.png"));
	charList.push(charConstructor("Count Dooku",200,13, "./assets/images/dooku.png"));
	charList.push(charConstructor("Qui Gon Jinn",150,13, "./assets/images/quiGonJinn.png"));

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
			.append($("<p class='hp'>").text("HP : " + charList[i].hp));

		charList[i].$me = character;

		$("#character-container").append(charList[i].$me);
	}
}
//--------------------------
function winFlag (){
	var result;
	var array = [];

	var yoda ="./assets/images/win/yoda";
	var winFlag = ['"Do. Or do not. There is no try."',
	'"Luminous beings are we... not this crude matter."',
	'"Wars not make one great."',
	'"Fear is the path to the dark side... fear leads to anger... anger leads to hate... hate leads to suffering."',
	'"Judge me by my size, do you?"',
	'"Adventure. Excitement. A Jedi craves not these things."',
	'"A Jedi uses the Force for knowledge and defense, never for attack."',
	'"Truly wonderful, the mind of a child is."',
	'"When nine hundred years old you reach, look as good you will not."'];

	//randon phrase
	array[0] = winFlag[Math.floor(Math.random() * winFlag.length)]
	//randon relative path from 1 to 3
	array[1] = yoda + [Math.floor(Math.random() * 3)] +".png";
	
	result = $("<li class='winFlag'>");
	result.append($("<img class= winFlag-img>").attr("src",array[1]));
	result.append($("<p class= winFlag-text>").text(array[0]));

	return result;
}
/*========================= Logic ===========================*/


$(document).ready( function(){
	
	charDisplay();
	//===== Chosing Characters=========
	$("#character-container").on("click", ".character-list", function(){
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
			charList[id].chosed = true;

			$("#cpu").append(charList[id].$me);
		}
	});

	//======= Fignt Table ================
	$("#btn-attack").on("click", function(){
		
		if (player.hp > 1 && cpu.hp > 1){
				player.attack(cpu);
				cpu.defend(player);
			$(".player").find(".hp").text("HP : " + player.hp);
			$(".cpu").find(".hp").text("HP : " + cpu.hp);
			$("#dialog-box1").text(player.name+" Attack "+cpu.name+" for "+totalAP+" points of Damage!");
			$("#dialog-box2").text(cpu.name+" Attack back "+player.name+" for "+totalDP+" points of Damage!");
		}
	
		if(player.hp < 1 ){
			$("#dialog-box1").text("GAME OVER!");
			$("#dialog-box2").text("Press Restart to play one more time.");
		}else if (cpu.hp < 1){
			$("#dialog-box1").text("YOU WIN!");
			$("#dialog-box2").text("Enemie defeated, chose another one.");
			cpuChosed = false;
			$(".cpu").attr("class", "dead");
			$("#trash").append($(".dead"));
		}

		//display wining message
		/*if (){
			
		}
		*/
		$("#character-container").find(".character-list")
			winTest = true;
		});

		if(winTest){
			$("#character-container").append(winFlag());
		}


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
		
		charDisplay();
	});
});




