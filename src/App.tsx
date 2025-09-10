import {useEffect, useState} from "react";
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 模拟加载时间
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // 3.5秒后隐藏loading

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            {loading ? <LoadingScreen /> : <HomePage />}
        </div>
    );
}

export default App;