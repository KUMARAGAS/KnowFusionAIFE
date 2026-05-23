import React from "react";
import { CheckCircle } from "lucide-react";

export default function PromoCard() {
  return (
    <section className="w-full  bg-[#0B75FF] text-white flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20  shadow-lg overflow-hidden">
      
      {/* ✅ Left Section */}
      <div className="flex-1 max-w-xl text-center md:text-left">
        {/* Small Tag */}
        <span className="inline-block bg-yellow-300 text-[#333] text-sm sm:text-base font-semibold px-4 py-1 rounded-full mb-4">
          🚀 Smart Learning
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Organize your notes with <br />
          <span className="text-white/90">AI-powered summarization</span>
        </h1>

        {/* Features List */}
        <ul className="space-y-3 mb-8 text-base sm:text-lg">
          {[
            "Upload multiple notes and get one clear summary",
            "Ask questions and get answers from your own notes",
            "Smart search with semantic understanding",
            "Access your summaries anytime, anywhere",
          ].map((text, index) => (
            <li
              key={index}
              className="flex items-center justify-center md:justify-start gap-3 text-white/90"
            >
              <CheckCircle
                size={22}
                className="text-white flex-shrink-0"
              />
              <span className="max-w-[280px] sm:max-w-none">{text}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="mt-4 px-6 sm:px-8 py-3 bg-white text-[#0B75FF] font-semibold text-base sm:text-lg rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-md">
          Try It Now
        </button>
      </div>

      {/* ✅ Right Image */}
      <div className="flex-1 flex justify-center">
        <img
          src="src/assets/photo/1.webp"
          alt="Student using AI Summarizer"
          className=" sm:w-[600px]"
        />
      </div>
    </section>
  );
}
