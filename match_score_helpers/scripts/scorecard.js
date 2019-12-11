////
//
// Scorecard: a scorecard binds a partner A and partner B, 
// and calculates a sum score and per tag score.
//
////

class Scorecard {
    constructor(id, partnerA, partnerB, tags) {
        this.id = id;
        this.partners = [partnerA, partnerB];
        this.partnerA = partnerA;
        this.partnerB = partnerB;
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
        let a = GatherComponent.idByPartnerField(this.partnerA, tag);
        let b = GatherComponent.idByPartnerField(this.partnerB, tag);
        let score = ScoreCalculator.byInputTextElementId(a, b);
        this.tagToScore[tag.id] = score;
        return score;
    }
}
