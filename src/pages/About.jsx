import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="lg:text-6xl text-5xl  mb-4">GitHub-Finder</h1>
      <p className="py-10 text-2xl font-light">
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a href="/"> React Project</a> By
        <strong> Himanshu Mehra</strong>.
      </p>
      <p className="text-lg text-gray-400">
        Version <span className="text-white">1.0.0</span>
      </p>
      <p className="text-lg text-gray-400">
        Layout By:
        <span className="text-white"> Himanshu Mehra</span>
      </p>
    </div>
  );
}
