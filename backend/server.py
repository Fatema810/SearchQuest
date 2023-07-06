import requests
from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set up your Google Custom Search Engine ID and API key
engine_id = '02545075c61a24321'
api_key = 'AIzaSyChfaN-id-IAkInxkPoLwx49YfHgF4krsY'

# Initialize the question-answering pipeline
pipeline_search = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

@app.route('/searchQuery', methods=['POST'])
def perform_search():
    data = request.get_json()
    topic = data.get('query')
    question = data.get('question')

    results = search_internet(topic, question)
    answer = result_questions(results, question)

    response = {
        'answer': answer
    }

    return jsonify(response)



def result_questions(results, question):
    if results:
        # Extract the page content from the search results
        # page_content = ' '.join(result['snippet'] for result in results)


        # Assuming 'results' is a list of dictionaries containing search results
# and each dictionary has a 'snippet' key

# Create an empty list to store the snippets
        snippets_dic = []

# Iterate over each result in the 'results' list
        for result in results:
    # Access the 'snippet' key from the current result dictionary
            snippet_dic = result['snippet']
    
    # Append the snippet to the 'snippets' list
            snippets_dic.append(snippet_dic)

# Join the snippets in the 'snippets' list using a space separator
        page_content = ' '.join(snippets_dic)


        # Perform question-answering using the Hugging Face model
        answer = pipeline_search(question=question, context=page_content)

        return answer['answer']
    else:
        return "No search results found."


# Function to search Google using the Custom Search API
def search_internet(topic, question):
    # Make a request to the Google Custom Search API
    url = f'https://www.googleapis.com/customsearch/v1?key={api_key}&cx={engine_id}&q={topic}+{question}'
    res = requests.get(url)
    res.raise_for_status()

    # Extract the search results from the response
    data = res.json()
    results = data.get('items', [])

    return results

# Function to answer questions related to the search results






if __name__ == '__main__':
    app.run()
