import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v2/quotes?categories=success",
        {
          method: "GET",
          headers: {
            "X-Api-Key": "qagtbpioYdsTlPw3UoTFVyBkFASlSuRSLNyH0CzF",
          },
        },
      );

      const data = await response.json();
      // API Ninja returns an array of quotes
      if (data.length > 0) {
        setQuote(data[0]); // take first quote
      } else {
        setQuote({ quote: "No quote found", author: "" });
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ quote: "Failed to fetch quote", author: "" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8 text-center">
        Run Interval
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        {loading ? (
          <p className="text-gray-500 text-lg animate-pulse">
            Loading quote...
          </p>
        ) : (
          <>
            <p className="text-gray-800 text-lg sm:text-xl italic mb-4">
              "{quote.quote}"
            </p>
            <p className="text-blue-700 font-semibold">— {quote.author}</p>
          </>
        )}
      </div>

      <Link
        to="/options"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-colors duration-300"
      >
        Let's go
      </Link>
    </div>
  );
};

export default HomePage;
