import Getbikes from "./components/Getbikes";

function App() {
  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "14px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  };

  const goToPortfolio = () => {
    window.open("https://venkata-lingarao-portfolio.netlify.app/", "_blank");
  };

  return (
    <div style={{ paddingBottom: "60px" }}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button style={buttonStyle} onClick={goToPortfolio}>
          Go to My Portfolio
        </button>

        <Getbikes />
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        This ReactJS application is developed for AWS deployment testing.  
        It uses ReactJS and Axios for API responses.
      </div>
    </div>
  );
}

export default App;