import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';


class Search extends Component {
  constructor(props) {
    super(props);

    //Defining state for topic, question and answer
    this.state = {
      query: '',
      question: '',
      answer: ''
    };
  }

  handleClick = async (e) => {
    e.preventDefault();

    // Check for topic and question
    if (!this.state.query || !this.state.question) {
        alert('Please enter both the search topic and question.');
        return;
      }

    try {
      //Post request with topic and question
      const response = await axios.post('https://regal-tract-392320.uc.r.appspot.com/searchQuery', {
        query: this.state.query,
        question: this.state.question
      });

      const { answer } = response.data;
      this.setState({ answer });
    } catch (error) {
      console.error(error);
    }
  };

  //Method to handle query change
  handleQueryChange = (e) => {
    this.setState({ query: e.target.value, answer:'' });
  };

  
  //Method to handle change for question
  handleQuestionChange = (e) => {
    this.setState({ question: e.target.value, answer:'' });
  };

  render() {

    return (
      <div className="container">
            <h1 className='app-heading'>
                Enter your topic and related question
            </h1>
            <h2 className='app-heading'>Please enter your topic to be searched. The topic can be any subject, 
                keyword, or phrase that you want to gather information about. </h2>
                <h2 className='app-heading'>
                    By entering relevant topic, you can initiate a search and retrieve answer to the question pertaining to the topic provided.
                </h2>
                <h2 className='app-heading'>Example - topic: leaves, question: What is the function?</h2>
            <div className='input-label'>
          <input className='input'
            
            type="text"
            placeholder="Enter a search topic......."
            value={this.state.query}
            onChange={this.handleQueryChange}

          />
          
        
          <input
          className='input'
          
            type="text"
            placeholder="Ask a question...."
            value={this.state.question}
            onChange={this.handleQuestionChange}
          />
          </div>
          <div className='button-label'>
          <button className='button'  onClick={this.handleClick} >Search</button>
          </div>

        {this.state.answer && (
        <div className="result">
            
            {this.state.answer}
            </div>
            )}
      </div>
    );
  }
}

export default Search;
