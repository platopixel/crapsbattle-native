import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import './styles/DamageDisplayTotal.css';
import { GAMESTATE } from '../data/GameStateModel'; // This is the class, not an instance

interface Props {
    damage: number;
    currentState: GAMESTATE;
}

class DamageDisplayTotal extends Component<Props>{
    render() {
        const { currentState } = this.props;
        let damageText: string | number = '';

        if (currentState === GAMESTATE.ENDGAME || currentState === GAMESTATE.ENDTURN) {
            damageText = this.props.damage;
        } else if (currentState === GAMESTATE.FIGHTING) {
            damageText = 'Ready to Fight!';
        } else if (currentState === GAMESTATE.READY || currentState === GAMESTATE.ROLLING) {
            damageText = 'Roll the dice...';
        }

        return (
            <View>
                <Text>{damageText}</Text>
            </View>
        );
    }
}

export default DamageDisplayTotal;