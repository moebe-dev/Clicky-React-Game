import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a 'browser' to gain points! If you click the same one twice you will lose! Good Luck!";

class App extends Component {
    // Setting this.state.matches To The Matches of JSON Array.
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {
        const matches = this.state.matches;
        // Filters The Clicked Match.
        const clickedMatch = matches.filter(match => match.id === id);

        // If The Matched Image's Clicked Value Is Already True.
        // Game Over Actions.
        if (clickedMatch[0].clicked) {
            correctGuesses = 0;
            clickMessage = "Bummer! You Already Clicked On This One! Try again!"
            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            this.setState({ clickMessage });
            this.setState({ correctGuesses });
            this.setState({ matches });

            // If Clicked = false, And The User Hasn't Finished.
        } else if (correctGuesses < 11) {
            clickedMatch[0].clicked = true;
            // Counter.
            correctGuesses++;
            clickMessage = "Great! You haven't click on that one yet! Keep going!";
            if (correctGuesses > bestScore) {
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle The Array To Be Rendered In A Random Order.
            matches.sort(function (a, b) { return 0.5 - Math.random() });
            // Set this.state.matches Equal To The New Matches Array.
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });
        } else {

            // Set Tts Calue To True.
            clickedMatch[0].clicked = true;

            // Restarts The Guess Counter.
            correctGuesses = 0;

            clickMessage = "WOW!!! You Got ALL of Them!!! Now, Let's See If You Can Do It Again!";
            bestScore = 12;
            this.setState({ bestScore });

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            // Shuffles The Array To Be Rendered In A Random Order.
            matches.sort(function (a, b) { return 0.5 - Math.random() });

            // Set this.state.matches Equal To The New Matches Array.
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Clicky 'Browser' Game</Title>

                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>

                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses}
                    <br />
                    Best Score: {this.state.bestScore}
                </h3>
                <div className="container">
                    <div className="row">
                        {this.state.matches.map(match => (
                            <MatchCard
                                setClicked={this.setClicked}
                                id={match.id}
                                key={match.id}
                                image={match.image}
                            />
                        ))}
                    </div>
                </div>

            </Wrapper>
        );
    }
}

export default App;
