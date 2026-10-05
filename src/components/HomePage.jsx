import "./HomePage.css";
export default function HomePage(props) {
  return (
    <div className="home-page-wrapper">
      <h1>Quizzical</h1>
      <p>
        Challenge your mind, test your knowledge, and discover how much you
        really know.
      </p>
      <button className="primary-btn" onClick={props.onClick}>Start quiz</button>
    </div>
  );
}
