"use client";

export function FeaturesComponent() {
  return (
    <section className="my-8 bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        
        {/* ✅ Section Title */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Features That Put You <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">in Control</span>
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Our AI-powered speech emotion recognition adapts to every voice.
          </p>
        </div>

        {/* ✅ Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* 🔊 Feature 1 - Voice Input */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Voice Input</h3>
            <p className="text-gray-500 dark:text-gray-400">Upload or record an audio file to analyze emotions.</p>
          </div>

          {/* 🤖 Feature 2 - AI Emotion Analysis */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">AI Emotion Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400">Deep learning models analyze speech tone, pitch, and rhythm.</p>
          </div>

          {/* 📊 Feature 3 - Results & Insights */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Results & Insights</h3>
            <p className="text-gray-500 dark:text-gray-400">View a detailed emotion breakdown in real time.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
