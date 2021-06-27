import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import AppStyles from './AppStyles';
import {getballHit, getOversRemaining} from './Util';
import props from 'prop-types';

const App = ({players = ["", "", "", "", "", "", "", 
"Kirat Bohli", 
"N.S Nodhi", 
"R Bumrah", 
"Shashi Henra"
], 
playersProbability = [
  [0], 
  [0], 
  [0], 
  [0], 
  [0], 
  [0], 
  [0], 
  [0.05, 0.3, 0.25, 0.1, 0.15, 0.01, 0.09, 0.05], 
  [0.05, 0.3, 0.25, 0.1, 0.15, 0.01, 0.09, 0.05], 
  [0.05, 0.3, 0.25, 0.1, 0.15, 0.01, 0.09, 0.05], 
  [0.05, 0.3, 0.25, 0.1, 0.15, 0.01, 0.09, 0.05]
]
}) => {

  const backgroundStyle = {
    backgroundColor: '#ffffff',
  };

  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(7);
  const [overs, setOvers] = useState(0);
  const [hitStatus, setHitStatus] = useState("0 Runs");
  const [player1Runs, setPlayer1Runs] = useState(0);
  const [player2Runs, setPlayer2Runs] = useState(0);
  const [player1Strike, setPlayer1Strike ] = useState("*");
  const [player2Strike, setPlayer2Strike ] = useState("");
  const striker= useRef(0);
  const player1Index= useRef(7);
  const player2Index= useRef(8);
  const winLossMargin= useRef("");

  const renderBowlButton = () => {
        if (wicket<10 || score<=40) {
            return (
              <Button
              onPress={() => {
                //setOvers(getOversRemaining)
                var res
                if(striker.current==0){
                  //currentPlayerIndex = player1Index
                  res = getballHit(playersProbability[player1Index.current])
                  if(res >= 0){
                    setHitStatus(res + " Runs")
                    setPlayer1Runs(player1Runs + res)
                    setScore(score + res)
                    if((score + res)>40){
                      let winbywickets = 10-wicket
                      winLossMargin.current = `Win by ${winbywickets} Wickets`
                    }
                  }else{
                    setHitStatus("Out")
                    setWicket(wicket+1)
                    //setPlayer1Runs(0)
                    if((wicket+1)==10){
                      let lossbyruns = 40-score
                      winLossMargin.current = `Loss by ${lossbyruns} Runs`
                    }else{
                      player1Index.current = player1Index.current + 2
                    }
                  }
                }else{
                  //currentPlayerIndex = player2Index
                  res = getballHit(playersProbability[player2Index.current])
                  if(res >= 0){
                    setHitStatus(res + " Runs")
                    setPlayer2Runs(player2Runs + res)
                    setScore(score + res)
                    if((score + res)>40){
                      let winbywickets = 10-wicket
                      winLossMargin.current = `Win by ${winbywickets} Wickets`
                    }
                  }else{
                    setHitStatus("Out")
                    setWicket(wicket+1)
                    //setPlayer2Runs(0)
                    if((wicket+1)==10){
                      let lossbyruns = 40-score
                      winLossMargin.current = `Loss by ${lossbyruns} Runs`
                    }else{
                      player2Index.current = player2Index.current + 1
                    }
                  }
                }
                if(res===1 || res===3 || res===5)
                  setStriker(striker, setPlayer1Strike, setPlayer2Strike)
                console.log("Bowl")
              }}
    
              title="Bowl"
            ></Button>
            );
        } else {
          return <Text style={{alignSelf: 'center'}}> Bengaluru {winLossMargin.current}</Text>
        }
  }

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <View style={AppStyles.container}>
        <View style={{ flexDirection: 'row', backgroundColor: '#ffff00', flex: 1 }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text> Scores : {score}-{wicket}</Text>
            <Text> Overs : {overs}</Text>
          </View>
          <Text style={{ height: '100%', fontSize: 70, backgroundColor: '#ff0000' }}>{hitStatus}</Text>
        </View>
        <View style={{ flexDirection: 'column', flex: 3, backgroundColor: '#ff00ff', alignItems: 'center' }}>
          <Text > {players[player1Index.current]} ({player1Runs}){player1Strike}</Text>
          <Text style={{position: 'absolute', bottom: 0}} > {players[player2Index.current]} ({player2Runs}){player2Strike}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#ff00ff' }}>
        {renderBowlButton()}  
        </View>
      </View>
    </SafeAreaView>
  );

};

const setStriker = (striker, setPlayer1Strike, setPlayer2Strike) => {
  striker.current = 1 - striker.current;
  if(striker.current===0){
    setPlayer1Strike("*")
    setPlayer2Strike("")
  }else{
    setPlayer2Strike("*")
    setPlayer1Strike("")
  }
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
