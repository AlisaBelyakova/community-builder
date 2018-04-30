import React, { Component } from 'react';
import logo from './logo.svg';
import toonAvatar from 'cartoon-avatar';
import './App.css';

import ethereum from './images/ethereum.png';


class App extends Component {

  constructor(props){
    super(props);
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const community = [ 'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Abigail', 'Emily', 'Harper', 'Amelia', 'Evelyn', 'Elizabeth', 'Sofia', 'Madison', 'Connor', 'Josiah', 'Jonathan'  , 'Cameron', 'Jeremiah', 'Mateo', 'Adrian', 'Hudson', 'Robert', 'Nicholas', 'Brayden', 'Nolan', 'Easton' , 'Jordan', 'Colton']

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

      joinButton: false
    }

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleStatistics = this.handleStatistics.bind(this);
  } 

  handleStatistics() {
    this.setState({joinButton: true, monitorVisible: true, exchangeVisible: false});
    window.setTimeout(()=> {
      document.getElementById('log-btn').classList.remove('main-btn');
      document.getElementById('join-btn').classList.add('main-btn')
    },100)
  }


  handleVote (e) {
    e.target.classList.remove('main-btn')
    this.setState({voteVisible: true});
    window.setTimeout( () => {

      let voteBox = document.getElementById('vote-box');
      let start;
      for (var i=0; i< 18; i++ ){
        let newSpan = document.createElement("p");
        newSpan.innerHTML = '🔐 ';
        voteBox.appendChild(newSpan);
        newSpan.classList.add('vote-paper');

        start = document.getElementById('contract-item').getBoundingClientRect();
        newSpan.style.position = 'absolute';
        newSpan.style.top = start.top+start.height*0.7+'px';
        newSpan.style.left = start.left+start.width*0.7+'px';
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
          curPoll.innerHTML = '✅' ;
        }
      }, 1300)

      window.setTimeout(()=> {
        for (let i=0;i<18;i++) {
          let curPoll = polls[i], whom = whoVote[i];
          let target = whom.getBoundingClientRect();
          curPoll.style.transition= 'all '+ 0.8 +'s';
          curPoll.style.top = start.top+start.height*0.7+'px';
          curPoll.style.left = start.left+start.width*0.7+'px';
        }
        this.setState({exchangeButton: true});
        document.getElementById('exchange-btn').classList.add('main-btn');

      }, 3000)


    }, 10)
  }

  handleCreate () {
    
    let items = ['📚 🖌 description of item', '💰💎  description of item', '☀️ ❄️ description of item', '🌍 ☘️ description of item', '🍎🥕 description of item', '🛠 🚒 description of item ', '💊 ⚖️ description of item' , '💐 🔑 description of item' , '✈️ 🚕  description of item' , '🎭 🎯 description of item']
    this.setState({createVisible: true, bannerVisible: false });
    Array.from(document.getElementsByClassName('main-btn'))[0].classList.remove('main-btn');
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    } 
    
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
          curissue.style.left = (target.left+target.width*0.3)+'px';
          curissue.style.top = (target.top+target.height*0.3)  +'px';
        }, 80)


        setTimeout(()=> {
          curissue.style.visibility = 'hidden';
          person.classList.remove('activate');
          curissue.style.transition = '';
          curissue.innerHTML = '';

          let testarea = document.getElementById('text-field');
          testarea.value =  testarea.value +'\n'+ item;
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
    document.getElementById('exchange-btn').classList.remove('main-btn');
    this.setState({voteVisible: false, createVisible:false})
    this.setState({exchangeVisible: true})
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
        toGuy.classList.remove('activate');
        let newNode = document.createElement('img')
        newNode.src = 'https://i.giphy.com/media/3oEjHWbXcpeKhTktXi/giphy.webp'; 
        newNode.classList.add('coding-trade')
        let parentNode = document.getElementById('people');
        parentNode.lastChild.src = 'https://i.ytimg.com/vi/Tcwl1uyq1XY/maxresdefault.jpg';
        parentNode.appendChild(newNode)

      }, 1000)

      emoji.innerHTML = sendItem;
      coin.style.position = "absolute";
      coin.style.left = (positionFrom.left- positionFrom.width*0.1) +'px'; 
      coin.style.top = (positionFrom.top - positionTo.height/2) +'px'; 
      coin.style.visibility = 'visible';
      
      setTimeout(() => {
        coin.style.transition= 'all '+ 1 +'s';
        coin.style.position = "absolute";
        coin.style.left = (positionTo.left- positionFrom.width*0.1)+'px';
        coin.style.top = (positionTo.top -  positionTo.height/2)  +'px';
      }, 50)
      
      setTimeout(() => {
        coin.style.visibility = 'hidden';
        coin.style.transition = '';
        emoji.innerHTML = '';
      }, 1100)

    }, 2000)

    },100)

    window.setTimeout(()=> {
      clearInterval(simulatePeople);
      this.setState({monitorButton: true});
      document.getElementById('log-btn').classList.add('main-btn');

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
          <h1 className="App-title"> New World <br/> One Community</h1>
          <p className='by-the-people'>by the people for the people</p>
          <br/>  <br/>
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
              > sign and execute </button>}

          { this.state.exchangeButton
          && <button 
              className='sidebar-btn' 
              id='exchange-btn' 
              onClick={this.handleInteraction} 
              > exchange goods & services </button>}

          { this.state.monitorButton
          && <button 
              className='sidebar-btn' 
              id = 'log-btn'    
              onClick={this.handleStatistics} 
              > data & statistics </button>}

              <br/><br/>

          { this.state.joinButton
            && <button 
                className='sidebar-btn' 
                id = 'join-btn'    
                > ✔️ sign social contract - join One Community </button>}

        </nav>

        
        
        <div className="App-content">
        {this.state.monitorVisible 
        && <span>
            {/*<img src='https://media0.giphy.com/media/q0J2FTjHKk9nG/giphy.gif' id='chart'/>*/}
            <img src='https://media.giphy.com/media/BLX7DZmgkT31K/giphy.gif' id='chart'/>
            <img src='https://media.giphy.com/media/ReScIbs0uIETe/source.gif' id='chart'/>
            <img src='https://www.pubnub.com/wp-content/uploads/2015/02/687474703a2f2f692e696d6775722e636f6d2f59447964775a692e676966.gif' id='chart'/>
            {/* <img src='http://i.imgur.com/OQEdgOW.gif' id='chart'/> */}
            <img src={ethereum} id='eth-log'/>
            </span>} 

        { this.state.voteVisible
          && <span id = 'vote-box' > </span>
          }

        {this.state.exchangeVisible 
          && <span className='people' id='people'> 
              {mapPeople} 
              <span id='coin'><p id='emoji'></p></span>
              <br/>
              <img src='https://i.giphy.com/media/3oEjHWbXcpeKhTktXi/giphy.webp' className='coding-trade'/>
            </span>}

          {this.state.createVisible
            && <span className='create-contract-page'> 
                  <span className='first-half'>  {mapContractFirst} </span> <br />
                  <span className='contract-item' id='contract-item'> 
                        <textarea id = 'text-field' rows ='24' cols ='1' placeholder="Create  Smart  Social  contract  for  your  community by declaring values your hold and defining principles of daily interactions... "> 
                        </textarea> 
                        {/*  <img src='https://i.giphy.com/media/aQCCNezRpb9Hq/giphy.webp' id='coding'/> */}
                        <img src='https://i.giphy.com/media/3oEjHWbXcpeKhTktXi/giphy.webp' id='coding-contract'/> 
                  </span>
                  <br />
                  <span className='second-half'> {mapContractSecond} </span>
                  <span><p id='issue'></p></span>
              </span>}

          {this.state.bannerVisible 
            && <span className='banner'> 
                <p> New World One Community project aims to adopt blockchain and smart contract technologies for community building on the local and global scale. 
                <br/><br/>By making peer to peer interactions and dealings secure and transparent the participants lead their community with trust and efficacy, outreach and help people around the globe to launch their local initiatives. 
                <br/><br/>Today smart contracts help communities to build democracy and humanistic societies - E Pluribus Unum Nuovo.
                </p>
              </span>}
        
        </div>
      </div>
    );
  }
}

export default App;
