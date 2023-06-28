// Drum pad key-value pairs
const drumPads = {
  Q: {padName: "Heater 1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", id: "Q"},
  W: {padName: "Heater 2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", id: "W"},
  E: {padName: "Heater 3", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", id: "E"},
  A: {padName: "Heater 4", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", id: "A"},
  S: {padName: "Clap", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", id: "S"},
  D: {padName: "Open-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", id: "D"},
  Z: {padName: "Kick-n'-Hat", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", id: "Z"},
  X: {padName: "Kick", audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", id: "X"},
  C: {padName: "Closed-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", id: "C"}
};

const schemes = {
  pink: {dmColor: "radial-gradient(#f997b5, #faabc3)", dpColor: "radial-gradient(#fcd5e1, #fff)", shadowColor: "666", fontColor: "#bb0a40"},
  grey: {dmColor: "radial-gradient(#777, #888)", dpColor: "radial-gradient(#111, #222)", shadowColor: "666", fontColor: "#eee"},
  dark: {dmColor: "radial-gradient(#191f7d, #00076f)", dpColor: "radial-gradient(#030006, #0c0019)", shadowColor: "666", fontColor: "#adff00"}
};

// Drum machine class definition
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "",
      drumPads: drumPads,
      schemes: schemes,
      currentScheme: schemes.pink
    };
    this.changeScheme = this.changeScheme.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
    // KeyPress event listeners so we can keep an eye out for that event even when nothing in particular is in focus
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    // Function definitions
    changeScheme(e) {
      console.log("SCHEME CHANGED: " + e.target.id);
      this.setState({
        currentScheme: this.state.schemes[e.target.id]
      });
      console.log("SCHEME: " + this.state.currentScheme);
    }
  
    handleClick(e) {
      console.log("DRUMPAD CLICKED");
      let id = e.target.id.toUpperCase();
      console.log(id);
      document.getElementById(id).play();
      this.setState({
        displayText: drumPads[id].padName
      });
    } // END HANDLECLICK()
    
    handleKeyPress(e) {
      //console.log(this.state.drumPads);
      let key = e.key.toUpperCase();
      let audioID = key;

      if (/^[QWEASDZXC]/.test(key) && key.length == 1) {
        console.log("KEY PRESSED: " + document.getElementById(audioID).id);
        document.getElementById(audioID.toLowerCase()).style.transform = "scale(0.98)";
        setTimeout(()=>{ 
          document.getElementById(audioID.toLowerCase()).style.transform = "scale(1)" 
        }, 100);
        console.log(key);
        document.getElementById(key).play();
        this.setState({
          displayText: drumPads[key].padName
        });
      } else {
        this.setState({
          displayText: "?"
        });
      }
    } // END HANDLEKEYPRESS()
    
    // Render function
    render() {
      console.log(this.state.currentScheme);
      return (
        <div id="drum-machine" className="container-fluid" onKeyPress={this.handleKeyPress} style={{backgroundImage: this.state.currentScheme.dmColor}}>
          <div class="topPanel">
            <button className="schemeButton" id="pink" onClick={this.changeScheme} style={{backgroundImage: this.state.currentScheme.dpColor, color: this.state.currentScheme.fontColor}}>Pink</button>
            <button className="schemeButton" id="grey" onClick={this.changeScheme} style={{backgroundImage: this.state.currentScheme.dpColor, color: this.state.currentScheme.fontColor}}>Grey</button>
            <button className="schemeButton" id="dark" onClick={this.changeScheme} style={{backgroundImage: this.state.currentScheme.dpColor, color: this.state.currentScheme.fontColor}}>Dark</button>
            <div id="display">{this.state.displayText}</div>
          </div>
          <div id="button-grid" className="grid-container">
          { // JSX TO RENDER DRUMPADS 
              Object.keys(this.state.drumPads).map(key => (
                <button className="drum-pad" id={key.toLowerCase()} onClick={this.handleClick} style={{backgroundImage: this.state.currentScheme.dpColor, color: this.state.currentScheme.fontColor}}><audio className="clip" src={drumPads[key].audio} id={key}/>{key}</button>
                ) // END ARROW FUNCTION
              ) // END MAP FUNCTION
          }
          </div>
        </div>
      ); // END RETURN
    } // END RENDER()
}; // END DRUM MACHINE DEFINITION

// So JS knows where to render to and what to render
const root = ReactDOM.createRoot(document.getElementById("main-doc"));
root.render(<DrumMachine />);