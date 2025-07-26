import React, {useState, useEffect} from 'react';

// Import Demo.
import {Demo} from "@/components/demos/Demo";

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
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading component library...</p>
                </div>
            </div>
        );
    }

    return <Demo />;
};


export default App;
