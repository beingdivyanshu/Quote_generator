const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Showing New Quote
function newQuote(){
    showLoading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Checking Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    } 
    quoteText.textContent = quote.text;
    removeLoading();
}

// Bringing Quotes From API

async function getQuotes() {
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await  fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error 
    }
}

// Tweeting Quote to Twitter using twitter web intent
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();