////
//
// Scorer: calculate score by using various ways.
//
////

const STRING_TO_SCORE = {
    "0":  0, "m":  0, "u":  0, "s":  0, "·":  0, "😑":  0, "👊":  0, "":  0,
    "+":  1, "y":  1, "t":  1, "o":  1, "T":  1, "😄":  1, "👍":  1, "✅":  1,
    "-": -1, "n": -1, "f": -1, "x": -1, "⊥": -1, "😞": -1, "👎": -1, "❌": -1
}

class Scorer {

    static byInt(a, b) {
        return a * b;
    }

    static byBoolean(a, b) {
        return Scorer.byInt(a ? 1 : -1, b ? 1 : -1);
    }

    static byString(a, b) {
        return Scorer.byInt(this.parseInt(a), Scorer.parseInt(b));
    }

    static byInputCheckbox(a, b) {
        return Scorer.byBoolean(a.checked, b.checked);
    }

    static byInputText(a, b) {
        return Scorer.byString(a.value, b.value);
    }

    static byInputTextElementId(a, b) {
        return Scorer.byInputText(elementById(a), elementById(b));
    }
    
    static parseInt(s) {
        var s = s.trim().toLowerCase();
        if (s == "") return 0;
        if (s in STRING_TO_SCORE) return STRING_TO_SCORE[s];
        return parseInt(s) || 0;
    }

}
