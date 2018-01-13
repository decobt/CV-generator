import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router,Switch,Route,Link } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import axios from 'axios';

const history = createBrowserHistory();

class Login extends Component {
  submitForm(e){
    e.preventDefault();

  axios.post('/api/login', {
    username: e.target.username.value,
    password: e.target.password.value
  })
  .then(function (response) {
    let res = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });

  }
  render(){
    return (
      <div className="login center-section">
      <h4>Login to MoeCV</h4>
      <form onSubmit={this.submitForm.bind(this)}>
        <input type="text" name="username" placeholder="Username: " required/>
        <input type="password" name="password" placeholder="Password: " required/>

        <button type="submit" className="btn btn-dark btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Login</button>
      </form>
      <p>No account yet? <Link to="/signup">SignUp</Link></p>
      </div>
    );
  }
}

class SignUp extends Component {
  submitForm(e){
    e.preventDefault();
    console.log(e.target.username.value);
    console.log(e.target.password.value);

  axios.post('/api/signup', {
    username: e.target.username.value,
    password: e.target.password.value
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  }
  render(){
    return (
      <div className="signup center-section">
      <h4>Signup for MoeCV</h4>
      <form onSubmit={this.submitForm.bind(this)}>
        <input type="text" name="name" placeholder="Full Name: " required/>
        <input type="text" name="username" placeholder="Username: " required/>
        <input type="password" name="password" placeholder="Password: " required/>
        <input type="password" name="password2" placeholder="Repeat Password: " required/>
        <button type="submit" className="btn btn-dark btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Create Profile</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
      </div>
    );
  }
}

class Homepage extends Component {
  render(){
    return (
      <div className="homepage align-items-center" style={{height:'100%'}}>
        <div className="row align-items-center">
          <div className="col-sm-6">
            <h2 style={{fontWeight:'700', fontSize:'52px', color:'#222', marginBottom:'20px'}}>Create your CV</h2>
            <h5 style={{marginBottom:'30px'}}>Create your online resume to increase your chances of getting your dream job.</h5>
            <Link style={{padding:'10px 40px'}} to="/login" className="btn btn-dark">Create Resume</Link>
          </div>
          <div className="col-sm-6"><img alt="homepage" style={{borderRadius:'5px'}} src={process.env.PUBLIC_URL + '/homepage-blue.jpg'} className="img-fluid"/></div>
        </div>
      </div>
    )
  }
}

class EnsureLoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: true
    }
  }
  componentWillMount() {
    //check if user is logged in
    console.log(this.state.login);
    if(!this.state.login){
      //if not redirect to login form
      history.push('/login');
    }else{
      //if yes, redirect to dashboard
      history.push('/profile');
    }
  }
  render() {
    if(this.state.login){
      return this.props.children;
    }else{
      return null;
    }
  }
}


ReactDOM.render(
  <Router history={history}>
  <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/profile/:number' component={App}/>
      <EnsureLoggedIn>
        <Route path="/profile" component={App} />
      </EnsureLoggedIn>
    </Switch>
    </Router>
  , document.getElementById('root'));
registerServiceWorker();
