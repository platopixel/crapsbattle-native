import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { eDiceType } from '../data/DieModel';
// import dice1 from '../assets/dice-1.png';
// import dice2 from '../assets/dice-2.png';
// import dice3 from '../assets/dice-3.png';
// import dice4 from '../assets/dice-4.png';
// import dice5 from '../assets/dice-5.png';
// import dice6 from '../assets/dice-6.png';
// import './styles/DieComponent.css';

interface Props {
    num: number;
    idx: number;
    selected: boolean;
    onClick: any;
    type: eDiceType;
 }

interface State { }

class DieComponent extends Component<Props, State> {
    // private imageMap: { [n:number]: string } = {
    //     1: dice1,
    //     2: dice2,
    //     3: dice3,
    //     4: dice4,
    //     5: dice5,
    //     6: dice6,
    // };

    public render = () => {
        const { idx, num } = this.props;
        return (
            // <View key={idx} onClick={this.select}>
            <View key={idx}>
                <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Dice-3a.svg/1024px-Dice-3a.svg.png"}} />
            </View>
        )
    }

    private getContainerClassName = () => {
        const { selected, type } = this.props;
        let className: string = "die-component__die-container";

        if (selected) {
            className += " selected";
        }

        if (type === eDiceType.ATTACK) {
            className += " attack";
        } else {
            className += " defend";
        }

        return className;
    }

    private select = () => {
        this.props.onClick(this.props.idx);
    }
}

export default DieComponent;
