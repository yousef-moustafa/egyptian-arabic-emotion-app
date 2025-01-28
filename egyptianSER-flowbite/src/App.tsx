import { Button } from 'flowbite-react';
import { FileuploadComponent } from './components/FileuploadComponent';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-white-900">
        My Speech Emotion Recognition Application
      </h1>
      <div className="w-full max-w-lg mb-6">
        <FileuploadComponent />
      </div>

      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-800">
        Predict Emotion
      </Button>
    </div>
  );
}

export default App;
