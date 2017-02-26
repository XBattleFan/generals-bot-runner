var assert = require('assert');
var should = require('should');

var GeneralsGame = require('../models/generals_game');

describe('Game', function() {
    
    beforeEach(function(){
        this.map = {
                    width: 3,
                    height: 2,
                    size: 6,
                    strengths: [1,0,4,0,0,0],
                    owners: [0,-1,1,-1,-1,-1],
                    rows: [[0,1,2],[3,4,5]],
                    step: 0
                }
        this.game = new GeneralsGame()
    })
    
    
    describe('Growth', function() {
        describe('Plain Squares', function() {
            it("should grow plain squares every 50 steps", function(){
                this.map.strengths[0].should.equal(1)
                this.map.step = 49
                this.game.doStep(this.map, [])
                this.map.strengths[0].should.equal(2)
            })
            
            it("should not grow otherwise", function(){
                this.map.strengths[0].should.equal(1)
                
                this.map.step = 48
                this.game.doStep(this.map, [])
                this.map.strengths[0].should.equal(1)
                
                this.map.step = 50
                this.game.doStep(this.map, [])
                this.map.strengths[0].should.equal(1)
            })
            
        })
    })
    
    describe('Movement', function() {
        it("should capture an empty neutral square", function(){
            // Have the 4 strength square in the upper left capture the adjacent neutral square
            this.game.doStep(this.map, [null, [2,1]])
            this.map.strengths[2].should.equal(1) // One stays behind
            this.map.strengths[1].should.equal(3) // Three go to the captured square
            this.map.owners[1].should.equal(1) // Destination should be captured
        })
    })
})