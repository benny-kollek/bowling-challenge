describe("BowlingGame Back End", function() {
  var game;

  beforeEach(function() {
    game = new BowlingGame();
  });

  it("is initialized with a total score of 0", function() {
    expect(game.score).toEqual(0);
  });

  it("is initialized with an array of 10 frames, each with score 0", function() {
    for(i=0;i<game.frames.length-1;i++){
      expect(game.frames[i]).toEqual(0);
    };
  });

  it("is at frame 1 when initialized", function() {
    expect(game.currentFrame).toEqual(1);
  });

  describe("when playing", function() {
    it("one can enter a score for the first frame", function() {
      game.enterScore(5)
      expect(game.frame(1)).toEqual(5);
    });

    it('is still on the same frame when first score is less than 10', function() {
      game.enterScore(5);
      expect(game.currentFrame).toEqual(1);
    });

    it('second roll on a frame adds to frame score', function() {
      game.enterScore(5);
      game.enterScore(3);
      expect(game.frame(1)).toEqual(8);
    });

    it('is on the second frame when first frame has been rolled twice', function() {
      game.enterScore(5);
      game.enterScore(3);
      expect(game.currentFrame).toEqual(2);
    });

    it('tells you when the game is over', function() {
      for(i=0;i<20;i++) {
        game.enterScore(4);
      };
      expect(game.gameOver).toEqual(true);
    });

    it('raises an error when trying to add score after game has finished', function() {
      for(i=0;i<20;i++) { game.enterScore(4); };
      expect(game.enterScore(5)).toEqual('Game is over, can not add score');
    });

    it('has the correct total score when the game is over', function() {
      for(i=0;i<20;i++){ game.enterScore(4); };
      expect(game.totalScore()).toEqual(80);
    });

    it('has the correct total score for a perfect game', function() {
      for(i=0;i<20;i++){ game.enterScore(10); };
      expect(game.totalScore()).toEqual(300);
    });

    describe("strike", function(){
      it('is on the second frame when first frame got a strike', function() {
        game.enterScore(10);
        expect(game.currentFrame).toEqual(2);
      });

      it('game is waiting for bonus from next frame', function() {
        game.enterScore(10);
        expect(game.takingStrikeBonus).toEqual(true);
      });

      it('game is waiting for bonus to add to frame with strike', function() {
        game.enterScore(10);
        expect(game.strikeFrame).toEqual(1);
      });

      it('game adds bonus to strike frame from next two rolls', function() {
        game.enterScore(10);
        game.enterScore(5);
        game.enterScore(3);
        expect(game.frame(1)).toEqual(18);
      });

      it('game adds normal score to frames while adding bonus score to previous frame', function() {
        game.enterScore(10);
        game.enterScore(5);
        game.enterScore(3);
        expect(game.frame(2)).toEqual(8);
      });

      it('game does not take strike bonus after two rolls', function() {
        game.enterScore(10);
        game.enterScore(5);
        game.enterScore(3);
        expect(game.currentFrame).toEqual(3);
        expect(game.takingStrikeBonus).toEqual(false);
        expect(game.strikeFrame).toEqual(null);
      });
    });

      describe("spare", function(){
        it('is on the second frame when first frame got a spare', function() {
          game.enterScore(6);
          game.enterScore(4);
          expect(game.currentFrame).toEqual(2);
        });

        it('game is waiting for bonus from next frame', function() {
          game.enterScore(6);
          game.enterScore(4);
          expect(game.takingSpareBonus).toEqual(true);
        });

        it('game is waiting for bonus to add to frame with spare', function() {
          game.enterScore(6);
          game.enterScore(4);
          expect(game.spareFrame).toEqual(1);
        });

        it('game adds bonus to strike frame from next roll', function() {
          game.enterScore(6);
          game.enterScore(4);
          game.enterScore(5);
          expect(game.frame(1)).toEqual(15);
        });

        it('game adds normal score to frames while adding bonus score to previous frame', function() {
          game.enterScore(6);
          game.enterScore(4);
          game.enterScore(5);
          game.enterScore(3);
          expect(game.frame(2)).toEqual(8);
        });

        it('game does not take spare bonus after first roll of next frame', function() {
          game.enterScore(6);
          game.enterScore(4);
          game.enterScore(5);
          game.enterScore(3);
          expect(game.currentFrame).toEqual(3);
          expect(game.takingSpareBonus).toEqual(false);
          expect(game.spareFrame).toEqual(null);
        });
    });
  });
});
