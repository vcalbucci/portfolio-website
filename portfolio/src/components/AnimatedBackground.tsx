import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const isVisible = useRef(true);
  const isPageVisible = useRef(true);
  const lastFrameTime = useRef(0);
  const frameInterval = useRef(16.67);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        mousePos.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        
        mousePos.current.x = Math.max(0, Math.min(canvas.width, mousePos.current.x));
        mousePos.current.y = Math.max(0, Math.min(canvas.height, mousePos.current.y));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden;
      if (!isPageVisible.current && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      } else if (isPageVisible.current && isVisible.current && !animationRef.current) {
        drawTopographicalLines();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
          if (!entry.isIntersecting && animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = undefined;
          } else if (entry.isIntersecting && isPageVisible.current && !animationRef.current) {
            drawTopographicalLines();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (canvas) {
      observer.observe(canvas);
    }

    const detectPerformance = () => {
      let targetFPS = 60;
      
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      
      if (cores <= 2 || memory <= 2) {
        targetFPS = 30;
      } else if (cores <= 4 || memory <= 4) {
        targetFPS = 45;
      } else {
        targetFPS = 60;
      }
      
      frameInterval.current = 1000 / targetFPS;
    };

    detectPerformance();

    const drawTopographicalLines = (currentTime = 0) => {
      if (currentTime - lastFrameTime.current < frameInterval.current) {
        if (isVisible.current && isPageVisible.current) {
          animationRef.current = requestAnimationFrame(drawTopographicalLines);
        }
        return;
      }
      
      lastFrameTime.current = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const lines = 12;
      const spacing = Math.min(canvas.width, canvas.height) / lines;

      const rootElement = document.documentElement;
      const hasManualTheme = rootElement.classList.contains('light-mode') || rootElement.classList.contains('dark-mode');
      let isDarkMode;
      
      if (hasManualTheme) {
        isDarkMode = rootElement.classList.contains('dark-mode');
      } else {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      const waveColor = isDarkMode ? '255, 255, 153' : '55, 62, 85';

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${waveColor}, ${0.1 + (i / lines) * 0.15})`;
        ctx.lineWidth = 1 + (i / lines) * 1.5;

        const linePoints: number[] = [];
        for (let x = 0; x <= canvas.width; x += 8) {
          let y = canvas.height * 0.5 + 
                  Math.sin(x * 0.005 + time + i * 0.3) * (spacing * 1.0) +
                  Math.sin(x * 0.002 + time * 1.5 + i * 0.2) * (spacing * 0.5);
          
          y += Math.sin(x * 0.01 + time * 2 + i) * 12;
          
          linePoints.push(y);
        }
        
        const maxInfluence = 200;
        for (let pointIndex = 0; pointIndex < linePoints.length; pointIndex++) {
          const x = pointIndex * 8;
          let y = linePoints[pointIndex];
          
          const mouseDistance = Math.sqrt(
            Math.pow(x - mousePos.current.x, 2) + Math.pow(y - mousePos.current.y, 2)
          );
          
          if (mouseDistance < maxInfluence) {
            const influence = (maxInfluence - mouseDistance) / maxInfluence;
            const smoothInfluence = Math.sin(influence * Math.PI * 0.5);
            const pushStrength = smoothInfluence * 32.5;
            
            const angle = Math.atan2(y - mousePos.current.y, x - mousePos.current.x);
            const displacement = Math.sin(angle) * pushStrength * 0.3 + Math.cos(angle * 0.5) * pushStrength * 0.7;
            
            linePoints[pointIndex] += displacement;
            const spreadRange = 3;
            for (let spread = 1; spread <= spreadRange; spread++) {
              const spreadInfluence = (1 - spread / spreadRange) * 0.4;
              
              if (pointIndex - spread >= 0) {
                linePoints[pointIndex - spread] += displacement * spreadInfluence;
              }
              if (pointIndex + spread < linePoints.length) {
                linePoints[pointIndex + spread] += displacement * spreadInfluence;
              }
            }
          }
        }
        
        for (let pointIndex = 0; pointIndex < linePoints.length; pointIndex++) {
          const x = pointIndex * 8;
          const y = linePoints[pointIndex];
          
          if (pointIndex === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      const dotColor = isDarkMode ? '255, 255, 153' : '40, 45, 65';

      for (let i = 0; i < 15; i++) {
        const dotX = (Math.sin(time * 0.5 + i) * canvas.width * 0.3) + canvas.width * 0.5;
        const dotY = (Math.cos(time * 0.3 + i * 1.5) * canvas.height * 0.2) + canvas.height * 0.5;
        
        const mouseDistance = Math.sqrt(
          Math.pow(dotX - mousePos.current.x, 2) + Math.pow(dotY - mousePos.current.y, 2)
        );
        
        let opacity = 0.08;
        if (mouseDistance < 100) {
          opacity = 0.25 * ((100 - mouseDistance) / 100);
        }
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(${dotColor}, ${opacity})`;
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isVisible.current && isPageVisible.current) {
        animationRef.current = requestAnimationFrame(drawTopographicalLines);
      }
    };

    drawTopographicalLines();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default AnimatedBackground; 