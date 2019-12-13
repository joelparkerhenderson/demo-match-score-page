////
//
// Constants
//
////

const FIELDS_ID = "fields";
const FREEFORMS_ID = "freeforms";
const TAGS_ID = "tags";
const PARTNERS_ID = "partners";
const SCOREBOARD_ID = "scoreboard";

const TEAMS_SIZE = 1;

const TEAMS = [
    {id: PARTNERS_ID}, 
];

// const TEAMS = [
//     {id: MAKERS_ID}, 
//     {id: TAKERS_ID}, 
// ];

const FIELD_TYPE_TO_FORM_INPUT_SIZE = {
    "freeform": 35,
    "tag": 9
}

////
//
// Components
//
////

var gatherPartners;
var scoreboard;

////
//
// Update
//
////

function update() {

    // Save data to storage.
    function _storage() {
        localStorage.setObject("data", data);
    }
    
    updateHeaderFields();
    updatePartnersFields();
    data.scorecards.forEach(scorecard => scorecard.calc());
    _storage();
}

// Sync freeform column names from inputs to data.
// Currently we ignore the takers' fields' column names.
// TODO Add capability to use the takers' fields' column names.
function updateHeaderFields() {
    let gather = (TEAMS_SIZE == 1) ? gatherPartners : gatherMakers;
    let team = TEAMS[0];
    data.fields.forEach(field => {
        let id = GatherComponent.idByGatherTeamField(gather, team, field);
        field.attributes.name = elementById(id).value;
    });
}

// Sync the gather component areas of maker & taker field values.
// These fields are all the freeform fields and all the tag fields.
// TODO Optimize to do just the freeform fields or the tag fields.
function updatePartnersFields() {
    data.partners.forEach(partner => {
        data.fields.forEach(field => {
            let id = GatherComponent.idByPartnerField(partner, field);
            partner.attributes[field.id] = elementById(id).value;
        });
    });
}

////
//
// TODO
//
////

function refresh() {
    update();
    render();
}

function render() {
    if (TEAMS_SIZE == 1) {
        gatherPartners.render();
    } else {
        gatherMakers.render();
        gatherTakers.render();
    }
    scoreboard.render();
}

////
//
// Initialize
//
////

// Parse the JSON data object, which was loaded by the HTML head script tag.
function ini() {
    
    // Initialize `freeforms` ⊆ `fields`.
    function _freeforms() {
        data.fieldsToFreeforms = data.fields.filter(x => x.type == "freeform");
    }

    // Initialize `tags` ⊆ `fields`.
    function _tags() {
        data.fieldsToTags = data.fields.filter(x => x.type == "tag");
    }
        
    // Initialize `partners`.
    function _partners() {
        data.partners.forEach(partner => {
            partner.tagToScore = {}
            data.fieldsToTags.forEach(tag => {
                partner.tagToScore[tag] = 0;
            });
        }); 
    }
    
    // Initialize tag slots where we'll store user-input values.
    function _slots() {
        data.partners.forEach(partner => {
            data.fieldsToTags.forEach(tag => { 
                partner.attributes[tag.id] = "";
            });
        });
    }

    // Initialize scorecards, which means the Cartesian product of maker x taker.
    function _scorecards() {
        data.scorecards = [];
        data.partners.forEach(partnerA => {
            data.partners.forEach(partnerB => {
                if (partnerA.id < partnerB.id) { // TODO refactor to do subset
                    data.scorecards.push(new Scorecard("scorecard" + data.scorecards.length, partnerA, partnerB, data.fieldsToTags));
                }
            });
        });
    }

    function _scorecards_calc() {
        data.scorecards.forEach(scorecard => scorecard.calc());
    }

    // Initialize array items by setting the id attribute.
    //
    // Example outcome:
    //
    //     data.partnersToMakers[0].id = "makers0";
    //
    function _id(items, name) {
        for (var i = 0; i < items.length; i++) items[i].id = name + i; // TODO change to zid
        return items;
    }

    function _ids() {
        _id(data.fieldsToFreeforms, "freeform");
        _id(data.fieldsToTags, "tag");
        if (TEAMS_SIZE == 1) {
            _id(data.partners, "partner")
        } else {
            _id(data.partnersToMakers, "maker");
            _id(data.partnersToTakers, "taker");
        }
    }

    function _components() {
        if (TEAMS_SIZE == 1) {
            gatherPartners = new GatherComponent("gatherPartners", TEAMS[0], data.fields, data.fieldsToFreeforms, data.fieldsToTags, data.partners);
        } else {
            gatherMakers = new GatherComponent("gatherMakers", TEAMS[0], data.fields, data.fieldsToFreeforms, data.fieldsToTags, data.partnersToMakers);
            gatherTakers = new GatherComponent("gatherTakers", TEAMS[1], data.fields, data.fieldsToFreeforms, data.fieldsToTags, data.partnersToTakers);
        }
        scoreboard = new ScoreboardComponent(SCOREBOARD_ID, data.scorecards, TEAMS, data.fields, data.fieldsToFreeforms, data.fieldsToTags);   
        if (TEAMS_SIZE == 1) {
            gatherPartners.create();
        } else {
            gatherMakers.create();
            gatherTakers.create();
        }
        scoreboard.create();     
    }
 
    _freeforms();
    _tags();
    if (TEAMS_SIZE == 1) {
        _partners();
    } else {
        _makers();
        _takers();
    }
    _ids();
    _slots();
    _scorecards();
    _components();
    _scorecards_calc();
}

// Initialize events e.g. when an input changes, then update the grid.
function iniEvents() {

    function _gather_table_thead() {
        let gather = (TEAMS_SIZE == 1) ? gatherPartners : gatherMakers;
        let team = TEAMS[0];
        data.fields.forEach(field => {
            let id = GatherComponent.idByGatherTeamField(gather, team, field);
            elementById(id).addEventListener('change', refresh); // TODO optimize scope to table header rows
        });
    }

    function _partners_fields() {
        data.partners.forEach(partner => {
            data.fields.forEach(field => {
                let id = GatherComponent.idByPartnerField(partner, field);
                elementById(id).addEventListener('change', refresh); // TODO optmize scope to freeforms or tags
            });
        });
    }

    _gather_table_thead();
    _partners_fields();
}

////
//
// Main
//
////

function main() {
    ini();
    render();
    iniEvents();
}

main();
