import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const PromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
        <span className="text-sm md:text-base font-bold animate-pulse">
          🚨 2026 BUSINESS ACCELERATOR: I'm building 3 AI-Powered Lead Machines this week for only $349 (Regular $1,500).
        </span>
        
        <div className="flex items-center gap-2 font-mono text-lg font-bold bg-black/20 px-3 py-1 rounded-lg">
          <span>{formatTime(timeLeft.hours)}</span>
          <span className="animate-pulse">:</span>
          <span>{formatTime(timeLeft.minutes)}</span>
          <span className="animate-pulse">:</span>
          <span>{formatTime(timeLeft.seconds)}</span>
        </div>
        
        <span className="text-sm font-semibold bg-black/30 px-2 py-1 rounded">
          2 Spots Left!
        </span>
        
        <Link
          to="/accelerator"
          className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 hover:scale-105 shadow-lg text-sm"
        >
          CLAIM MY SPOT
        </Link>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white md:relative md:right-auto md:top-auto md:translate-y-0"
          aria-label="Close banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
