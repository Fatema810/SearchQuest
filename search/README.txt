ReadMe - FrontEnd

This is a React component allows users to enter a search topic and a related question. 

Dependencies to be installed:

--React
--axios

command - npm install react axios
npm start

server endpoint - http://localhost:5000/searchQuery.

The component provides an input field for the search topic and another input field for the related question. 
When the user clicks the search button, the component sends a POST request to the server with the topic and question. 
The server should handle this request and respond with the corresponding answer.