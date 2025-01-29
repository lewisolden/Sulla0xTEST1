// src/pages/Module1.js
import React from 'react';
import ModuleQuiz from '../components/ModuleQuiz';

const Module1 = () => {
  return (
    <div className="module">
      <h1>Module 1: Fundamentals of Cryptocurrency</h1>
      
      <section>
        <h2>1.1 Introduction to Digital Currencies</h2>
        {/* Content for section 1.1 */}
      </section>

      <section>
        <h2>1.2 History and Evolution of Money</h2>
        {/* Content for section 1.2 */}
      </section>

      <section>
        <h2>1.3 Bitcoin: The First Cryptocurrency</h2>
        {/* Content for section 1.3 */}
      </section>

      <section>
        <h2>1.4 Altcoins and Tokens</h2>
        {/* Content for section 1.4 */}
      </section>

      <section>
        <h2>1.5 Cryptocurrency Market Dynamics</h2>
        {/* Content for section 1.5 */}
      </section>

      <section>
        <h2>1.6 Basic Cryptography Concepts</h2>
        {/* Content for section 1.6 */}
      </section>

      <ModuleQuiz moduleId={1} />
    </div>
  );
};

export default Module1;
