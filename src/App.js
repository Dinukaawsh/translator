import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [sourceLang, setSourceLang] = useState("en");  // Default to English
  const [targetLang, setTargetLang] = useState("en");  // Default to English

  const handleTranslate = async () => {
    // Reset error messages
    setError("");
    let errorMessage = "";

    // Validate inputs
    if (!text.trim()) {
      errorMessage = "Please enter text to translate.";
    } else if (sourceLang === targetLang) {
      errorMessage = "Source and target languages cannot be the same.";
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLang}|${targetLang}`
      );

      const data = await response.json();

      // Check if the translation is valid or if the response is the same as the input text
      if (data.responseData.translatedText === text) {
        setError("No translation found. Please try another language pair.");
        setTranslation(""); // Clear the translation
      } else {
        setTranslation(data.responseData.translatedText || "No translation found.");
      }
    } catch (err) {
      setError("Failed to fetch translation. Please try again.");
      setTranslation(""); // Clear translation if API fails
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="card shadow-lg p-4 rounded-lg w-75 w-md-50 w-lg-40">
        <h1 className="text-center mb-4 text-light">Translation App</h1>

        {/* Source Language Dropdown */}
        <div className="mb-4">
          <label className="form-label text-light">Source Language</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className={`form-select form-select-lg ${error && !text ? 'border-danger' : ''}`}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="zh-TW">Chinese (Traditional)</option>
            <option value="ja">Japanese</option>
            <option value="ar">Arabic</option>
            <option value="he">Hebrew</option>
            <option value="ko">Korean</option>
            <option value="hi">Hindi</option>
            <option value="tr">Turkish</option>
            <option value="nl">Dutch</option>
            <option value="pl">Polish</option>
            <option value="el">Greek</option>
          </select>
        </div>

        {/* Target Language Dropdown */}
        <div className="mb-4">
          <label className="form-label text-light">Target Language</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className={`form-select form-select-lg ${error && !text ? 'border-danger' : ''}`}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="zh-TW">Chinese (Traditional)</option>
            <option value="ja">Japanese</option>
            <option value="ar">Arabic</option>
            <option value="he">Hebrew</option>
            <option value="ko">Korean</option>
            <option value="hi">Hindi</option>
            <option value="tr">Turkish</option>
            <option value="nl">Dutch</option>
            <option value="pl">Polish</option>
            <option value="el">Greek</option>
          </select>
        </div>

        {/* Text Input Field */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
            className={`form-control form-control-lg ${error && !text ? 'border-danger' : ''}`}
            rows="5"
          />
        </div>

        {/* Translate Button */}
        <div className="text-center mb-4">
          <button
            onClick={handleTranslate}
            className="btn btn-lg btn-primary w-100 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <i className="fa fa-language mr-2"></i> Translate
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Translation Output */}
        <div className="mt-4 p-4 bg-light border rounded">
          <h3 className="h5 text-dark">Translation:</h3>
          <p>{translation}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
