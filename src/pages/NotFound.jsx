import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-teal-900">
      <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <img
            classname="w-full max-w-lg mx-auto"
            src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*UzsbStjCl54mWWf2Nl9frw.gif"
            alt="not-found"
          />
          <p className="mb-4 py-4 text-4xl tracking-tight font-extrabold font-roboto text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600 md:text-5xl dark:from-teal-200 dark:to-teal-300 drop-shadow-lg fade-in-right">
            Something's missing.
          </p>

          <p className="mb-3 text-lg font-medium font-roboto text-gray-600 dark:text-gray-300 fade-in-right delay-100">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-900 shadow-lg shadow-teal-500/50 font-semibold rounded-full px-6 font-roboto py-3 my-4 transition-transform transform hover:scale-105 text-2xl"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
