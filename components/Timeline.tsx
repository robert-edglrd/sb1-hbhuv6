"use client";

import React from 'react';

interface Clip {
  id: string;
  type: 'video' | 'text' | 'image' | 'audio';
  name: string;
  start: number;
  end: number;
}

interface Track {
  id: string;
  type: 'video' | 'text' | 'image' | 'audio';
  clips: Clip[];
}

interface TimelineProps {
  tracks: Track[];
}

const Timeline: React.FC<TimelineProps> = ({ tracks }) => {
  const totalFrames = 160;

  const getTrackColor = (index: number) => {
    const baseColor = [0, 128, 0]; // RGB for green
    const lightness = 100 - (index * 15); // Decrease lightness for each track
    return `hsl(120, 100%, ${lightness}%)`;
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'text': return 'T';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      case 'audio': return '🔊';
      default: return '?';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <div className="mb-2 flex justify-between">
        <span>Composition</span>
        <div className="text-xs">
          {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((frame) => (
            <span key={frame} className="inline-block w-12 text-center">{frame}f</span>
          ))}
        </div>
      </div>
      {tracks.map((track, index) => (
        <div key={track.id} className="flex items-center mb-2">
          <div className="w-24 flex-shrink-0">
            {getTrackIcon(track.type)} {track.type.charAt(0).toUpperCase() + track.type.slice(1)} Track
          </div>
          <div className="flex-grow bg-gray-800 h-8 relative">
            {track.clips.map((clip) => (
              <div
                key={clip.id}
                className="absolute h-full opacity-75"
                style={{
                  left: `${(clip.start / totalFrames) * 100}%`,
                  width: `${((clip.end - clip.start) / totalFrames) * 100}%`,
                  backgroundColor: getTrackColor(index),
                }}
              >
                <span className="text-xs p-1 truncate block">{clip.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;