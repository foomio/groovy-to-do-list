import React, { useEffect, useState } from 'react';

function Quotes() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://shakespeare1.p.rapidapi.com/shakespeare/generate/lorem-ipsum')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote); // Adjust this depending on the actual API response structure
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="quotes">
      <p className="quote-text">{quote}</p>
    </div>
  );
}

export default Quotes;
