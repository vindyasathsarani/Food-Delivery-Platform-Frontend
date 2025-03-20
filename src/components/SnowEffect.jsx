import React, { useEffect, useState } from 'react';
import './SnowEffect.css';

const SnowEffect = () => {
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;  // December check
    if (currentMonth === 12) {
      setShowSnow(true);
    }
  }, []);

  return (
    showSnow && (
      <div className="snowflakes">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            className="snowflake"
            key={index}
            style={{
              left: `${Math.random() * 100}vw`,  // Random horizontal positioning
              animationDuration: `${5 + Math.random() * 10}s`,  // Random fall speed
              fontSize: `${Math.random() * 1.5 + 0.5}em`  // Random snowflake size
            }}
          >
            ❄️
          </div>
        ))}
      </div>
    )
  );
};

export default SnowEffect;
