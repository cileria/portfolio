import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from './components/navbar/Navbar';
import StartPage from './components/startPage/StartPage';
import About from './components/about/About';
import Portfolio from './components/portfolio/Portfolio';
import Impressum from './components/impressum/Impressum';
import NotFound from './components/notFound/NotFound';
import Moods from './components/moods/Moods';
import Tictactoe from './components/tictactoe/Tictactoe';
import Tutoring from './components/tutoring/Tutoring';

import {switchLanguage} from './actions'
import {switchStyle} from './actions'

class App extends Component {
  state = { headerColor : "header " + this.props.headerStyle};

  changelanguage = (trueFalse) => {
    localStorage.setItem("german", JSON.stringify(trueFalse));
    this.props.switchLanguage(trueFalse);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.headerStyle!==prevState.headerStyle){
      return { headerColor: "header " + nextProps.headerStyle};
   }
   else return null;
 }

  componentDidMount(){
    
    if (localStorage.getItem("german")) {
      {JSON.parse(localStorage.getItem("german")) ? this.props.switchLanguage(true) : this.props.switchLanguage(false)}}

    if (JSON.parse(localStorage.getItem("style"))
    ) {
        let styleArr = JSON.parse(localStorage.getItem("style"))
        this.props.switchStyle(styleArr[0], styleArr[1], styleArr[2])
    }
  }


  render (){
    
    return (
      <Router> 
        <div className="mainApp">

          <div className={this.state.headerColor}>
            <div className="headlineBtn">
              <h1 className="headline">&lt;Holger_Zerbe /&gt;</h1>
              <div className="languageBtn"><button className="germanFlag" onClick={()=>{this.changelanguage(true)}}></button><button className="englishFlag" onClick={()=>{this.changelanguage(false)}}></button></div>  
            </div>
            <Navbar />
          </div>
          <div className="changingAreaApp">
            <Switch>
                <Route exact path="/" component={StartPage} />
                <Route exact path="/about" component={About} />
                <Route exact path="/portfolio" component={Portfolio} />
                <Route exact path="/impressum" component={Impressum} />
                <Route exact path="/moods" component={Moods} />
                <Route exact path="/tictactoe" component={Tictactoe} />
                <Route exact path="/tutoring" component={Tutoring} />
                <Route exact path='/foodata' component={() => { 
     window.location.href = 'https://foodata.info'; 
     return null;
}}/>
                <Route component={NotFound} />
            </Switch>

          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
        german:state.german,
        headerStyle: state.headerStyle
})
export default connect(mapStateToProps, {switchLanguage, switchStyle
})(App);
