var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Inicio = function(){};
	var idle = 0;
TopDownGame.Inicio.prototype = {

  create: function() {
	      this.game.stage.backgroundColor = null;
    this.map = this.game.add.tilemap('inicial');
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('inicio', 'gameTiles');


    //create layer
    this.backgroundlayer = this.map.createLayer('capa1');
	this.game.physics.enable(this.backgroundlayer, Phaser.Physics.ARCADE);


    //collision on blockedLayer
	/*  this.array2 = [[2675,2748], [11775,11834], [10660,10716], [5501,5536]];
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
			
		}*/
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
	if (window.player=='player_1'){
    this.player = this.game.add.sprite(this.result[0].x, this.result[0].y, 'player_1');
	}
	else{
		this.player = this.game.add.sprite(this.result[0].x, this.result[0].y, 'player_2');
	}
    this.game.physics.arcade.enable(this.player);
	        //  This adjusts the collision body size.
		//this.player.body.setSize(43, 43, 0, 0);
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.player.body.collideWorldBounds = true;
    //  Our bullet group
  

    this.player.anchor.setTo(0.5, 1);
	this.player.animations.add('left', [9, 11, 10], 10, true);
    this.player.animations.add('right', [3, 5, 4], 10, true);
	this.player.animations.add('up', [6, 8, 7], 10, true);
	this.player.animations.add('down', [0, 2, 1], 10, true);
//////////////
			this.kakashi = this.game.add.sprite(370, 460, 'biosurvive');
            this.kakashi.frameName = 'biosurvive.jpg';
            this.kakashi.inputEnabled = true;
            this.kakashi.input.pixelPerfectClick = true;
            this.kakashi.events.onInputDown.add(this.biosurvive, this);
			
			this.warrior = this.game.add.sprite(470, 460, 'dragon');
            this.warrior.frameName = 'dragon.jpg';
            this.warrior.inputEnabled = true;
            this.warrior.input.pixelPerfectClick = true;
            this.warrior.events.onInputDown.add(this.dragon, this);
	
    //the camera will follow the player in the world
    //this.game.camera.follow(this.player);

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
  },   
  dragon: function(){
	      this.state.start('Dragon');
	  
  },
  biosurvive: function(){
	  
	      this.state.start('Bio');
  },
};