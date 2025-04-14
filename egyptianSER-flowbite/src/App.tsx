import React, { useState, useEffect } from 'react';
import OrbComponent from './components/OrbComponent';
import './App.css';

function App() {
  const [currentState, setCurrentState] = useState<'idle' | 'listening' | 'result'>('idle');
  const [showResults, setShowResults] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [emotions, setEmotions] = useState<{
    angry: number;
    happy: number;
    neutral: number;
    sad: number;
  }>({
    angry: 0.15,
    happy: 0.25,
    neutral: 0.45,
    sad: 0.15
  });
  const [dots, setDots] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState('Tap to start');
  const [seconds, setSeconds] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcribedText, setTranscribedText] = useState('');

  const MAX_RECORDING_TIME = 10; // Maximum recording time in seconds
  const requestIdRef = React.useRef(0);

  // Timer effect
  useEffect(() => {
    let interval: number | undefined = undefined;
    let timeout: number | undefined = undefined;

    if (currentState === 'listening') {
      // Start the timer
      interval = window.setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          // If we hit max recording time, stop recording
          if (newSeconds >= MAX_RECORDING_TIME) {
            handleStateChange('result');
          }
          return newSeconds;
        });
      }, 1000);

      // Set up auto-stop timeout
      timeout = window.setTimeout(() => {
        handleStateChange('result');
      }, MAX_RECORDING_TIME * 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [currentState]);

  useEffect(() => {
    let interval: number | undefined = undefined;

    // Only start dots animation after the main text transition is complete
    if (currentState === 'listening' && !isTransitioning) {
      setDisplayText('Listening');
      interval = window.setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);
    } else {
      setDots('');
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [currentState, isTransitioning]);

  useEffect(() => {
    if (currentState === 'listening') {
      setDisplayText('Listening');
    } else {
      setDisplayText('Tap to start');
    }
    
    // Handle text transition
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentState]);

  const handleStateChange = async (state: 'idle' | 'listening' | 'result') => {
    if (state === 'listening') {
      setCurrentState('listening');
  
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
  
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          setMediaRecorder(null);
        
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(blob);
          const transcript = await sendToASR(blob);
          setTranscribedText(transcript);
        };
        recorder.start();
        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
  
      return;
    }
  
    if (state === 'result') {
      if (mediaRecorder) {
        mediaRecorder.stop(); // This will trigger the onstop handler
      }
  
      setEmotions({
        angry: 0.15,
        happy: 0.25,
        neutral: 0.45,
        sad: 0.15,
      });
      setTypingFinished(false);
      setTimeout(() => setShowResults(true), 100);
      setTimeout(() => setTypingFinished(true), 2100);
      setCurrentState('result');
      return;
    }
  
    if (state === 'idle') {
      setCurrentState('idle');
      setShowResults(false);
      setTypingFinished(false);
      setTranscribedText('');
    }
  };
  

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const sendToASR = async (blob: Blob) => {
    const thisRequestId = ++requestIdRef.current;
  
    const formData = new FormData();
    formData.append('file', blob, 'recording.wav');
  
    try {
      console.log("🎙️ Sending audio blob size:", blob.size);
      const res = await fetch('http://127.0.0.1:8000/transcribe', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
  
      if (thisRequestId !== requestIdRef.current) {
        console.warn("⚠️ Stale response ignored.");
        return '';
      }
  
      // Only the latest response gets to update state
      setTranscribedText(data.cleaned || data.transcript);
      setEmotions({
        angry: data.emotion?.scores?.angry || 0,
        happy: data.emotion?.scores?.happy || 0,
        neutral: data.emotion?.scores?.neutral || 0,
        sad: data.emotion?.scores?.sad || 0
      });
  
      return data.cleaned || data.transcript;
  
    } catch (err) {
      console.error('[ASR] fetch error:', err);
      return '';
    }
  };
  
  

  // Get remaining time text
  const getRemainingTime = () => {
    const remaining = MAX_RECORDING_TIME - seconds;
    return `${remaining}s`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-blue-100 via-white to-blue-100 origin-center">
      {/* Futuristic Background Elements */}
      <div className="futuristic-bg" />
      <div className="futuristic-grid" />
      <div className="futuristic-glow" />

      {/* Content */}
      <div className="relative z-10">
        {/* Center Orb */}
        <div className="mb-4">
          <OrbComponent 
            onStateChange={handleStateChange}
            emotion={Object.keys(emotions)[Math.floor(Math.random() * Object.keys(emotions).length)] as keyof typeof emotions}
            confidence={emotions[Object.keys(emotions)[Math.floor(Math.random() * Object.keys(emotions).length)] as keyof typeof emotions]}
          />
        </div>

        {/* Status Label */}
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            {/* Status Indicator Dot */}
            <div 
              className={`
                w-3 h-3 rounded-full 
                transition-all duration-300 ease-in-out
                ${currentState === 'idle' ? 'bg-green-500 opacity-100' : ''}
                ${currentState === 'listening' ? 'bg-red-500 opacity-100 animate-pulse' : ''}
                ${currentState === 'result' ? 'opacity-0' : ''}
                shadow-lg relative
              `}
            >
              <div className={`
                absolute inset-0 rounded-full 
                transition-all duration-300 ease-in-out
                ${currentState === 'idle' ? 'bg-green-400/30 opacity-100' : ''}
                ${currentState === 'listening' ? 'bg-red-400/30 opacity-100 animate-ping' : ''}
                ${currentState === 'result' ? 'opacity-0' : ''}
                shadow-lg
              `} />
            </div>
            <div 
              className={`
                status-text text-2xl font-extralight text-slate-600/90
                transition-all duration-500 ease-out
                ${isTransitioning ? 
                  'opacity-0 transform -translate-y-4 scale-95' : 
                  'opacity-100 transform translate-y-0 scale-100'
                }
              `}
            >
              {displayText}{!isTransitioning && currentState === 'listening' ? dots : ''}
            </div>
          </div>
        </div>

        {/* Timer and Remaining Time */}
        <div 
          className={`
            status-text text-xl font-extralight mb-12 text-center space-y-1
            transition-all duration-300
            ${currentState === 'listening' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}
          `}
        >
          <div className="text-slate-600/75">{formatTime(seconds)}</div>
          <div className="text-sm text-slate-500/50">{getRemainingTime()}</div>
        </div>

        {/* Bottom Result Card */}
        {currentState === 'result' && (
          <div 
            className="mt-8 p-8 bg-white rounded-2xl shadow-lg max-w-md w-full 
              transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="space-y-6">
              {/* Transcribed Text */}
              <div className={`
                text-center transform transition-all duration-900
                ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}>
                <h3 className="status-text text-lg font-extralight text-slate-600/75 mb-2">
                  Transcribed Text
                </h3>
                <div className="typing-container">
                <p className={`
                  text-xl text-slate-800 font-arabic leading-relaxed typing-text
                  ${showResults ? 'animation-play-state-running' : 'animation-play-state-paused'}
                  ${typingFinished ? 'finished' : ''}
                `} dir="rtl">
                  {transcribedText || '...'}
                </p>
                </div>
              </div>

              {/* Divider */}
              <div className={`
                h-px bg-slate-200 w-full transform transition-all duration-900 delay-200
                ${showResults ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
              `} />

              <h3 className={`
                status-text text-2xl font-extralight text-slate-600/90 mb-4 text-center
                transform transition-all duration-900 delay-300
                ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}>
                Emotion Distribution
              </h3>
              <div className="space-y-4">
                {/* Angry */}
                <div className={`
                  flex items-center space-x-2
                  transform transition-all duration-900 delay-300
                  ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                  <span className="text-2xl">😡</span>
                  <span className="w-20 text-slate-600/90">Angry</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-400 rounded-full transition-all duration-900"
                      style={{ width: `${emotions.angry * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-slate-600/90">
                    {(emotions.angry * 100).toFixed(1)}%
                  </span>
                </div>
                
                {/* Happy */}
                <div className={`
                  flex items-center space-x-2
                  transform transition-all duration-900 delay-500
                  ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                  <span className="text-2xl">😄</span>
                  <span className="w-20 text-slate-600/90">Happy</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-400 rounded-full transition-all duration-900"
                      style={{ width: `${emotions.happy * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-slate-600/90">
                    {(emotions.happy * 100).toFixed(1)}%
                  </span>
                </div>
                
                {/* Neutral */}
                <div className={`
                  flex items-center space-x-2
                  transform transition-all duration-900 delay-700
                  ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                  <span className="text-2xl">😐</span>
                  <span className="w-20 text-slate-600/90">Neutral</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 rounded-full transition-all duration-900"
                      style={{ width: `${emotions.neutral * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-slate-600/90">
                    {(emotions.neutral * 100).toFixed(1)}%
                  </span>
                </div>
                
                {/* Sad */}
                <div className={`
                  flex items-center space-x-2
                  transform transition-all duration-900 delay-900
                  ${showResults ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                  <span className="text-2xl">😢</span>
                  <span className="w-20 text-slate-600/90">Sad</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-400 rounded-full transition-all duration-900"
                      style={{ width: `${emotions.sad * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-slate-600/90">
                    {(emotions.sad * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
