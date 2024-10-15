import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { GAMESTATE } from '../data/GameStateModel';
// import './styles/PlayerInfo.css';

interface Props {
  hp: number;
  currentState: GAMESTATE;
  reset: ()=>void;
  advance: ()=>void;
  isHuman: boolean;
  maxHp: number;
}


export default class PlayerInfo extends Component<Props> {
  render() {
    if (this.props.isHuman) {
      return (
        <View >
          {/* <p>hp: {this.props.hp}</p> */}
          {this.renderHpBar()}

          { this.renderButton() }
        </View>
      )
    } else {
        return (
          <View >
            <Text>Enemy</Text>
            {this.renderHpBar()}
          </View>
        )
    }
  }

  private renderHpBar = () => {
    const { hp, maxHp } = this.props;
    const hpNum = hp < 0 ? 0 : hp;
    const percentFill: number = (hpNum/maxHp) * 100;

    return (
      <View>
        <View style={{width: percentFill+"%"}}></View>
        <Text>{hpNum}/{maxHp}</Text>
      </View>
    )
  }

  private renderButton = () => {
    const { currentState } = this.props;
    const isDisabled = currentState === GAMESTATE.WAITING_TO_FIGHT
                      || currentState === GAMESTATE.STARTGAME
                      || currentState === GAMESTATE.CONNECTING
                      || currentState === GAMESTATE.ENDGAME;
    let buttonText: string;

    switch(currentState) {
      case GAMESTATE.STARTGAME:
      case GAMESTATE.READY:
        buttonText = "Start";
        break;
      case GAMESTATE.ROLLING:
        buttonText = "Roll";
        break;
      case GAMESTATE.FIGHTING:
        buttonText = "Fight";
        break;
      case GAMESTATE.ENDTURN:
        buttonText = "Next Turn";
        break;
      default:
        buttonText = "Start";
        break;
    }

    return <Button onPress={this.props.advance} disabled={isDisabled} title={buttonText} />;
  }
}