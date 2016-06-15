var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Bio = function(){};
var shotTimer = 0;
	var idle = 0;
var gameStart = false;
TopDownGame.Bio.prototype = {

  create: function() {
    this.gameStart = true;
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.startSystem(Phaser.Physics.P2JS); 
	this.game.physics.p2.setImpactEvents(true);
    this.map = this.game.add.tilemap('biomap1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('bio_base1', 'bio1');


    //create layer
    this.backgroundlayer = this.map.createLayer('capa1');
	this.game.physics.enable(this.backgroundlayer, Phaser.Physics.ARCADE);


    //collision on blockedLayer
	  this.array2 = [[2675,2748], [11775,11834], [10660,10716], [5501,5536]];
	for (var i = 0; i<this.array2.length; i++){
		this.map.setCollisionBetween(this.array2[i][0],this.array2[i][1]);
	}

		this.zona1 = 2675;
		this.zona2 = 5536;
		for (var i = 14; i<80; i++){	
			this.map.setCollision(this.zona1);
			this.map.setCollision(this.zona2);
			this.zona1 +=140;
			this.zona2 +=140;
			
		}
	//this.map.setCollision(10665);
	//this.map.setCollision(1759, this.blockedLayer);
		//this.blockedLayer.getTiles(0, 0, this.blockedLayer.layer.widthInPixels, this.blockedLayer.layer.heightInPixels);
	this.backgroundlayer.debug = true;

/*	for (var i = 0; i<this.array.length; i++){
			this.map.setCollision(i);
	}*/

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    
 //create player
    this.result = this.findObjectsByType('playerStart', this.map, 'objetos')
    this.player = this.game.add.sprite(this.result[0].x, this.result[0].y, window.player);
    this.game.physics.arcade.enable(this.player);
	        //  This adjusts the collision body size.
		//this.player.body.setSize(43, 43, 0, 0);
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.player.body.collideWorldBounds = true;
	
    this.enemies = this.game.add.group();
	////CREAR ENEMIGOS
   // this.enemy = this.enemies.create(460, 460, 'enemy1');
	for (var i = 1; i < 17; i++) {
		this.temp = 'enemy'+i;
		this.temp.toString();
		this.result = this.findObjectsByType(this.temp, this.map, 'objetos');
		this.enemy = this.enemies.create(Math.round(this.result[0].x), Math.round(this.result[0].y), 'enemy');
	} 
	
	//this.enemy = this.enemies.create(260, 360, 'enemy1');
	//this.add.existing(this.enemy);
		//this.enemy = this.enemies.create(490, 465, 'player1');
	 	this.game.physics.arcade.enable(this.enemies, Phaser.Physics.ARCADE);
    //  Our bullet group
    this.bullets = this.game.add.group();
	this.game.physics.arcade.enable(this.bullets, Phaser.Physics.ARCADE);

    this.player.anchor.setTo(0.5, 1);
	this.player.animations.add('left', [9, 11, 9, 10], 10, true);
    this.player.animations.add('right', [3, 5, 3, 4], 10, true);
	this.player.animations.add('up', [6, 8, 6, 7], 10, true);
	this.player.animations.add('down', [0, 2, 0, 1], 10, true);
//////////////
for (var i = 0; i < this.enemies.children.length; i++) {
	this.enemies.children[i].animations.add('lefty', [9, 11, 9, 10], 10, true);
    this.enemies.children[i].animations.add('righty', [3, 5, 3, 4], 10, true);
	this.enemies.children[i].animations.add('upy', [6, 8, 6, 7], 10, true);
	this.enemies.children[i].animations.add('downy', [0, 2, 0, 1], 10, true);
}
//////////
	
    //the camera will follow the player in the world
    this.game.camera.follow(this.player);
	window.tex = 'Toms';
	this.t = this.game.add.text(this.player.x-125, this.player.y-750, window.tex, { font: "10px Arial", fill: "#ffffff", align: "center" });
    
	this.t.fixedToCamera = true;
    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
	this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object

  /////////////////////////////////UPDATE////////////////////////////////////
  update: function() {
    //collision
	this.game.physics.arcade.collide(this.player, this.backgroundlayer);
	this.game.physics.arcade.collide(this.enemies, this.backgroundlayer);
	//this.game.physics.arcade.collide(this.enemies, this.player);
	//this.game.physics.arcade.overlap(bullets, goblinSprite, this.bulletHitEnemy, null, this);

	//this.game.physics.arcade.overlap(this.bullet, this.enemy, function(enemy, bullet) {   this.enemy.kill();    this.bullet.kill();}, null, this);

	
	for (var i = 0; i < this.enemies.children.length; i++) {
		if (this.game.physics.arcade.collide(this.player, this.enemies.children[i])){
			this.GameOver();
		}
        
		else if (this.game.physics.arcade.collide(this.bullet, this.enemies.children[i])){
			this.enemies.children[i].kill();
			this.bullet.kill();
		}
	}
	

    //player movement
    this.player.body.velocity.x = 0;
	this.player.body.velocity.y = 0;

    if(this.cursors.up.isDown) {
      this.player.animations.play('up');
      if(this.player.body.velocity.y == 0){
		this.player.body.velocity.y -= 100;
		this.idle = 6;
	  }
    }
    else if(this.cursors.down.isDown) {
	this.player.animations.play('down');
      if(this.player.body.velocity.y == 0){
	  this.player.body.velocity.y += 100;
	  this.idle = 0;
	  }
    }

    else if(this.cursors.left.isDown) {
      this.player.animations.play('left');
      this.player.body.velocity.x -= 100;
	  this.idle = 9;
    }
	
    else if(this.cursors.right.isDown) {
      this.player.animations.play('right');
      this.player.body.velocity.x += 100;
	  this.idle = 3;
    }
		else{
	        //  Stand still
			this.player.animations.stop();
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
			this.player.frame = this.idle;
		}
	////////////////////////

    //ENEMY movement



	
	//////////////////////////	
  	if (this.spaceKey.isDown){
	//	this.shoot = this.game.add.audio('shoot');            
	//	this.shoot.play();
       	 	this.fire();
    }
		
    if (this.gameStart === true)
    {
        //  First is the callback
        //  Second is the context in which the callback runs, in this case game.physics
        //  Third is the parameter the callback expects - it is always sent the Group child as the first parameter
        //enemies.forEach(game.physics.moveToPointer, game.physics, false, 100);
//this.enemies.forEach(function(enemy){    this.game.physics.arcade.moveToObject(this.enemy, {x: this.player.x, y:this.player.y},100, this);}, this);
this.velocidad = [];
 for (var a = 0; i < this.enemies.children.length; a++) { 
		this.velocidad[a] =  Math.floor((Math.random() * 150) + 50);
}
    for (var i = 0; i < this.enemies.children.length; i++) { 

        this.game.physics.arcade.moveToObject(this.enemies.children[i] , {x: this.player.x, y:this.player.y}, this.velocidad[i]);
        this.enemy = this.enemies.children[i];

 
    }
        // Sweet orbiting thing
       /** enemies.forEach(function(enemie) 
            {
                this.accelerateToObject(enemie, player, 600, 250, 250);
            }, game.physics);**/

	}

for (var i = 0; i < this.enemies.children.length; i++) {
	this.enemy = this.enemies.children[i];
    		 if (this.enemy.body.velocity.x > 0 && this.enemy.body.velocity.y >0) {
				this.enemy.animations.play('righty');
			} 
				else if (this.enemy.body.velocity.x < 0 && this.enemy.body.velocity.y < 0){
					this.enemy.animations.play('lefty');
				}
						else if (this.enemy.body.velocity.y < 0 && this.enemy.body.velocity.x > 0){
						this.enemy.animations.play('upy');
						}
							else if (this.enemy.body.velocity.y > 0 && this.enemy.body.velocity.x < 0){
									  this.enemy.animations.play('downy');
							}
}


  },
  
  fire: function() {

if (shotTimer < this.game.time.now){
	shotTimer = this.game.time.now + 500;
	this.bullet = this.bullets.create(this.player.body.x + this.player.body.width /2 + 10, this.player.body.y + this.player.body.height / 2 -4, 'bullet');
		this.game.physics.arcade.enable(this.bullet, Phaser.Physics.ARCADE);
		this.bullet.anchor.setTo(0.5, 0.3);
		if (this.idle == 9){this.bullet.angle +=180;this.bullet.body.velocity.x = -250;}//left
		if (this.idle == 3){this.bullet.angle +=360;this.bullet.body.velocity.x = 250;}//derexa pisha
		if (this.idle == 6){this.bullet.body.velocity.y = -250;this.bullet.angle +=270;}//UP
		if (this.idle == 0){this.bullet.body.velocity.y = 250;this.bullet.angle +=90;}//DOWN

}
},
//collisionHandler: function (bullets, enemy){this.bullets.sprite.kill();//this.enemy.kill();},
GameOver: function(){

      this.game.paused = true;
    
    	for (var i = 0; i < this.enemies.children.length; i++) {
            if (this.game.physics.arcade.collide(this.player, this.enemies.children[i])){
                  this.enemies.children[i].body.moves = false;
                  this.enemies.children[i].animations.stop();;
            }
        }
    this.player.body.unmob
            this.game.paused = false;
           // this.player.body.mmovable = true;
            this.player.body.moves = false;

    /////
	    this.game_over = this.game.add.sprite(this.player.x-250, this.player.y-100, 'gameover');
  	    this.play_again = this.game.add.sprite(this.player.x-300, this.player.y-100, 'playagain');
            this.play_again.frameName = 'playagain.png';
            this.play_again.inputEnabled = true;
            this.play_again.input.pixelPerfectClick = true;
            this.play_again.events.onInputDown.add(this.clicked, this);
   	},
    
    clicked: function (sprite) {
      
    this.state.start('Bio');

    },
    
};
