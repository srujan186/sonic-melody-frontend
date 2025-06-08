import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes default
  const [volume, setVolume] = useState(75);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Echo",
      album: "Starlight Sessions",
      duration: "3:45",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Neon Waves",
      album: "Digital Horizons",
      duration: "4:12",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Ocean Breeze",
      artist: "Coastal Sounds",
      album: "Natural Elements",
      duration: "5:23",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Urban Rhythm",
      artist: "City Beats",
      album: "Metropolitan Vibes",
      duration: "3:58",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Cosmic Journey",
      artist: "Stellar Drift",
      album: "Space Odyssey",
      duration: "6:15",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop"
    }
  ];

  // Filter tracks based on search query
  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Simulate time progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const currentTrackData = tracks[currentTrack];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Main Player Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Album Art and Track Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <img
                    src={currentTrackData.image}
                    alt={currentTrackData.album}
                    className="w-64 h-64 rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Music className="w-16 h-16 text-white/80" />
                  </div>
                </div>
                
                <div className="text-center md:text-left space-y-4 flex-1">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      {currentTrackData.title}
                    </h1>
                    <p className="text-xl text-purple-200 mb-1">{currentTrackData.artist}</p>
                    <p className="text-lg text-purple-300">{currentTrackData.album}</p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      className="w-full"
                      onValueChange={(value) => setCurrentTime(value[0])}
                    />
                    <div className="flex justify-between text-sm text-purple-200">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-between">
                
                {/* Main Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={prevTrack}
                    className="text-white hover:bg-white/20 rounded-full p-3"
                  >
                    <SkipBack className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20 rounded-full p-4 bg-purple-600/50"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={nextTrack}
                    className="text-white hover:bg-white/20 rounded-full p-3"
                  >
                    <SkipForward className="w-6 h-6" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3 min-w-32">
                  <Volume2 className="w-5 h-5 text-purple-200" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="flex-1"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-center">Now Playing</h2>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tracks, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            <div className="space-y-3">
              {filteredTracks.length === 0 ? (
                <div className="text-center py-8 text-purple-300">
                  <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No tracks found</p>
                </div>
              ) : (
                filteredTracks.map((track, index) => {
                  const originalIndex = tracks.findIndex(t => t.id === track.id);
                  return (
                    <div
                      key={track.id}
                      onClick={() => selectTrack(originalIndex)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/20 ${
                        originalIndex === currentTrack ? 'bg-purple-600/30 border border-purple-400/50' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={track.image}
                          alt={track.album}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{track.title}</p>
                          <p className="text-sm text-purple-200 truncate">{track.artist}</p>
                        </div>
                        <span className="text-sm text-purple-300">{track.duration}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
