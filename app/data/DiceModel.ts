import Die from './DieModel'

export default class DiceModel {
    private mDice: Die[] = [];
    private mNumDice: number;

    constructor(startingNumDice: number) {
        this.mNumDice = startingNumDice;
    }

    get dice(): Die[] {
        return this.mDice;
    }

    set dice(diceArray: Die[]) {
        this.mDice = diceArray;
    }

    set numDice(numDice: number) {
        this.mNumDice = numDice;
    }
}