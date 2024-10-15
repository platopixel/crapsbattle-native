import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import './styles/DamageDisplayPerLane.css';
import GameStateModel from '../data/GameStateModel'; // This is the class, not an instance
// import sword from '../assets/sword.png';
// import shield from '../assets/shield.png';
import Player from '../data/Player';

interface Props {
    player: Player;
    enemy: Player;
    showDamage: boolean;
}

class DamageDisplayPerLane extends Component<Props>{
    render() {
        const { player, enemy, showDamage } = this.props;
        return (
            <View>
                <View>
                    <View>
                        {/* <img src={sword} className="damage-display__icon" /> */}
                        <Text>{showDamage && enemy.attackTotal}</Text>
                    </View>
                    <View>
                        {/* <img src={shield} className="damage-display__icon" /> */}
                        <Text>{showDamage && enemy.defenseTotal}</Text>
                    </View>
                </View>
                <View>
                    <View>
                        {/* <img src={sword} className="damage-display__icon" /> */}
                        <Text>{player.attackTotal}</Text>
                    </View>
                    <View>
                        {/* <img src={shield} className="damage-display__icon" /> */}
                        <Text>{player.defenseTotal}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default DamageDisplayPerLane;

// class DamageDisplayPerLane extends Component<Props>{
//     render() {
//         return (
//             <View className="damage-display-lane__container">
//                 { Array.from({length: GameStateModel.NUM_DICE}, (e, i) => {
//                     return (
//                         <View className="damage-display-lane__column" key={"dmg-col" + i}>
//                             {this.props.scores[i]}
//                         </View>
//                     );
//                 }) }
//             </View>
//         )
//     }
// }