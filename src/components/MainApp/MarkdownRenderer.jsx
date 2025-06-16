import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

function MarkdownRenderer({ markdown }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}

MarkdownRenderer.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default MarkdownRenderer;