import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.css';

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // 设置初始状态
        gsap.set(titleRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            filter: "blur(5px)"
        });

        gsap.set([subtitleRef.current, descriptionRef.current, ctaRef.current], {
            opacity: 0,
            y: 100,
            rotationX: 15
        });

        // 设置标题字符的初始状态为可见
        // const titleChars = titleRef.current?.querySelectorAll('.char');
        // if (titleChars) {
        //     gsap.set(titleChars, {
        //         opacity: 1,
        //         y: 0,
        //         rotationX: 0,
        //         scale: 1,
        //         filter: "blur(5px)"
        //     });
        // }

        // 副标题动画
        tl.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.6");

        // 描述文字动画
        tl.to(descriptionRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.4");

        // CTA按钮动画
        tl.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.2");

        // 鼠标移动视差效果
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            gsap.to(titleRef.current, {
                rotationX: y * 5,
                rotationY: x * 5,
                duration: 1,
                ease: "power2.out"
            });

            gsap.to(subtitleRef.current, {
                x: x * 20,
                y: y * 10,
                duration: 1.5,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 滚动动画
        ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(titleRef.current, {
                    scale: 1 - progress * 1.5,
                    opacity: 1 - progress * 0.7,
                    filter: `blur(${progress * 240}px)`,
                    duration: 1.2
                });
            }
        });

        return () => {
            tl.kill();
            window.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // 创建字母分割函数
    const createChars = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
        ));
    };

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="home-page" ref={heroRef}>
                <div className="hero-content">
                    <div className="hero-title" ref={titleRef}>
                        <h1 className="main-title" data-text="CREATIVE DEVELOPER">
                            {createChars('CREATIVE')} <br />
                            {createChars('DEVELOPER')}
                        </h1>
                    </div>

                    <div className="hero-subtitle" ref={subtitleRef}>
                        <h2> Explore More 👇 </h2>
                    </div>

                    {/*<div className="hero-description" ref={descriptionRef}>*/}
                    {/*    <p>*/}
                    {/*        Crafting immersive digital experiences through*/}
                    {/*        <br />*/}
                    {/*        innovative design and cutting-edge technology*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    <div className="hero-cta" ref={ctaRef}>
                        <button className="explore-btn" onClick={scrollToNext}>
                            <span>EXPLORE WORK</span>
                            <div className="btn-bg"></div>
                        </button>
                    </div>
                </div>

                <div className="hero-bg"></div>

                {/* 装饰元素 */}
                <div className="decorative-elements">
                    <div className="floating-element element-1"></div>
                    <div className="floating-element element-2"></div>
                    <div className="floating-element element-3"></div>
                </div>

                {/* 滚动指示器 */}
                <div className="scroll-indicator">
                    <div className="scroll-line"></div>
                    <span>SCROLL</span>
                </div>
            </div>

            {/* 占位内容用于测试滚动 */}
            <div className="placeholder-content">
                <h2>Next Section</h2>
                <p>This is where your next content section would go...</p>
            </div>
        </>
    );
};

export default HomePage;