////
//
// Scorecard: a scorecard binds a maker and taker, 
// and calculates a sum score and per tag score.
//
////

class Scorecard {
    constructor(id, maker, taker, tags) {
        this.id = id;
        this.partners = [maker, taker];
        this.maker = maker;
        this.taker = taker;
        this.score = 0;
        this.tags = tags;
        this.tagToScore = {};
        this.tags.forEach(tag => this.tagToScore[tag.id] = 0); // TODO reduce
    }

    calc() {
        this.score = this.tags.reduce((score, tag) => score += this.calcTagToScore(tag), 0);
    }

    // TODO optimize by changing from storing values as HTML inputs, to storing values closer.
    calcTagToScore(tag) {
        var m = elementById(GatherComponent.idByPartnerField(this.maker, tag)).value
        var t = elementById(GatherComponent.idByPartnerField(this.taker, tag)).value
        var score = ScoreCalculator.byString(m, t);
        this.tagToScore[tag.id] = score;
        return score;
    }
}
