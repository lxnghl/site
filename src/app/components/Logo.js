"use client"; // Required for animations in Next.js

import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

const Logo = () => {
    useEffect(() => {
        // Animate the logo
        gsap.fromTo(
            ".logo",
            { scale: 0.8, rotation: 0 }, // Start state
            {
                scale: 1.2,
                // rotation: 360,
                duration: 2,
                ease: "elastic.out(0.75, 0.3)", // Bouncy animation
                repeat: -1, // Infinite loop
                yoyo: true, // Reverse on repeat
            }
        );
    }, []);

    return (
        <Image
            className="logo" // Add a className for targeting
            src="/logo.svg"
            alt="Logo"
            width={48}
            height={48}
            priority
        />
    );
};

export default Logo;
