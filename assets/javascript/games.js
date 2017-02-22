var charList = [];

function charConstructor(pTag, name, hp, ap, img) {
	return{
		pTag: pTag,
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

function charDisplay (){
	//= Declare Characters Here ==(id, name, Health Points, AttackPower)===
	charList.push(charConstructor("luke","luke Skywallker",100,5, "./assets/images/luke.png"));
	charList.push(charConstructor("obiWan","Obi-Wan Kenobi",120,8, "./assets/images/obiWan.png"));
	charList.push(charConstructor("dSidius","Darth Sidius",150,20, "./assets/images/dSidius.png"));
	charList.push(charConstructor("dMaul","Darth Maul",180,25, "./assets/images/dMaul.png"));
	//=====================================================================
	for (var i = 0; i < charList.length; i++){
		var playerDiv;
		
		playerDiv = $("<div class='character'>")
			.addClass(charList[i].tag);
		playerDiv
			.append($("<p>").text(charList[i].name));
		playerDiv
			.append($("<img>").attr("src",charList[i].img));
		playerDiv
			.append($("<p>").text("HP - " + charList[i].hp));

		charList[i].$me = playerDiv;

		$(".character-container").append(charList[i].$me);
	}
}

/*========================= Logic ===========================*/
charDisplay();









console.log(charList);