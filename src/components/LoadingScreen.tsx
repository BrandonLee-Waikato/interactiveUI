import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // 初始状态
        gsap.set([textRef.current, dotsRef.current, progressRef.current], {
            opacity: 0,
            y: 30
        });

        // 进入动画
        tl.to([textRef.current, dotsRef.current], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
        })
            .to(progressRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5");

        // 进度条动画
        let progress = { value: 0 };
        gsap.to(progress, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (progressRef.current && percentRef.current) {
                    const progressBar = progressRef.current.querySelector('.progress-fill') as HTMLElement;
                    const percent = Math.round(progress.value);

                    progressBar.style.width = `${percent}%`;
                    percentRef.current.textContent = `${percent}%`;
                }
            }
        });

        // 加载点动画
        gsap.to(dotsRef.current?.children || [], {
            scale: 1.2,
            opacity: 0.6,
            duration: 0.6,
            ease: "power2.inOut",
            stagger: 0.1,
            repeat: -1,
            yoyo: true
        });

        // 退出动画
        gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power3.inOut",
            delay: 3
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="loading-screen" ref={containerRef}>
            <div className="loading-content">
                <div className="loading-text" ref={textRef}>
                    <h1>CREATIVE DEVELOPER</h1>
                    <p>Loading Experience</p>
                </div>

                <div className="loading-dots" ref={dotsRef}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="progress-container" ref={progressRef}>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <span className="progress-percent" ref={percentRef}>0%</span>
                </div>
            </div>

            <div className="loading-bg"></div>
        </div>
    );
};

export default LoadingScreen;