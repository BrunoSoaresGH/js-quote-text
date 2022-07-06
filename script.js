const quoteContainer = document.getElementById('quote-container');
const newQuoteButton = document.getElementById('new-quote');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loadComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    const quote = apiQuotes[getRandomValue(apiQuotes.length)];
    authorText.textContent = quote.author;

    if (quote.text.length > 75) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    loadComplete();
}

function getRandomValue(value) {
    return Math.floor(Math.random() * value);
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuotes();
