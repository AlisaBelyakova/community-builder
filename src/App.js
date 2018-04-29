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
      createVisible: false,
      voteVisible: false, 
      exchangeVisible:false,
      monitorVisible: false,

      monitorButton: false, 
      exchangeButton : false,
      voteButton: false, 


    }

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleVote = this.handleVote.bind(this);
  } 

  handleVote (e) {
    e.target.classList.remove('main-btn')
    this.setState({voteVisible: true});
    window.setTimeout( () => {

      let voteBox = document.getElementById('vote-box');
      let start;
      for (var i=0; i< 18; i++ ){
        let newSpan = document.createElement("p");
        newSpan.innerHTML = '📃';
        voteBox.appendChild(newSpan);
        newSpan.classList.add('vote-paper');

        start = document.getElementById('contract-item').getBoundingClientRect();
        newSpan.style.position = 'absolute';
        newSpan.style.top = start.top+'px';
        newSpan.style.left = start.left+'px';
      }

      let polls = Array.from(document.getElementsByClassName('vote-paper'))
      let whoVote = Array.from(document.getElementsByClassName('node'))

      for (let i=0;i<18;i++) {
        let curPoll = polls[i], whom = whoVote[i];
        let target = whom.getBoundingClientRect();
        curPoll.style.transition= 'all '+ 1 +'s';
        curPoll.style.left = (target.left)+'px';
        curPoll.style.top = (target.top)  +'px';
      }

      window.setTimeout(()=> {
        for (let i=0;i<18;i++) {
          let curPoll = polls[i];
          curPoll.innerHTML = i === 5 || i===8 || i===12 || i ===15 ? '🅾️' : '✅' ;
        }
      }, 1300)

      window.setTimeout(()=> {
        for (let i=0;i<18;i++) {
          let curPoll = polls[i], whom = whoVote[i];
          let target = whom.getBoundingClientRect();
          curPoll.style.transition= 'all '+ 0.8 +'s';
          curPoll.style.top = start.top+'px';
          curPoll.style.left = start.left+'px';
        }
        this.setState({exchangeButton: true })
        document.getElementById('exchange-btn').classList.add('main-btn')
      }, 3000)


    }, 10)
  }

  handleCreate () {
    this.setState({createVisible: true, bannerVisible: false });
    Array.from(document.getElementsByClassName('main-btn'))[0].classList.remove('main-btn')
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    } 

    let items = ['📚 🖌 description of item', '💰💎  description of item', '☀️ ❄️ description of item', '🌍 ☘️ description of item', '🍎🥕 description of item', '🛠 🚒 description of item ', '💊 ⚖️ description of item' , '💐 🔑 description of item' , '✈️ 🚕  description of item' , '🎭 🎯 description of item']

    let count = 0;
    window.setTimeout( () => {
      let target = document.getElementById('contract-item').getBoundingClientRect(); 
      let issuesEmit = setInterval(() => {
        let item = items[count]; count++;
        if(!item) item = '📚 🖌 description of item';
        let person = document.getElementById(getRandomInt(0,17).toString())
        let start = person.getBoundingClientRect();  
        let curissue = document.getElementById('issue')

        person.classList.add('activate');

        curissue.innerHTML = item;
        curissue.style.position = 'absolute'
        curissue.style.left = start.left +'px'; 
        curissue.style.top = start.top  +'px'; 
        curissue.style.visibility = 'visible';
        
        
        setTimeout(() => {
          curissue.style.transition= 'all '+ 0.8 +'s';
          curissue.style.left = (target.left)+'px';
          curissue.style.top = (target.top)  +'px';
        }, 80)


        setTimeout(()=> {
          curissue.style.visibility = 'hidden';
          person.classList.remove('activate');
          curissue.style.transition = '';
          curissue.innerHTML = '';

          let testarea = document.getElementById('text-field');
          testarea.value = item +'\n'+ testarea.value;
        }, 900)

      }, 1000)

      window.setTimeout( () => {
        window.clearInterval(issuesEmit)
        this.setState({voteButton: true})
        document.getElementById('vote-btn').classList.add('main-btn')
        console.log('DONE!')
        return;
      }, 10000)

      } , 10)

  }

  handleInteraction () {

    this.setState({exchangeVisible: true , voteVisible: false, createVisible:false})

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }

    var simulatePeople;

    window.setTimeout(() => {
    simulatePeople = setInterval( () =>  {
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
      coin.style.left = (positionFrom.left)+'px'; 
      coin.style.top = (positionFrom.top)  +'px'; 
      coin.style.visibility = 'visible';
      
      setTimeout(() => {
        coin.style.transition= 'all '+ 1 +'s';
        coin.style.position = "absolute";
        coin.style.left = (positionTo.left)+'px';
        coin.style.top = (positionTo.top)  +'px';
      }, 50)
      
      setTimeout(() => {
        coin.style.visibility = 'hidden';
        coin.style.transition = '';
        emoji.innerHTML = '';
      }, 900)

    }, 2000)

    },300)

    window.setTimeout(()=> {
      clearInterval(simulatePeople);
      this.setState({monitorButton: true});
      document.getElementById('log-btn').classList.add('main-btn');
      document.getElementById('exchange-btn').classList.remove('main-btn');
    }, 22000)

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

    let mapContractFirst = this.state.wallets.map( (amount, i ) => {
      if (i>8) return;
      let className = classGenerator(amount);
      return (
        <div className={className} id={i} key={i}> 
          <img src={this.state.avatars[i]} className="avatar"/>
          <h5> {this.state.names[i]} </h5>
        </div> 
      )
      })
    let mapContractSecond = this.state.wallets.map( (amount, i ) => {
      if (i<9) return;
      if (i>17) return;
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

          <button 
              className='sidebar-btn main-btn' 
              id='sign-btn'                     
              onClick={this.handleCreate}        
              > create social contract </button>

          { this.state.voteButton
          && <button 
              className='sidebar-btn' 
              id='vote-btn'
              onClick={this.handleVote}   
              > vote and deploy </button>}
          { this.state.exchangeButton
          && <button 
              className='sidebar-btn' 
              id='exchange-btn' 
              onClick={this.handleInteraction} 
              > exchange goods and services </button>}
          { this.state.monitorButton
          && <button 
              className='sidebar-btn' 
              id = 'log-btn'    
              > monitor the log of activities </button>}

              <br/><br/>

        </nav>

        
        
        <div className="App-content">


        { this.state.voteVisible
          && <span id = 'vote-box' > </span>
          }

        {this.state.exchangeVisible 
          && <span className='people'> 
              {mapPeople} 
              <span id='coin'><p id='emoji'></p></span>
            </span>}

          {this.state.createVisible
            && <span className='create-contract-page'> 
                  <span className='first-half'>  {mapContractFirst} </span> <br />
                  <span className='contract-item' id='contract-item'> 
                      <textarea id = 'text-field' rows ='24' cols ='1' placeholder="Create  Smart  Social  contract  for  your  community by declaring values your hold and defining principles of daily interactions... "> 
                      </textarea> </span> <br />
                  <span className='second-half'> {mapContractSecond} </span>
                  <span><p id='issue'></p></span>
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
