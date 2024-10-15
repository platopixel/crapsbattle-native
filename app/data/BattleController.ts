import Die from "./DieModel";

/**
 * This can be a class that is instantiated for each "lane"
 * This is a purely functional "class", you can instantiate a new one,
 * pass in some initial parameters and then access data on the class
 * that is updated based on the parameters passed in.
 * For instance, this battle or lane is player1: fire-6 & player2: water-5
 * so those are the initial parameters and then you can access certain
 * data about the lane/battle (most obviously how much damage to each player)
 */

export default class BattleController {
    public player1Damage: number = 0;
    public player2Damage: number = 0;

    constructor(private player1Die: Die, private player2Die: Die) {
        this.compareDice();
    }

    private compareDice() {
        if (this.player1Die.number > this.player2Die.number) {
            this.player2Damage += this.player1Die.number - this.player2Die.number;
        } else {
            this.player1Damage += this.player2Die.number - this.player1Die.number;
        }
    }
}