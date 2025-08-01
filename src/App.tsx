import React, {useState, useEffect} from 'react';

// Import Demo.
import {IconSelectorDemo} from "@/components/demos/IconSelectorDemo";

const App: React.FC = () => {

    const [loaded, setLoaded] = useState(false);

    // useEffect boilerplate.
    useEffect(() => {
        // Do setups that need to run once when the component mounts.
        setTimeout(() => {
            setLoaded(true);
        }, 100); // Simulate loading time
    }, []);

    // Example of loading state.
    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`flex flex-col items-center justify-center h-screen bg-gray-100`}>
            <div className={`p-4 bg-white shadow-md rounded-lg w-full max-w-4xl`}>
                <h1 className={`font-semibold text-2xl`}>React Base</h1>
                <p><IconSelectorDemo /></p>
                {/* Add your components and logic here */}
            </div>
        </div>
    );
};


export default App;
