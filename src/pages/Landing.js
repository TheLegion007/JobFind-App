import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Jobfind logo" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            similique rem quam adipisci perspiciatis magnam distinctio corporis
            fuga beatae in! Dicta cum placeat ullam similique pariatur, rem
            voluptates vero fuga?
          </p>
          <p>some text</p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  ); 
};


export default Landing;
