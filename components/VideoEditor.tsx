"use client";

import React, { useEffect, useRef, useState } from 'react';
import Timeline from './Timeline';
import { Play, Pause, SkipBack, SkipForward, Upload } from 'lucide-react';

const VideoEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const tracks = [
    {
      id: '1',
      type: 'text' as const,
      clips: [
        { id: 't1', type: 'text' as const, name: 'Bunny - The Brave Hero', start: 0, end: 80 },
      ],
    },
    {
      id: '2',
      type: 'video' as const,
      clips: [
        { id: 'v1', type: 'video' as const, name: 'big_buck_bunny_1080p_30fps.mp4', start: 0, end: 160 },
      ],
    },
    {
      id: '3',
      type: 'image' as const,
      clips: [
        { id: 'i1', type: 'image' as const, name: 'logo.png', start: 20, end: 100 },
      ],
    },
    {
      id: '4',
      type: 'audio' as const,
      clips: [
        { id: 'a1', type: 'audio' as const, name: 'background_music.mp3', start: 0, end: 160 },
      ],
    },
  ];

  useEffect(() => {
    const initializeEditor = async () => {
      // Placeholder for video initialization
      // In a real implementation, you'd use the core library here
    };

    initializeEditor();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <canvas
          ref={canvasRef}
          className="w-full bg-black"
          style={{ aspectRatio: '16/9' }}
        />
      </div>
      
      <div className="mb-6 flex justify-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full"><SkipBack size={24} /></button>
        <button className="p-2 bg-blue-500 text-white rounded-full" onClick={handlePlayPause}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="p-2 bg-gray-200 rounded-full"><SkipForward size={24} /></button>
      </div>
      
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max="160"
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="text-center mt-2">
          {`${Math.floor(currentTime / 30)}:${(currentTime % 30).toString().padStart(2, '0')}`}
        </div>
      </div>
      
      <Timeline tracks={tracks} />
      
      <div className="mt-6 flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <Upload size={18} className="mr-2" /> Import Media
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Export Video
        </button>
      </div>
    </div>
  );
};

export default VideoEditor;