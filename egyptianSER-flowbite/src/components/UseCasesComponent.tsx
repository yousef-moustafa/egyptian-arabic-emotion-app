"use client";

export function UseCasesComponent() {
  return (
    <section className="my-8 bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        
        {/* ✅ Section Title */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Where Can This Be Used?
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Our technology is transforming multiple industries.
          </p>
        </div>

        {/* ✅ Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* 📞 Call Centers */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L3 4.118l1.053 1.053a11.084 11.084 0 001.66 1.26L4 8a1 1 0 001 1h2a1 1 0 001-1l.047-.296a11.086 11.086 0 001.66-1.26L15 4.118l.997 1.766a1 1 0 01-.097 1.104l-1.5 2a1 1 0 00.118 1.309l1.5 1.5a1 1 0 010 1.414L14.828 15l-.293-.293a1 1 0 00-1.415 0L10 17l-3.121-3.121a1 1 0 00-1.415 0L4 14.828l-1.414-1.414a1 1 0 010-1.414l1.5-1.5a1 1 0 00.118-1.309l-1.5-2a1 1 0 01-.097-1.104z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Call Centers</h3>
            <p className="text-gray-500 dark:text-gray-400">Enhance customer experience with emotion detection.</p>
          </div>

          {/* 🏥 Mental Health */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Mental Health</h3>
            <p className="text-gray-500 dark:text-gray-400">Identify mood changes for better mental health support.</p>
          </div>

          {/* 🎤 AI Assistants */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">AI Assistants</h3>
            <p className="text-gray-500 dark:text-gray-400">Improve virtual assistant responses with emotional AI.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
