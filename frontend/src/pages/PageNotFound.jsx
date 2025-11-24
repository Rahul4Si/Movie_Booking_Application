import React from 'react'
import { useNavigate } from 'react-router-dom'


const PageNotFound = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Background Circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>


        {/* Film Strip Pattern */}
        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-gray-800/20 to-gray-900/20 opacity-30">
          <div className="flex flex-col h-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 border-b border-gray-700/30 relative">
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600/40 rounded-full"></div>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600/40 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>


        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-b from-gray-800/20 to-gray-900/20 opacity-30">
          <div className="flex flex-col h-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 border-b border-gray-700/30 relative">
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600/40 rounded-full"></div>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600/40 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* 404 Number with Cinema Effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>


        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have gone off-script.
            <br className="hidden md:block" />
            Let's get you back to the main feature!
          </p>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>


          <button
            onClick={() => navigate('/movies')}
            className="group flex items-center gap-3 bg-transparent border-2 border-gray-600 hover:border-white text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 8v8m6-8v8" />
            </svg>
            Browse Movies
          </button>
        </div>


        {/* Fun Cinema Quote */}
        <div className="mt-12 opacity-60">
          <p className="text-gray-400 italic text-sm">
            "In the cinema, we do not think - we are thought." - Jean-Luc Godard
          </p>
        </div>
      </div>
    </div>
  )
}


export default PageNotFound
