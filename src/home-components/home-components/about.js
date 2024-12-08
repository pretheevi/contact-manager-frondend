import React from 'react';
import './about.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container"> 
    <div className="about-section">
      <h1 className="heading">Welcome to BuddyList!</h1>
      <p className="description">
        Stay organized, connected, and in control with BuddyList. Our app is designed to help you manage your contacts effortlessly, ensuring you never lose touch with the people who matter most.
      </p>

      <section className="section">
        <h2 className="subheading">Core Features</h2>
        <ul className="list">
          <li>Save and organize your contacts in one secure place.</li>
          <li>Add, edit, and delete contacts easily.</li>
          <li>Sort your contact list alphabetically or by favorites.</li>
          <li>Search for specific contacts quickly.</li>
          <li>Mark your most important connections as favorites for quick access.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="subheading">Why Choose BuddyList?</h2>
        <p>
          BuddyList stands out with:
        </p>
        <ul className="list">
          <li>Intuitive and user-friendly design.</li>
          <li>Seamless experience across devices.</li>
          <li>Built-in sorting and filtering options.</li>
          <li>Secure and private — your data is safe with us.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="subheading">How It Works</h2>
        <ol className="list">
          <li>Add your contacts with names, emails, and phone numbers.</li>
          <li>Customize your favorites and organize your list.</li>
          <li>Search, sort, and manage your connections effortlessly.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="subheading">Get Started</h2>
        <p className="get-start-para">
          Start organizing your contacts today with BuddyList. It's fast, secure, and designed to make your life easier!
        </p>
      </section>
    </div>
    </div>
  );
};

export default About;
