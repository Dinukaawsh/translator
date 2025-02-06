import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [sourceLang, setSourceLang] = useState("auto"); // Default to "auto" for language detection
  const [targetLang, setTargetLang] = useState("en"); // Default to english
  const [textDirection, setTextDirection] = useState("ltr"); // Default to LTR
  const [translationModel, setTranslationModel] = useState("low"); // Default to low accuracy
  const [animationClass, setAnimationClass] = useState("");

  

  const handleTranslate = async () => {
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
  
    // Detect RTL languages and set text direction based on target language
    const rtlLanguages = ["ar", "he"];
    const direction = rtlLanguages.includes(targetLang) ? "rtl" : "ltr";
    setTextDirection(direction);
  
    try {
      let translationResult;
  
      if (translationModel === "high") {
        const apiKey = "e7ce975b-d2d4-4b49-b424-1b299376b3a8:fx"; // Replace with a secure way to store API keys
        const apiUrl = "https://cors-anywhere.herokuapp.com/https://api-free.deepl.com/v2/translate";

        const requestBody = {
          text: [text], // DeepL expects an array
          source_lang: sourceLang === "auto" ? undefined : sourceLang.toUpperCase(), // Use uppercase
          target_lang: targetLang.toUpperCase(),
        };
      
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Authorization": `DeepL-Auth-Key ${apiKey}`, // Required header
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      
        if (!response.ok) {
          throw new Error("Failed to fetch translation from DeepL.");
        }
      
        const data = await response.json();
        translationResult = data.translations[0].text || "No translation found.";
      }
      
      
      
      else {
        // Low-accuracy model (MyMemory)
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch translation from MyMemory.");
        }
  
        const data = await response.json();
        translationResult = data?.responseData?.translatedText || "No translation found.";
      }
  
      setTranslation(translationResult);
    } catch (err) {
      setError("Failed to fetch translation. Please try again.");
      console.error(err);
    }
  };
  
  
  const handleSwapLanguages = () => {
    // Swap the source and target languages
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  
    // Detect RTL languages and set text direction
    const rtlLanguages = ["ar", "he"];
    const direction = rtlLanguages.includes(sourceLang) || rtlLanguages.includes(targetLang) ? "rtl" : "ltr";
    setTextDirection(direction);
  
    // Add animation class to trigger animation
    setAnimationClass("animate-arrow");
  
    // Reset the animation class after the animation duration
    setTimeout(() => {
      setAnimationClass("");
    }, 300);  // Adjust timing as needed
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="card shadow-lg p-5 rounded-lg w-75 border-light">
      <div className="text-center mb-4">
  <h1 className="text-primary d-flex justify-content-center align-items-center gap-2">
    <i className="fa fa-language"></i> Translator
  </h1>
  <p className="text-muted">Your go-to tool for quick and accurate translations</p>
</div>


       {/* Translation Model Dropdown */}
<div className="mb-4 d-flex align-items-center">
  <label className="form-label text-dark me-3 mb-0">Translation Model:</label>
  <div className="dropdown">
    <button
      className="btn btn-link text-primary dropdown-toggle p-0 d-flex align-items-center"
      type="button"
      id="translationModelDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ textDecoration: "none" }}
    >
      {translationModel === "low" ? "Low Accuracy" : "High Accuracy"}
      <i className="fa fa-caret-down ms-2"></i>
    </button>
    <ul className="dropdown-menu" aria-labelledby="translationModelDropdown">
      <li>
        <button
          className="dropdown-item"
          onClick={() => setTranslationModel("low")}
        >
          Low Accuracy
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={() => setTranslationModel("high")}
        >
          High Accuracy
        </button>
      </li>
    </ul>
  </div>
</div>


        {/* Source Language Dropdown */}
        <div className="mb-4">
  <label className="form-label text-dark">Source Language</label>
  <select
    value={sourceLang}
    onChange={(e) => setSourceLang(e.target.value)}
    className="form-select form-select-lg custom-dropdown"
  >
             {/* Add language options */}
             <option value="auto">Detect Language</option>
             <option value="en">English (English)</option>
    <option value="es">Spanish (Español)</option>
    <option value="fr">French (Français)</option>
    <option value="de">German (Deutsch)</option>
    <option value="it">Italian (Italiano)</option>
    <option value="pt">Portuguese (Português)</option>
    <option value="ru">Russian (Русский)</option>
    <option value="zh-CN">Chinese (Simplified) (简体中文)</option>
    <option value="zh-TW">Chinese (Traditional) (繁體中文)</option>
    <option value="ja">Japanese (日本語)</option>
    <option value="ar">Arabic (العربية)</option>
    <option value="he">Hebrew (עברית)</option>
    <option value="ko">Korean (한국어)</option>
    <option value="hi">Hindi (हिन्दी)</option>
    <option value="tr">Turkish (Türkçe)</option>
    <option value="nl">Dutch (Nederlands)</option>
    <option value="pl">Polish (Polski)</option>
    <option value="el">Greek (Ελληνικά)</option>
    <option value="sv">Swedish (Svenska)</option>
    <option value="da">Danish (Dansk)</option>
          </select>
        </div>

      {/* Swap Button */}
<div className="text-center mb-4">
  <button
    onClick={handleSwapLanguages}
    className="btn btn-link p-0"
  >
    <i 
      className={`fa fa-arrow-up ${animationClass}`} 
      style={{ fontSize: "24px", transition: "transform 0.3s ease-in-out" }}
    ></i>
    <i 
      className={`fa fa-arrow-down ${animationClass}`} 
      style={{ fontSize: "24px", transition: "transform 0.3s ease-in-out" }}
    ></i>
  </button>
</div>


        {/* Target Language Dropdown */}
        <div className="mb-4">
  <label className="form-label text-dark">Target Language</label>
  <select
    value={targetLang}
    onChange={(e) => setTargetLang(e.target.value)}
    className="form-select form-select-lg custom-dropdown"
  >
             {/* Add language options */}
             <option value="en">English (English)</option>
    <option value="es">Spanish (Español)</option>
    <option value="fr">French (Français)</option>
    <option value="de">German (Deutsch)</option>
    <option value="it">Italian (Italiano)</option>
    <option value="pt">Portuguese (Português)</option>
    <option value="ru">Russian (Русский)</option>
    <option value="zh-CN">Chinese (Simplified) (简体中文)</option>
    <option value="zh-TW">Chinese (Traditional) (繁體中文)</option>
    <option value="ja">Japanese (日本語)</option>
    <option value="ar">Arabic (العربية)</option>
    <option value="he">Hebrew (עברית)</option>
    <option value="ko">Korean (한국어)</option>
    <option value="hi">Hindi (हिन्दी)</option>
    <option value="tr">Turkish (Türkçe)</option>
    <option value="nl">Dutch (Nederlands)</option>
    <option value="pl">Polish (Polski)</option>
    <option value="el">Greek (Ελληνικά)</option>
    <option value="sv">Swedish (Svenska)</option>
    <option value="da">Danish (Dansk)</option>
          </select>
        </div>

        {/* Text Input */}
        <div className="mb-4">
        <textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Enter text here..."
  className="form-control form-control-lg"
  rows="5"
  dir={textDirection} // This ensures the input text direction changes
/>

        </div>

 {/* Translate Button */}
<div className="d-flex justify-content-center mb-4">
  <button
    onClick={handleTranslate}
    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2 transition-transform transform hover:scale-105"
    style={{
      fontSize: "1rem",
      fontWeight: "500",
      letterSpacing: "0.5px",
    }}
  >
    <i className="fa fa-language"></i> Translate
  </button>
</div>



        {/* Error Message */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Translation Output */}
        <div className="mt-4 p-4 bg-light border rounded">
  <p dir={textDirection}>{translation}</p>  {/* The output will follow the same text direction */}
</div>

      </div>
    </div>
  );
}

export default App;
