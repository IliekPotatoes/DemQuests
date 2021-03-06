var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

 //   //MAPAS JSON
    this.load.tilemap('inicial', 'assets/tilemaps/inicio.json', null, Phaser.Tilemap.TILED_JSON);
	this.load.tilemap('biomap1', 'assets/tilemaps/Bio1.json', null, Phaser.Tilemap.TILED_JSON);
	this.load.tilemap('dragonmap1', 'assets/tilemaps/Dragon1.json', null, Phaser.Tilemap.TILED_JSON);
	//BIO
    this.load.image('bio1', 'assets/images/biosurvive/bio_base1.png');
	//PLAYERSELECT
	this.load.image('player1', 'assets/images/ps/kakashi.png');
	this.load.image('player2', 'assets/images/ps/warrior.png');
	//Dragon
    this.load.image('drake1', 'assets/images/dragon/dragon1.png');
	//Inicio
    this.load.image('gameTiles', 'assets/images/inicio/inicial.png');
	//DISPAROS
	this.load.image('bullet', 'assets/images/bullet.png');
	//Jugadores
	this.game.load.spritesheet('player_2', 'assets/images/player2.png', 43, 43);
	this.game.load.spritesheet('player_1', 'assets/images/player.png', 43, 43);
	//ENEMIGOS
	this.game.load.spritesheet('enemy', 'assets/images/enemy1.png', 43, 43);  
	//AUDIO
	this.game.load.audio('shoot', 'assets/audio/shoot.ogg');
	//GAMEOVER
	this.game.load.image('gameover', 'assets/images/gameover.png');
	this.game.load.image('playagain', 'assets/images/playagain.png');
	
	//DEMQUESTS
	this.load.image('demquests', 'assets/images/ps/demquests.png');
	this.load.image('backgroundI', 'assets/images/ps/backgroundI.jpg');
	//GAMESELECTION
	this.load.image('dragon', 'assets/images/inicio/dragon.jpg');
	this.load.image('biosurvive', 'assets/images/inicio/biosurvive.jpg');	
	///PlayButton
	this.load.image('playbutton', 'assets/images/ps/play.png');	
  },
  create: function() {
    //this.state.start('Bio');
	this.state.start('Play');
  }
};
