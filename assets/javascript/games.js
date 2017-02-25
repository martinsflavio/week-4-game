var charList = [];
var playerChosed = false;
var cpuChosed = false;
var player = {};
var cpu = {};
var winCount = 1;

//--------------------------
function charConstructor(name, hp, ap, countA, img) {
	return{
		id: 0,
		name: name,
		hp: hp,
		ap: ap,
		countA: countA,
		img: img,
		$me:"",
		chosed: false,
		rounds: 1,
		attack: function(enemie) {
			this.totalPower = this.ap * this.rounds;
			enemie.hp -= this.totalPower;
			this.rounds++;
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},
		defend: function(enemie){
			enemie.hp -= countA;
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},
		totalPower: 0,		
	};
};
//--------------------------
function charDisplay (){
	//= Declare Characters Here ==(id, name, Health Points, AttackPower)===
	charList.push(charConstructor("Qui Gon Jinn",100,5,5, "./assets/images/quiGonJinn.png"));
	charList.push(charConstructor("Darth Maul",120,8,6, "./assets/images/dMaul.png"));
	charList.push(charConstructor("Count Dooku",150,10,4, "./assets/images/dooku.png"));
	charList.push(charConstructor("Anakin Skywallker",180,20,4, "./assets/images/luke.png"));
	charList.push(charConstructor("General Grievous",170,25,3, "./assets/images/gGrievous.png"));
	charList.push(charConstructor("Obi-Wan Kenobi",180,15,5, "./assets/images/obiWan.png"));

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

	//============ Music Player ============= 
	$("#audio").on("click", function() {
	 if (theme.paused == false) {
	   theme.pause();
	   $("#status").attr("class","glyphicon glyphicon-volume-off");
	 } else {
	   theme.play();
	   	$("#status").attr("class","glyphicon glyphicon-volume-up");

	 }
	});

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
		
		//fight
		if (player.hp > 0 && cpu.hp > 0){
				player.attack(cpu);
				cpu.defend(player);
			$(".player").find(".hp").text("HP : " + player.hp);
			$(".cpu").find(".hp").text("HP : " + cpu.hp);
			$("#dialog-box1").text(player.name+" Attack "+cpu.name+" for "+player.totalPower+" points of Damage!");
			$("#dialog-box2").text(cpu.name+" Attack back "+player.name+" for "+cpu.ap+" points of Damage!");
			
			// cpu win = Game Over
			if(player.hp <= 0 ){
				$("#dialog-box1").text("GAME OVER!");
				$("#dialog-box2").text("Press Restart to play one more time.");
			
			// player win = Chose another opponent		
			}else if (cpu.hp <= 0){	
				$("#dialog-box1").text("YOU WIN!");
				$("#dialog-box2").text("Enemie defeated, chose another one.");
				cpuChosed = false;
				$(".cpu").attr("class", "dead");
				$("#trash").append($(".dead"));
				winCount++;
			}
		}


		// display winning message
		if(winCount === charList.length){

			$("#character-container").append(winFlag());
			$("#dialog-box1").empty();
			$("#dialog-box2").empty();
		}
	});

	//============ Restart Game ============
	$("#btn-restart").on("click", function(){
		charList = [];
		playerChosed = false;
		cpuChosed =false;
		player = {};
		cpu = {};
		winCount = 1;
		$("#cpu").empty();
		$("#player").empty();
		$("#trash").empty();
		$("#character-container").empty();
		$("#dialog-box1").empty();
		$("#dialog-box2").empty();
		charDisplay();
	});

	var theme = new Audio("./assets/audio/theme.mp3");
	theme.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	theme.play();
	theme.volume = 0.1;
});




