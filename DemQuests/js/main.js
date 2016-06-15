var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Bio', TopDownGame.Bio);
TopDownGame.game.state.add('Inicio', TopDownGame.Inicio);
TopDownGame.game.state.add('Dragon', TopDownGame.Dragon);
TopDownGame.game.state.add('PS', TopDownGame.PS);
TopDownGame.game.state.add('Play', TopDownGame.Play);

TopDownGame.game.state.start('Boot');