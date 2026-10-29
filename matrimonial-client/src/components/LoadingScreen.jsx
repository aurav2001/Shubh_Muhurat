import { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadComplete, isContentLoading = false }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Safety timeout: Guarantee loader dismisses within 3.5 seconds
        const safetyTimer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsVisible(false);
                if (onLoadComplete) onLoadComplete();
            }, 400);
        }, 3500);

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90 && isContentLoading) {
                    return 90; // Hold at 90% until content is ready
                }
                if (prev >= 100) {
                    clearInterval(interval);
                    // Start fade out animation
                    setTimeout(() => {
                        setIsVisible(false);
                        if (onLoadComplete) onLoadComplete();
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 100);

        // Also listen for actual page load + content loading
        if (!isContentLoading && document.readyState === 'complete') {
            setProgress(100);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(safetyTimer);
        };
    }, [onLoadComplete, isContentLoading]);

    if (!isVisible) return null;

    return (
        <div className={`loading-screen ${progress >= 100 ? 'fade-out' : ''}`}>
            <div className="loading-content">
                {/* Logo/Brand */}
                <div className="loading-logo">
                    <div className="heart-container">
                        <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <div className="heart-pulse"></div>
                    </div>
                </div>

                {/* Brand Name */}
                <h1 className="loading-title">
                    <span className="title-gradient">Matrimonial</span>
                </h1>
                <p className="loading-subtitle">Finding Your Perfect Match</p>

                {/* Progress Bar */}
                <div className="loading-progress-container">
                    <div className="loading-progress-bar">
                        <div
                            className="loading-progress-fill"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                    </div>
                    <span className="loading-progress-text">{Math.round(Math.min(progress, 100))}%</span>
                </div>

                {/* Animated Dots */}
                <div className="loading-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="loading-decoration">
                <div className="floating-heart heart-1">💕</div>
                <div className="floating-heart heart-2">💗</div>
                <div className="floating-heart heart-3">💖</div>
                <div className="floating-heart heart-4">❤️</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
