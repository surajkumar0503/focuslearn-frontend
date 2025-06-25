import React, { useState, useRef, useContext } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaSquare } from "react-icons/fa6";
import InputBox from "../InputBox";
import { toast } from "react-toastify";
import { DarkModeContext } from "../../context/DarkModeContext";

function QueryInput({ selectedVideoId, setDisplayText }) {
  const { colors } = useContext(DarkModeContext);
  const buttonColors = {
    background: colors.background === "#1a1a1a" ? "#333333" : "#cccccc",
    text: colors.text,
  };

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isStopClicked, setIsStopClicked] = useState(false);
  const typingRef = useRef(false);
  const submitTimeoutRef = useRef(null);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchQueryResponse = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query.");
      setIsLoading(false);
      return;
    }

    console.log(`Sending query: "${query}" for videoId: ${selectedVideoId}`);

    try {
      setDisplayText("");
      setIsLoading(true);
      toast.info("Query submitted, generating response...", { autoClose: 3000 });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/answer_query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: selectedVideoId, query }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429) {
          toast.error(data.error || "Rate limit reached. Please try again later.");
        } else {
          toast.error(`Error: ${data.error || "Unknown error"}`);
        }
        setIsLoading(false);
        return;
      }

      if (!data.response) {
        toast.error("No response returned from the server.");
        setIsLoading(false);
        return;
      }
      if (!data.transcriptAvailable) {
        toast.warn("Public transcript unavailable, response based on video metadata.");
        toast.info("Public transcript service works on local not production.");
        
      }
      console.log(`Received response: "${data.response.substring(0, 100)}..."`);
      setIsLoading(false);
      startTypewriterEffect(data.response);
      toast.success("Query response generated successfully!");
    } catch (error) {
      console.error("Error fetching query response:", error);
      toast.error(`Network error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const startTypewriterEffect = (text) => {
    const sanitizedText = (text || "")
      .replace(/undefined|null/g, "")
      .replace(/unfortunately/gi, "Unfortunately")
      .replace(/\bsince\b/gi, "Since")
      .trim();
    console.log("Sanitized text:", sanitizedText);

    let i = 0;
    setDisplayText("");
    typingRef.current = true;

    const interval = setInterval(() => {
      if (typingRef.current && i < sanitizedText.length) {
        setDisplayText((prev) => prev + sanitizedText[i]);
        i++;
      } else {
        typingRef.current = false;
        clearInterval(interval);
      }
    }, 10);
  };

  const stopTypewriterEffect = () => {
    setIsStopClicked(true);
    typingRef.current = false;
    setTimeout(() => setIsStopClicked(false), 200);
  };

  const handleSubmit = () => {
    if (!typingRef.current && selectedVideoId && query.trim() && !isLoading) {
      setIsSubmitClicked(true);
      stopTypewriterEffect();
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = setTimeout(() => {
        fetchQueryResponse();
        setIsSubmitClicked(false);
      }, 500);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <InputBox
        placeholder="Video queries? Ask Here..."
        handleInputChange={handleQueryChange}
        text={query}
      />
      {isLoading ? (
        <div
          style={{
            marginLeft: "0.6rem",
            padding: "0.7rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner-border text-primary" role="status" style={{ width: "1.5rem", height: "1.5rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <button
          style={{
            backgroundColor: "#007bff",
            color: buttonColors.text,
            border: "none",
            padding: "0.7rem",
            marginLeft: "0.6rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: !typingRef.current && selectedVideoId && query.trim() && !isLoading ? 1 : 0.2,
            cursor: !typingRef.current && selectedVideoId && query.trim() && !isLoading ? "pointer" : "not-allowed",
            animation: isSubmitClicked ? "buttonClick 0.2s ease" : "none",
          }}
          onClick={handleSubmit}
          disabled={typingRef.current || !selectedVideoId || !query.trim() || isLoading}
          aria-label="Submit query"
          title="Submit query"
        >
          <FaArrowUp style={{ color: "white", fontSize: "18px" }} />
        </button>
      )}
      <button
        style={{
          backgroundColor: "#007bff",
          color: buttonColors.text,
          marginLeft: "0.4rem",
          border: "none",
          padding: "0.8rem 1.1rem",
          borderRadius: "5px",
          opacity: typingRef.current ? 1 : 0.2,
          cursor: typingRef.current ? "pointer" : "not-allowed",
        }}
        onClick={stopTypewriterEffect}
        disabled={!typingRef.current}
        aria-label="Stop response"
        title="Stop response"
      >
        <FaSquare style={{ fontSize: "0.8rem" }} />
      </button>
      <style>
        {`
          @keyframes buttonClick {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default QueryInput;