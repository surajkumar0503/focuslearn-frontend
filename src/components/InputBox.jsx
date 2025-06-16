function TextBox({ placeholder, handleInputChange, text, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div
      className="text-box-container"
      style={{ width: "75%", marginTop: "15px" }}
    >
      <input
        type="text"
        className="form-control rounded-pill"
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={text}
        style={{ marginBottom: "15px" }}
        aria-label={placeholder}
      />
    </div>
  );
}

export default TextBox;