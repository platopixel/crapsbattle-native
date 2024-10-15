import React, { Component } from 'react';
import { View } from 'react-native';
import DiceRoller from './DiceRoller';
import { GAMESTATE } from '../data/GameStateModel';
import Die from '../data/DieModel';
// import './styles/GameBoard.css';
import Player from '../data/Player';
import DamageDisplayPerLane from './DamageDisplayPerLane';

interface Props {
    rollDice: () => void;
    playerDice:  Die[];
    currentTurn: number;
    currentState: GAMESTATE;
    advance: () => void;
    selectDie: (index: number) => void;
    players: Player[];
    lanes: number[];
 }

class GameBoard extends Component<Props> {
    render() {
        const { currentState, players, rollDice, selectDie, lanes, advance } = this.props;
        const player: Player = players.find(player => player.isHuman) || players[0];
        const enemy: Player = players.find(player => !player.isHuman) || players[1];
        const showEnemyDice = true;
        const showPlayerDice = currentState !== GAMESTATE.READY && currentState !== GAMESTATE.STARTGAME && currentState !== GAMESTATE.CONNECTING;
        const playerDice =  showPlayerDice ? player.rolledDice : [];
        const enemyDice = showEnemyDice ? enemy.rolledDice : [];
        const showDamage = currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ENDTURN;

        return (
            <View>
                <DiceRoller
                    player={enemy}
                    dice={enemyDice}
                    rollDice={rollDice}
                    currentState={currentState}
                    selectDie={() => null}  // can't select enemy dice
                    advance={advance}
                />
                <DamageDisplayPerLane player={player} enemy={enemy} showDamage={showDamage} />
                <DiceRoller
                    player={player}
                    dice={playerDice}
                    rollDice={rollDice}
                    currentState={currentState}
                    selectDie={selectDie}
                    advance={advance}
                />
            </View>
        )
    }
}

export default GameBoard;
