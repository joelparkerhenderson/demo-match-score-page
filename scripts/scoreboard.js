////
//
// Scoreboard component: area a.k.a. the table of scorecards
//
////

class ScoreboardComponent {
    constructor(id, scorecards, teams, fields, freeforms, tags) {
        this.id = id;
        this.scorecards = scorecards || [];
        this.teams = teams;
        this.fields = fields;
        this.freeforms = freeforms;
        this.tags = tags;
    }

    static idByScoreboard(scoreboard) {
        return "scoreboards[" + scoreboard.id + "]";
    }

    static idByScoreboardScore(scoreboard) {
        return "scoreboards[" + scoreboard.id + "].score`";
    }

    static idByScoreboardTeamFreeform(scoreboard, team, freeform) {
        return "scoreboards[" + scoreboard.id + "].teams[" + team.id + "].freeforms[" + freeform.id + "]";
    }
    
    static idByScoreboardTag(scoreboard, tag) {
        return "scoreboards[" + scoreboard.id + "].tags[" + tag.id + "]";
    }
    
    static idByScoreboardScorecardPartnerFreeform(scoreboard, scorecard, partner, freeform) {
        return "scoreboards.[" + scoreboard.id + "].scorecards[" + scorecard.id + "].partners[" + partner.id + "].freeforms[" + freeform.id + "]"
    }
    
    static idByScoreboardScorecardTag(scoreboard, scorecard, tag) {
        return "scoreboards.[" + scoreboard.id + "].scorecards[" + scorecard.id + "].tagScores[" + tag.id + "]"
    }

    static idByScoreboardScorecardScore(scoreboard, scorecard) {
        return "scoreboards.[" + scoreboard.id + "].scorecards[" + scorecard.id + "].score"
    }

    create() {
        return elementById(this.id).replaceChildren([this.create_table()]);
    }

    create_table() {
        let id = this.constructor.idByScoreboard(this);
        return element("TABLE").setId(id).appendChildren([this.create_thead(), this.create_tbody()]);
    }

    create_thead() {
        var thead = element("THEAD");
        thead.appendChild(this.create_thead_tr());
        return thead;
    }

    create_thead_tr() {
        var tr = element("TR");
        this.teams.forEach(team => {
            this.freeforms.forEach(freeform => {
                tr.appendChild(this.create_thead_tr_th_team_freeform(team, freeform));
            });
        });
        this.tags.forEach(tag => {
            tr.appendChild(this.create_thead_tr_th_tag(tag));
        });
        tr.appendChild(this.create_thead_tr_th_score());
        return tr;
    }

    create_thead_tr_th_team_freeform(team, freeform) {
        let id = this.constructor.idByScoreboardTeamFreeform(this, team, freeform);
        return element("TH").setId(id);
    }

    create_thead_tr_th_tag(tag) {
        let id = this.constructor.idByScoreboardTag(this, tag);
        return element("TH").setId(id);
    }

    create_thead_tr_th_score(tag) {
        let id = this.constructor.idByScoreboardScore(this);
        return element("TH").setId(id).setInnerHTML("+");
    }

    create_tbody() {
        var tbody = element("TBODY");
        this.scorecards.forEach(scorecard => {
            tbody.appendChild(this.create_tbody_tr(scorecard));
        });
        return tbody;
    }

    create_tbody_tr(scorecard) {
        var tr = element("TR");
        scorecard.partners.forEach(partner => {
            this.freeforms.forEach(freeform => {
                tr.appendChild(this.create_tbody_tr_td_scorecard_partner_freeform(scorecard, partner, freeform));
            });
        });
        this.tags.forEach(tag => tr.appendChild(this.create_tbody_tr_td_scorecard_tag(scorecard, tag)));
        tr.appendChild(this.create_tbody_tr_td_scorecard_score(scorecard));
        return tr;
    }

    create_tbody_tr_td_scorecard_partner_freeform(scorecard, partner, freeform) {
        let id = this.constructor.idByScoreboardScorecardPartnerFreeform(this, scorecard, partner, freeform);
        return element("TD").setId(id);
    }

    create_tbody_tr_td_scorecard_tag(scorecard, tag) {
        let id = this.constructor.idByScoreboardScorecardTag(this, scorecard, tag);
        return element("TD").setId(id);
    }

    create_tbody_tr_td_scorecard_score(scorecard) {
        let id = this.constructor.idByScoreboardScorecardScore(this, scorecard);
        return element("TD").setId(id);
    }

    render() {
        this.render_thead();
        this.render_tbody();
    }

    render_thead() {
        this.render_thead_tr(); 
    }

    render_thead_tr() {
        this.teams.forEach(team => {
            this.freeforms.forEach(freeform => {
                this.render_thead_tr_th_team_freeform(team, freeform);
            });
        });
        this.tags.forEach(tag => {
            this.render_thead_tr_th_tag(tag);
        });
    }

    render_thead_tr_th_team_freeform(team, freeform) {
        let id = this.constructor.idByScoreboardTeamFreeform(this, team, freeform);
        elementById(id).setInnerHTML(freeform.attributes.name);
    }

    render_thead_tr_th_tag(tag) {
        let id = this.constructor.idByScoreboardTag(this, tag);
        elementById(id).setInnerHTML(tag.attributes.name);
    }

    render_tbody() {
        this.scorecards.forEach(scorecard => this.render_tbody_tr(scorecard));
    }

    render_tbody_tr(scorecard) {
        scorecard.partners.forEach(partner => {
            this.freeforms.forEach(freeform => {
                this.render_tbody_tr_td_partner_freeform(scorecard, partner, freeform);
            });
        });
        this.tags.forEach(tag => {
            this.render_tbody_tr_td_tag(scorecard, tag);
        });
        this.render_tbody_tr_td_scorecard_score(scorecard);
    }

    render_tbody_tr_td_partner_freeform(scorecard, partner, freeform) {
        let id = this.constructor.idByScoreboardScorecardPartnerFreeform(this, scorecard, partner, freeform);
        elementById(id).setInnerHTML(partner.attributes[freeform.id]);
    }

    render_tbody_tr_td_tag(scorecard, tag) {
        let id = this.constructor.idByScoreboardScorecardTag(this, scorecard, tag);
        elementById(id).setInnerHTML(scorecard.tagToScore[tag.id]);
    }

    render_tbody_tr_td_scorecard_score(scorecard) {
        let id = this.constructor.idByScoreboardScorecardScore(this, scorecard);
        elementById(id).setInnerHTML(scorecard.score);
    }

}
