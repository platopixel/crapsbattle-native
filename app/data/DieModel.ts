export enum eDiceType {
    ATTACK,
    DEFENSE,
    NONE  // Only used for beginning of game
}

export default class Die {
    private mIndex: number;
    private mSelected: boolean = false;
    private mNumber: number;
    private mMultiplier: number  = 1;
    private mType: eDiceType;

    constructor(startingNum: number, index: number, type: eDiceType) {
        this.mNumber = startingNum;
        this.mIndex = index;
        this.mType = type;
    }

    set multiplier(newMultiplier: number) {
        this.mMultiplier = newMultiplier;
    }

    get multiplier(): number {
        return this.mMultiplier;
    }

    get points(): number {
        return this.mNumber * this.mMultiplier;
    }

    get number(): number {
        return this.mNumber;
    }

    set number(newNumber: number) {
        this.mNumber = newNumber;
    }

    get index(): number {
        return this.mIndex;
    }

    set index(newIndex: number) {
        this.mIndex = newIndex;
    }

    get selected() {
        return this.mSelected;
    }

    set selected(aIsSelected: boolean) {
        this.mSelected = aIsSelected;
    }

    get type(): eDiceType {
        return this.mType;
    }

    set type(newType: eDiceType) {
        this.mType = newType;
    }
}
