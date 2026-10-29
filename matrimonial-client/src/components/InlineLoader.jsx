import './InlineLoader.css';

const InlineLoader = ({ size = 'md', text = 'Saving...', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'loader-sm',
        md: 'loader-md',
        lg: 'loader-lg'
    };

    if (fullScreen) {
        return (
            <div className="inline-loader-overlay">
                <div className="inline-loader-content">
                    <div className={`inline-loader ${sizeClasses[size]}`}>
                        <div className="loader-ring"></div>
                        <div className="loader-ring"></div>
                        <div className="loader-ring"></div>
                        <div className="loader-heart">💕</div>
                    </div>
                    {text && <p className="loader-text">{text}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="inline-loader-wrapper">
            <div className={`inline-loader ${sizeClasses[size]}`}>
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
                <div className="loader-ring"></div>
                <div className="loader-heart">💕</div>
            </div>
            {text && <span className="loader-inline-text">{text}</span>}
        </div>
    );
};

export default InlineLoader;
