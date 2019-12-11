////
//
// Gather component: a major page area that gathers input for makers or takers.
//
////

class GatherComponent {
    constructor(id, team, fields, freeforms, tags, partners) {
        this.id = id;
        this.team = team;
        this.fields = fields;
        this.freeforms = freeforms;
        this.tags = tags;
        this.partners = partners;
    }

    static idByGatherTeam(gather, team) {
        return "gathers[" + gather.id + "].teams[" + team.id + "]"; 
    }

    static idByGatherTeamField(gather, team, field) {
        return "gathers[" + gather.id + "].teams[" + team.id + "].fields[" + field.id + "]"; 
    }

    static idByPartnerField(partner, field) {
        return "partners[" + partner.id + "].fields[" + field.id + "]"; 
    }

    create() {
        return elementById(this.team.id).replaceChildren([this.create_table()]);
    }
    
    create_table() {
        let id = this.constructor.idByGatherTeam(this, this.team);
        return element("TABLE").setId(id).appendChildren([this.create_thead(), this.create_tbody()]);
    }

    create_thead() {
        var thead = element("THEAD");
        thead.appendChild(this.create_thead_tr());
        return thead;
    }

    create_thead_tr() {
        var tr = element("TR");
        this.fields.forEach(field => tr.appendChild(this.create_thead_tr_th(field)));
        return tr;
    }

    create_thead_tr_th(field) {
        return element("TH").setInnerHTML(this.create_thead_tr_th_html(field));
    }

    create_thead_tr_th_html(field) {
        return "<input id=\"" + this.constructor.idByGatherTeamField(this, this.team, field) + "\" type=\"text\" size=\"" + FIELD_TYPE_TO_FORM_INPUT_SIZE[field.type] + "\" value=\"\">"
    }

    create_tbody() {
        var tbody = element("TBODY");
        this.partners.forEach(partner => tbody.appendChild(this.create_tbody_tr(partner)));
        return tbody;
    }

    create_tbody_tr(partner) {
        var tr = element("TR");
        this.fields.forEach(field => tr.appendChild(this.create_tbody_tr_td(partner, field)));
        return tr;
    }

    create_tbody_tr_td(partner, field) {
        return element("TD").setInnerHTML(this.create_tbody_tr_td_html(partner, field));
    }

    create_tbody_tr_td_html(partner, field) {
        return "<input id=\"" + this.constructor.idByPartnerField(partner, field) + "\" type=\"text\" size=\"" + FIELD_TYPE_TO_FORM_INPUT_SIZE[field.type] + "\" value=\"\">";
    }

    render() {
        this.render_thead();
        this.render_tbody();
    }

    render_thead() {
        this.fields.forEach(field => {
            let id = this.constructor.idByGatherTeamField(this, this.team, field);
            elementById(id).value = field.attributes.name;
        });
    }

    render_tbody() {
        this.partners.forEach(partner => {
            this.fields.forEach(field => {
                elementById(this.constructor.idByPartnerField(partner, field)).value = partner.attributes[field.id];
            });
        });
    }        
}
