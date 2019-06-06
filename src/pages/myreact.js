import React from 'react';
import Box from '../components/box/box';
import './myreact.css';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Grab the subtitls from youtube through the url.',
      language: 'en',
      videoID: '9KiUq8i9pbE',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=9KiUq8i9pbE'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleD3 = this.handleD3.bind(this);
    this.handleLanuageChange = this.handleLanuageChange.bind(this);
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    console.log("handleChange: " + event.target.value);
    this.setState({value: event.target.value});
  }

  handleVideoChange(event) {
    console.log("handleVideoChange: " + event.target.value);
    this.setState({videoID: video});
    try {
      var url = new URL(event.target.value);
      var video = url.searchParams.get("v");
      console.log("video: "+video);
      this.setState({videoID: video});
      this.setState({defaultVideoUrl: event.target.value})
    } catch (e) {
      //const urlerror = 'Please copy the right youtube url.';
      //this.setState({value: urlerror});
      console.log("fail to get url");
    } finally {
      console.log("get url");
    }

  }

  handleLanuageChange(event) {
    console.log("handleLanuageChange: " + event.target.value);

    this.setState({language: event.target.value});

    this.handleD3(event);
  }

  handleD3(event) {
    console.log("d3: " + event.target.value);

    var currentLanguage = event.target.value;
    var currentVideoId = this.state.videoID;

    console.log('currentLanguage: ' + currentLanguage);
    console.log("currentVideoId: " + currentVideoId);

    const url = "https://999999.best/.netlify/functions/captions?v="
    + currentVideoId
    + "&l="
    + currentLanguage;

    fetch(url).then(response => response.text()).then(data => this.setState({value: data})).catch((e) => {
      console.log("error find......");
      console.log(e);
      var novalue = "no current language: "+ currentLanguage;
      this.setState({value: novalue});
    });
  }

  render() {
    return (<div className="shopping-list">
      <h1>Get the youtube subtitls by {this.props.name}</h1>


      <h3>Subtitls</h3>
      <label>
        <textarea value={this.state.value} onChange={this.handleChange} rows="20" cols="60"/>
      </label>
      <br/><br/><br/>

      <label>
        Youtube video id: &nbsp;&nbsp;
        <input type="text" maxLength='200' size="60" placeholder="Input Youtube video id: 9KiUq8i9pbE" value={this.state.defaultVideoUrl} onChange={this.handleVideoChange}></input>
        &nbsp;&nbsp;
        <a target="blank" href={this.state.defaultVideoUrl}>youtube</a>
      </label>
      <br/><br/>

      &nbsp;&nbsp;&nbsp;Get Language: &nbsp;&nbsp;

      <button type="button" value="en" onClick={this.handleLanuageChange}>English</button>&nbsp;&nbsp;
      <button type="button" value="zh-CN" onClick={this.handleLanuageChange}>Chinese</button>

      <br/><br/><br/><br/><br/><br/>

      <h3 hidden>handleD3</h3>
      <button type="button" onClick={this.handleD3} value="111" hidden>Click Me!</button>

    </div>);
  }
}

const myreact = () => {
  return (<Box>
    <ShoppingList name="Feng"/>
  </Box>);
}

export default myreact;
