import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
    const [theme, setTheme] = useState('light');
    const [primaryColor, setPrimaryColor] = useState('red-500'); // Using Tailwind's color system
    const [fontSize, setFontSize] = useState('text-base'); // Tailwind's text size classes
    const [animationSpeed, setAnimationSpeed] = useState('duration-500'); // Tailwind's duration classes

    // Simplified themes for demonstration
    const themes = ['light', 'dark'];
    const primaryColors = ['red-500', 'blue-500', 'yellow-400', 'green-500', 'purple-500'];
    const fontSizes = ['text-xs', 'text-base', 'text-lg'];
    const animationSpeeds = ['duration-700', 'duration-500', 'duration-300'];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
            <div className={`bg-${theme === 'light' ? 'white' : 'gray-800'} p-5 rounded-lg shadow-lg`}>
                <h2 className={`${fontSize} font-bold mb-4 text-${theme === 'light' ? 'gray-900' : 'white'}`}>Settings</h2>

                {/* Theme Selection */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Theme</h3>
                    <div className="flex space-x-2">
                        {themes.map((item, index) => (
                            <button
                                key={index}
                                className={`p-2 rounded ${theme === item ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} `}
                                onClick={() => setTheme(item)}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                {theme === item && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Color Selection */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Primary Color</h3>
                    <div className="flex space-x-2">
                        {primaryColors.map((color, index) => (
                            <button
                                key={color}
                                className={`h-10 w-10 rounded-full bg-${color}`}
                                onClick={() => setPrimaryColor(color)}
                            >
                                {primaryColor === color && <FontAwesomeIcon icon={faCheck} className="text-white" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Font Size Selection */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Font Size</h3>
                    <div className="flex space-x-2">
                        {fontSizes.map((size, index) => (
                            <button
                                key={size}
                                className={`p-2 rounded ${fontSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} `}
                                onClick={() => setFontSize(size)}
                            >
                                {size.replace('text-', '').toUpperCase()}
                                {fontSize === size && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Animation Speed Selection */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Animation Speed</h3>
                    <div className="flex space-x-2">
                        {animationSpeeds.map((speed, index) => (
                            <button
                                key={speed}
                                className={`p-2 rounded ${animationSpeed === speed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} `}
                                onClick={() => setAnimationSpeed(speed)}
                            >
                                {speed.replace('duration-', '').toUpperCase()}
                                {animationSpeed === speed && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
