import React, { Component } from 'react';
import logo from './logo.svg';
import toonAvatar from 'cartoon-avatar';
import './App.css';

import education from './images/education.png';
import medicine from './images/medicine.png';
import transport from './images/transport.png';
import environment from './images/environment.png';
import culture from './images/culture.png';
import emergency from './images/emergency.png';
import police from './images/police.png';
import construction from './images/construction.png';
const pictograms = [education, medicine, transport, environment, culture, emergency, police, construction];

class App extends Component {

  constructor(props){
    super(props);
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const community = [ 'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Abigail', 'Emily', 'Harper', 'Amelia', 'Evelyn', 'Elizabeth', 'Sofia', 'Madison', 'Connor', 'Josiah', 'Jonathan'  , 'Cameron', 'Jeremiah', 'Mateo', 'Adrian', 'Hudson', 'Robert', 'Nicholas', 'Brayden', 'Nolan', 'Easton' ] //, 'Jordan', 'Colton']

    this.state = {
      emoji: [ '💊' ,'🔑', '🎥' , '⚖️' ,'💐 ',' 🍖' , '🐣' , '☘️ ' , '👞' , '🍎 ' , '🥕' , ' 🍩 ' , '🥨 ' , '🧀' , '🏈 ' , '🎭 ' , '🎯' , '🎳', '🚕', '🚒' , '✈️' , '🛠' , '💌' ],
      names : community,
      wallets: community.map( () => getRandomInt(250, 2500) ),
      avatars: community.map( () => toonAvatar.generate_avatar() ),
      bannerVisible: true, 
      peopleVisible:false,

    }

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleCitizens  = this.handleCitizens.bind(this);

  } 

  handleCitizens() {
    this.setState({peopleVisible: !this.state.peopleVisible,
      bannerVisible: false })
      document.getElementsByClassName('show-people-btn')[0].innerHTML = this.state.peopleVisible ?  'show citizens' : 'hide citizens';
  }

  handleKeyUp(event) {
    if (event.which == 13) {
      this.handleInteraction();
    }
  }

  handleInteraction () {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    let simulatePeople = setInterval( () =>  {
      //--------------------------------------------------  INTERACTION
      const wallets = this.state.wallets;
      let personFrom = getRandomInt(0, wallets.length-1);
      let personTo = getRandomInt(0, wallets.length-1);
      while(personTo === personFrom) {
        personTo = getRandomInt(0, wallets.length-1);
      }
      console.log(personTo, personFrom )
      let amount = getRandomInt(250, 1000)

      this.setState({ 
        wallets: this.state.wallets.map( (elem, i) => {
            if (i === personFrom) return elem - amount;
            else if(i === personTo) return elem + amount;
            else return elem;
        })
      })

      let fromGuy = document.getElementById(personFrom.toString());
      let toGuy = document.getElementById(personTo.toString());
      let coin = document.getElementById('coin');
      let emoji = document.getElementById('emoji');

      let sendItem = this.state.emoji[ getRandomInt(0, this.state.emoji.length-1) ]
      let positionFrom = fromGuy.getBoundingClientRect()
      let positionTo = toGuy.getBoundingClientRect()
      fromGuy.classList.add('activate')
      toGuy.classList.add('activate')
      
      window.setTimeout(function () {
        fromGuy.classList.remove('activate')
        toGuy.classList.remove('activate')
      }, 1000)

      emoji.innerHTML = sendItem;
      coin.style.position = "absolute";
      coin.style.left = (positionFrom.left+positionFrom.width*0.3)+'px';
      coin.style.top = (positionFrom.top+positionFrom.height*0.3)  +'px';
      coin.style.visibility = 'visible';
      
      setTimeout(() => {
        coin.style.transition= 'all '+ 1 +'s';
        coin.style.position = "absolute";
        coin.style.left = (positionTo.left+positionTo.width*0.3)+'px';
        coin.style.top = (positionTo.top+positionTo.height*0.3)  +'px';
      }, 50)
      
      setTimeout(() => {
        coin.style.visibility = 'hidden';
        coin.style.transition = '';
        emoji.innerHTML = '';
      }, 900)

    }, 2000)

    window.setTimeout(()=> {
      clearInterval(simulatePeople);
    }, 20000)


  }




  render() {

    function classGenerator(num) {
        if (num < 200) return 'node c1';
        else if (num < 500 ) return 'node c2';
        else if (num < 2000 ) return 'node c3';
        else return 'node c4';
      }

    let mapPeople = this.state.wallets.map( (amount, i ) => {
          let className = classGenerator(amount);
          return (
            <div className={className} id={i} key={i}> 
              <img src={this.state.avatars[i]} className="avatar"/>
              <h5> {this.state.names[i]} </h5>
            </div> 
          )
        })

    return (
      <div className="App">

        <nav className="App-sidebar">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> One Neighborhood <br/> New Community</h1>
          <p>by the people for the people</p>

          <button onClick={this.handleCitizens} className='show-people-btn sidebar-btn'>show citizens</button>
          <button onClick={() => console.log('under construction')} className='show-contract-btn sidebar-btn'>show contract</button>
              <br/><br/>

          {this.state.peopleVisible 
              && <button className="sidebar-btn" id="main" 
                onClick={this.handleInteraction} 
                onKeyUp={this.handleKeyUp}>simulate</button>} 
        </nav>

        
        
        <div className="App-content">

          {this.state.peopleVisible 
            && <span className='people'> 
                {mapPeople} 
                <span id='coin'><p id='emoji'></p></span>
              </span>}

          {this.state.bannerVisible 
            && <span className='banner'> 
                <p> One world project aims to popularize blockchain and smart contract technologies 
                  for the processes of community development and maintenance. <br/><br/>
                  Making it visual and interactive we educate a broad audience of citizens and help people around the globe launch local their initiatives. 
                  Today smart contracts allow fast and riskless and mutually beneficial business deals. 
                  Blockchain technologies ensure secure communications and democratic voting.   <br/><br/>
                  Distributed technologies will help communities to build humanistic societies, where all individual will thrive and live lives on their full potential.<br/><br/>
                  Spreading the knowledge about how technologies can be applied in the real life, we believe that together we can make a difference in the world. 
                </p>
              </span>}
        
        </div>
      </div>
    );
  }
}

export default App;
