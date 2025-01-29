import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">About Sulla</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Sulla is dedicated to democratizing cryptocurrency and blockchain education. 
          We aim to provide accessible, comprehensive learning resources that empower 
          individuals to understand and engage with emerging digital technologies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>In-depth modules covering cryptocurrency fundamentals</li>
          <li>Technical deep-dives into blockchain technology</li>
          <li>Interactive learning experiences</li>
          <li>Up-to-date content reflecting the latest industry developments</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
        <p className="text-lg text-gray-700">
          We believe in a hands-on, comprehensive approach to learning. 
          Our courses are designed to take you from beginner to advanced 
          understanding through practical, engaging content.
        </p>
      </section>
    </div>
  );
};

export default About;
