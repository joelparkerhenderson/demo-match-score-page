////
//
// ScoreConverter: utilties for the ScoreCalculator.
//
////

const STRING_TO_SCORE = {
    "0":  0, "m":  0, "u":  0, "s":  0, "·":  0, "😑":  0, "👊":  0, "":  0,
    "+":  1, "y":  1, "t":  1, "o":  1, "T":  1, "😄":  1, "👍":  1, "✅":  1,
    "-": -1, "n": -1, "f": -1, "x": -1, "⊥": -1, "😞": -1, "👎": -1, "❌": -1
}

class ScoreConverter {

    // Parse a string to a score number.
    static parseInt(s) {
        if (s == null) return 0;
        var s = s.trim().toLowerCase();
        return (s == "") ? 0 : (s in STRING_TO_SCORE) ? STRING_TO_SCORE[s] : parseInt(s) || 0;
    }

    // Convert a score number to a CSS style word, suitable for CSS styling.
    static toStyleWord(score) {
        if (score == null) return "zero";
        return (score > 0) ? "positive" : (score < 0) ? "negative" : "zero";
    }

}
