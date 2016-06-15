var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.PS = function(){};
	var idle = 0;
//	window.playerselected = '';
TopDownGame.PS.prototype = {

  create: function() {

	    this.kakashi = this.game.add.sprite(50, 50, 'player1');
            this.kakashi.frameName = 'kakashi.png';
            this.kakashi.inputEnabled = true;
            this.kakashi.input.pixelPerfectClick = true;
            this.kakashi.events.onInputDown.add(this.clicked, this);
			
	    this.warrior = this.game.add.sprite(50, 320, 'player2');
            this.warrior.frameName = 'warrior.png';
            this.warrior.inputEnabled = true;
            this.warrior.input.pixelPerfectClick = true;
            this.warrior.events.onInputDown.add(this.clicked2, this);

   
   	},
clicked: function () {
	window.player = 'player_1';
    this.state.start('Inicio');

    },
	
clicked2: function () {
	window.player = 'player_2';
    this.state.start('Inicio');

    },

  /////////////////////////////////UPDATE////////////////////////////////////

};
