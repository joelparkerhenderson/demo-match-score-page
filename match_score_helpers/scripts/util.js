////
//
// Helpers for JavaScript prototypes.
//
// These functions are intended for rapid development.
//
//   * They are intentionally simple, to be easy to learn and adjust.
//
//   * They are generic, meaning workable with any project in general.
//
//   * They do not check for conflicts, and do not do any error handling.
//
//   * They use current vanilla JavaScript, and not any other library.
//
// See discussion at https://codereview.stackexchange.com/questions/186970/append-multiple-children-to-a-node-at-once
//
////

////
//
// Node prototypes
//
////

// Toogle node style display to show the node or hide the node.
Node.prototype.toggle = function() {
    this.style.display = (this.style.display == "none") ? "block" : "none";
    return this;
}

// Set id.
Node.prototype.setId = function(id) {
    this.id = id;
    return this;
};

// Set innerHTML.
Node.prototype.setInnerHTML = function(innerHTML) {
    this.innerHTML = innerHTML;
    return this;
};

////
//
// Node prototypes for element children
//
////

// Append all child elements
Node.prototype.appendChildren = function(children) {
    children.forEach(child => this.appendChild(child));
    return this;
};

// Remove all child elements.
Node.prototype.removeChildren = function() {
    while (this.lastChild) this.removeChild(this.lastChild);
    return this;
};

// Replace all child elements.
Node.prototype.replaceChildren = function(children) {
    return this.removeChildren().appendChildren(children);
};

////
//
// Storage prototypes
//
////

// Save an object via local storage.
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

// Load an object via local storage.
Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}

////
//
// Helpers for element shorthand.
//
////

// Create an element with typical attributes.
function element(type, id, classList, innerHTML) {
    return document.createElement(type);
}

// Get element by id.
function elementById(id) {
    return document.getElementById(id);
}

// Get element by class name.
function elementsByClassName(className) {
    return document.getElementsByClassName(className);
}

////
//
// Helpers for elements
//
////

// Vet a.k.a. validate
function vet(x) {
    if (typeof x == "undefined") {
        console.error("vet: x undefined.");
        return false;
    }
    if (x == null) {
        console.error("vet: x == null.");
        return false;
    }
    if (x == NaN) {
        console.error("vet: x == NaN.");
        return false;
    }    
    return true;
}

// Vet attribute a.k.a. validate an object has a field.
function vetAt(x, y) {
    if (typeof x == "undefined") {
        console.error("vetAt: x undefined.");
        return false;
    }
    if (x == null) {
        console.error("vetAt: x == null.");
        return false;
    }
    if (typeof y == "undefined") {
        console.error("vetAt: y undefined.");
        return false;
    }
    if (y == null) {
        console.error("vetAt: y == null.");
        return false;
    }
    if (y == NaN) {
        console.error("vetAt: y == NaN.");
        return false;
    }    
    if (typeof x[y] == "undefined") {
        console.error("vetAt: x[" + y + "] undefined.");
        return false;
    }
    if (x[y] == null) {
        console.error("vetAt: x[" + y + "] == null.");
        return false;
    }
    return true;
}
