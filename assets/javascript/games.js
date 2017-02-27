var charList = [];
var playerChosed = false;
var cpuChosed = false;
var player = {};
var cpu = {};
var winCount = 1;

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
		// display special button
		if (player.OKSpecial){
			$("#btn-special").css({"display":"block"})
		}
		//fight
		if (player.hp > 0 && cpu.hp > 0){
				player.attack(cpu);
				cpu.defend(player);
			$("#dialog-box1, dialog-box2, #dialog-box3").empty();
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
			$("#dialog-box1, dialog-box2, dialog-box3").empty();
		}
	});

	//======= Especial Attack ================	
	$("#btn-special").on("click", function(){	
		if (player.OKSpecial){
			player.specialAttack();
			console.log("specialAttack unlocked");
			$(".player").find(".hp").text("HP : " + player.hp);
			$("#dialog-box3").text("Increasing HP!");
			$("#btn-special").css({"display":"none"})

			
		}
		console.log("button clicked");
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
	theme.volume = 0.5;
});

/*========================= Functions ===========================*/

//------------- Object constructor -------------
function charConstructor(name, hp, ap, countA, sLevel, unlockSpecial, img) {
	return{
		id: 0,
		name: name,
		hp: hp,
		ap: ap,
		countA: countA,
		img: img,
		$me:"",
		sLevel: sLevel,
		unlockSpecial: unlockSpecial,
		//======== Logic Section ==============
		chosed: false,
		rounds: 1,
		sCounter: 0,
		OKSpecial: false,
		totalPower: 0,
		//Special Attack
		specialAttack: function(){
			this.hp += this.sLevel;
			this.sCounter = 0;
			this.OKSpecial = false;
		},
		// Attack
		attack: function(enemie) {
			this.totalPower = this.ap * this.rounds;
			enemie.hp -= this.totalPower;
			this.rounds++;
			this.sCounter++;
			// Activate Special attack method
			if (this.sCounter === this.unlockSpecial){
				this.OKSpecial = true;
			}
			// Enemie Dead
			if (enemie.hp < 1){
				enemie.live = false;
			}
		},
		// Defend
		defend: function(enemie){
			enemie.hp -= countA;
			if (enemie.hp < 1){
				enemie.live = false;
			}
		}		
	};
};
//--------------------------
function charDisplay (){
	//= Declare Characters Here ==(name - HP - AttackP - CountAttack - sLevel - unlockSpecial - Image)=
	charList.push(charConstructor("Qui Gon Jinn",100,8,8,40,10,"./assets/images/quiGonJinn.png"));
	charList.push(charConstructor("Darth Maul",120,8,8,20,10,"./assets/images/dMaul.png"));
	charList.push(charConstructor("Count Dooku",140,10,5,15,10,"./assets/images/dooku.png"));
	charList.push(charConstructor("Anakin Skywallker",178,10,5,15,10,"./assets/images/luke.png"));
	charList.push(charConstructor("General Grievous",170,25,8,13,18,"./assets/images/gGrievous.png"));
	charList.push(charConstructor("Obi-Wan Kenobi",180,40,25,5,20,"./assets/images/obiWan.png"));

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

/*==============================================================*/


