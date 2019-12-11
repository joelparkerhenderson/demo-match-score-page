////
//
// ScoreCalculator: calculate score by using various ways.
//
////

class ScoreCalculator {

    static byInt(a, b) {
        return a * b;
    }

    static byBoolean(a, b) {
        return ScoreCalculator.byInt(a ? 1 : -1, b ? 1 : -1);
    }

    static byString(a, b) {
        return ScoreCalculator.byInt(ScoreConverter.parseInt(a), ScoreConverter.parseInt(b));
    }

    static byInputCheckbox(a, b) {
        return ScoreCalculator.byBoolean(a.checked, b.checked);
    }

    static byInputText(a, b) {
        return ScoreCalculator.byString(a.value, b.value);
    }

    static byInputTextElementId(a, b) {
        return ScoreCalculator.byInputText(elementById(a), elementById(b));
    }
    
}
