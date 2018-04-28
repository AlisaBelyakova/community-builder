import React, { Component } from 'react';
import logo from './logo.svg';
import toonAvatar from 'cartoon-avatar';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const community = [ 'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Abigail', 'Emily', 'Harper', 'Amelia', 'Evelyn', 'Elizabeth', 'Sofia', 'Madison', 'Connor', 'Josiah', 'Jonathan'  , 'Cameron', 'Jeremiah', 'Mateo', 'Adrian', 'Hudson', 'Robert', 'Nicholas', 'Brayden', 'Nolan', 'Easton' ] //, 'Jordan', 'Colton']

    this.state = {
      names : community,
      wallets: community.map( () => getRandomInt(250, 2500) ),
      avatars: community.map( () => toonAvatar.generate_avatar() ),
      isVisible: { banner: true, people: false, city: false}
    }

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleCitizens  = this.handleCitizens.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleChain = this.handleChain.bind(this);
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

    let positionFrom = fromGuy.getBoundingClientRect()
    let positionTo = toGuy.getBoundingClientRect()
    fromGuy.classList.add('activate')
    toGuy.classList.add('activate')
    
    window.setTimeout(function () {
      fromGuy.classList.remove('activate')
      toGuy.classList.remove('activate')
     }, 1000)

     coin.style.position = "absolute";
     coin.style.left = (positionFrom.left+positionFrom.width*0.6)+'px';
     coin.style.top = (positionFrom.top+positionFrom.height*0.6)  +'px';
     coin.style.visibility = 'visible';
     
     setTimeout(() => {
      coin.style.transition= 'all '+ 1+'s';
      coin.style.position = "absolute";
      coin.style.left = (positionTo.left+positionTo.width*0.6)+'px';
      coin.style.top = (positionTo.top+positionTo.height*0.6)  +'px';
    }, 100)
    
    setTimeout(() => {
      coin.style.visibility = 'hidden';
      coin.style.transition = '';
     }, 1000)

  }

  handleCitizens() {

  }
  handleCity() {

  }
  handleChain() {

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
              <h5> {amount} </h5>
            </div> 
          )
        })


    return (
      <div className="App">

        <nav className="App-sidebar">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> ONE WORLD</h1>
          
          <button onClick={this.handleCitizens} className='people'>Show Citizens</button>
          <button onClick={this.handleCity} className='city'>Show City</button>
          <button onClick={this.handleChain} className='contract'>Show Contract</button>

          <button className="sidebar-btn" id="main" 
              onClick={this.handleInteraction} 
              onKeyUp={this.handleKeyUp}>Simulate</button> 
          <button className="sidebar-btn" >Settings</button>

        </nav>

        
        
        <div className="App-content">
          <div className='people'> 
            {mapPeople} 
          </div>
          <div id='coin'></div>
        </div>
      </div>
    );
  }
}

export default App;
