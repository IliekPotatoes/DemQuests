var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Play = function(){};

TopDownGame.Play.prototype = {

  create: function() {
		this.background = this.game.add.sprite(0, 0, "backgroundI");
	    this.demquests = this.game.add.sprite(170, 50, 'demquests');
            this.demquests.frameName = 'demquests.png';
            this.demquests.inputEnabled = true;
            this.demquests.input.pixelPerfectClick = true;
	    this.demquests.scale.setTo(0.5, 0.5);

	    this.jugar = this.game.add.sprite(170, 250, 'playbutton');
            this.jugar.frameName = 'play.png';
            this.jugar.inputEnabled = true;
            this.jugar.input.pixelPerfectClick = true;
            this.jugar.events.onInputDown.add(this.play, this);			
   	},

	play: function (sprite) {

	    this.state.start('PS');

	    },
	

  /////////////////////////////////UPDATE////////////////////////////////////

};
