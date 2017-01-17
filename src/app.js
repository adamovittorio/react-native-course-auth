import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

const firebaseConfig = {
  apiKey: 'AIzaSyC1glDWEfZdp1UxnfEKyGoiv0kWmm6Z9yI',
  authDomain: 'authentication-7bb38.firebaseapp.com',
  databaseURL: 'https://authentication-7bb38.firebaseio.com',
  storageBucket: 'authentication-7bb38.appspot.com',
  messagingSenderId: '47501690907'
};

class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    const { loggedIn } = this.state;
    switch (loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size='large' />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
