import Player from "./Player";
import Die from "./DieModel";
// import {Connection} from './ConnectionController';

export enum GAMESTATE {
    STARTGAME,
    CONNECTING,
    READY,
    ROLLING,
    WAITING_TO_FIGHT,
    FIGHTING,
    ANIMATING,
    ENDTURN,
    ENDGAME
}

export enum WINNER {
    NONE,
    PLAYER,
    ENEMY,
    TIE
}

export enum GAMETYPE {
    SINGLEPLAYER,
    MULTIPLAYER
}

export default class GameStateModel {
    public static NUM_DICE: number = 6;
    private static NUM_TURNS: number = 3;
    private static MAX_HP: number = 100;

    public currentState: GAMESTATE = GAMESTATE.STARTGAME;
    public winner: WINNER = WINNER.NONE;
    public lanes: number[] = [];
    public isMultiplayer: boolean = false;
    public forceUpdate: () => void;

    private mPlayers: Player[] = [];
    private mPlayer: Player;
    private mEnemy: Player;
    private mTurn: number = 0;
    private mPlayerDamage: number = 0;
    private mEnemyDamage: number = 0;

    public socketConnection;
    public onFight;

    constructor(gameType?: GAMETYPE) {
        this.mPlayers = this.initializePlayers();

        // if (this.isMultiplayer = gameType === GAMETYPE.MULTIPLAYER) {
        //     this.initSocketConnection();
        // }
    }

    // private initSocketConnection() {
    //     this.socketConnection = new Connection();

    //     this.socketConnection.connection.on('fight', (enemyDice: Die[]) => {
    //         console.log('fight received... enemyDice: ', enemyDice);
    //         this.mEnemy.rolledDice = enemyDice;
    //         this.advance();
    //         if (this.onFight) {
    //             this.onFight();
    //         }
    //     });
    // }

    get players() {
        return this.mPlayers;
    }

    get turn() {
        return this.mTurn;
    }

    get human() {
        return this.mPlayer;
    }

    get enemy() {
        return this.mEnemy;
    }

    get playerDamage() {
        return this.mPlayerDamage;
    }

    get enemyDamage() {
        return this.mEnemyDamage;
    }

    public advance = () => {
        switch (this.currentState) {
            case GAMESTATE.STARTGAME:
                if (this.isMultiplayer) {
                    this.currentState = GAMESTATE.CONNECTING;
                    this.socketConnection.joinGame().then(() => {
                        this.advance();
                    });
                } else {
                    this.currentState = GAMESTATE.READY;
                }
                break;
            case GAMESTATE.CONNECTING:
                this.currentState = GAMESTATE.READY;
                this.forceUpdate();
                break;
            case GAMESTATE.READY:
                this.currentState = GAMESTATE.ROLLING;
                this.mPlayer.rollDice();
                this.mTurn++;
                break;
            case GAMESTATE.ROLLING:
                if (++this.mTurn < GameStateModel.NUM_TURNS) {
                    this.mPlayer.rollDice();  // roll the player dice
                } else {
                    this.mPlayer.rollDice();
                    if (!this.isMultiplayer) {
                        this.mEnemy.rollDice();
                    }
                    this.currentState = this.isMultiplayer ? GAMESTATE.WAITING_TO_FIGHT : GAMESTATE.FIGHTING;
                }
                break;
            case GAMESTATE.WAITING_TO_FIGHT:
                // This case is a multiplayer only case
                // If we are currently waiting to fight and have received
                // an advance it means the other player is ready to battle
                this.currentState = GAMESTATE.FIGHTING;
                break;
            case GAMESTATE.FIGHTING:
                // compare lanes
                // this.compareLanes();
                this.applyDamage();
                this.checkWin();
                this.currentState = GAMESTATE.ANIMATING;
                break;
            case GAMESTATE.ANIMATING:
                if (this.winner === WINNER.NONE) {
                    this.currentState = GAMESTATE.ENDTURN;
                } else {
                    this.currentState = GAMESTATE.ENDGAME;
                }
                break;
            case GAMESTATE.ENDTURN:
                this.resetTurn();
                this.currentState = GAMESTATE.READY;
                break;
            case GAMESTATE.ENDGAME:
                // ENDGAME state should not be advanced from
                // A new gamestatemodel should be created to start a new round
                console.error("Cannot advance from ENDGAME state!");
                break;
        }
        console.log(GAMESTATE[this.currentState]);
        if (this.isMultiplayer) {
            this.advanceServer();
        }
    }

    private advanceServer() {
        let payload;
        if (this.currentState === GAMESTATE.WAITING_TO_FIGHT) {
            payload = this.mPlayer.rolledDice;
        }

        this.socketConnection.advance(this.currentState, payload);
    }

    public rollDice() {
        this.advance();
    }

    /**
     * Updates this.lanes
     * Assigns lanes to an array of positive or negative integers which represent the
     * amount of damage dealt or received for each dice lane.
     */
    private compareLanes() {
        // compare dice at each index and build an array of psitive or negative dmg
        this.lanes = Array.from({ length: GameStateModel.NUM_DICE }, (e, index: number) => {
            let player: Die = this.mPlayer.rolledDice[index];
            let enemy: Die = this.mEnemy.rolledDice[index];

            return player.points - enemy.points;
        });
    }

    /**
     * Iterates through lanes and accumulates the total damage to each player
     * Each player's total damage amount is stored
     * Each player's hp is updated (hp is reduced by amount of damage to player)
     */
    private applyDamage = () => {
        // this.lanes.forEach((aLane) => {
        //     if (aLane > 0) {
        //         this.mEnemyDamage += aLane;
        //     } else if (aLane < 0) {
        //         this.mPlayerDamage += Math.abs(aLane);
        //     }
        // });
        this.mEnemyDamage = this.mPlayer.attackTotal - this.mEnemy.defenseTotal;
        this.mPlayerDamage = this.mEnemy.attackTotal - this.mPlayer.defenseTotal;

        if (this.mEnemyDamage > 0) {
            this.mEnemy.hp -= this.mEnemyDamage;
        } else {
            this.mEnemyDamage = 0;
        }
        if (this.mPlayerDamage > 0) {
            this.mPlayer.hp -= this.mPlayerDamage;
        } else {
            this.mPlayerDamage = 0;
        }
    }

    private checkWin = () => {
        if (this.mPlayer.hp <= 0) {
            if (this.mEnemy.hp <= 0) {
                // both players died on the same turn
                this.winner = WINNER.TIE;
            } else {
                this.winner = WINNER.ENEMY;
            }
        } else if (this.mEnemy.hp <= 0) {
            this.winner = WINNER.PLAYER;
        }
    }

    private initializePlayers = () => {
        // Players might need to be separate models
        return Array.from({ length: 2 }, (e, index: number) => {
            const isHuman = index === 0;
            const player = new Player({
                isHuman,
                maxHp: GameStateModel.MAX_HP,
            });

            if (isHuman) {
                this.mPlayer = player;
            } else {
                this.mEnemy = player;
            }

            return player;
        });
    }

    private resetTurn = () => {
        this.mPlayers.forEach((player: Player) => {
            player.rolledDice = player.setNewDice();
        });

        this.mPlayerDamage =
            this.mEnemyDamage = 0;

        this.mTurn = 0;

        this.lanes = [];
    }
}
