import React, { useEffect } from 'react';
import '../styles/Home.scss';
import HomeCards from './HomeCards';

const Home: React.FC<{ darkMode: () => void }> = ({ darkMode }) => {
    useEffect(() => {
        document.body.style.backgroundColor = 'whitesmoke';

        darkMode();
    }, []);

    return (
        <div className="background">
            <div className="title">
                PlayLab
            </div>
            <div className="subtitle">
                감동적인 작품을 모두와 함께
            </div>
            <HomeCards />
        </div>
    )
}

export default Home;