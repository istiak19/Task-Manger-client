import React from 'react';

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Organize Tasks</h3>
            <p className="text-gray-700">Easily categorize your tasks into To-Do, In Progress, and Completed.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Collaborate</h3>
            <p className="text-gray-700">Share tasks with your team and track progress in real time.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-4">Stay On Track</h3>
            <p className="text-gray-700">Set deadlines and receive reminders to ensure you stay on top of your work.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
