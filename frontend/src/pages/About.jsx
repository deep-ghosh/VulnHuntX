import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSpring, animated } from "@react-spring/web";
// import teamVideo from "../../assets/videos/team.mp4";
// import missionBg from "../../assets/images/missionBg.jpg";
// import animationData from "../../assets/Animation/aniAbout.json";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const videoRef = useRef(null);

  // React Spring for section headings
  const [missionSpringProps] = useSpring(() => ({
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 170, friction: 26 },
  }));

  const [teamSpringProps] = useSpring(() => ({
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 170, friction: 26 },
  }));

  // GSAP Scroll-triggered animations
  useEffect(() => {
    const teamElement = teamRef.current;
    const videoElement = videoRef.current;

    if (teamElement) {
      gsap.fromTo(
        teamElement,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: teamElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    if (videoElement) {
      gsap.fromTo(
        videoElement,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top bottom",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="dark:bg-[#0D121C] w-full">
      {/* Container for the entire About page */}
      <div className="max-w-7xl mx-auto min-h-screen">
        <h1 className="text-4xl dark:text-white text-center py-8">About Us</h1>

        {/* Mission Section */}
        {/* <section
          ref={missionRef}
          className="relative h-screen flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${missionBg})` }}
        > */}
        <animated.h1
          style={missionSpringProps}
          className="text-6xl text-white font-bold"
        >
          Our Mission
        </animated.h1>

        {/* Who We Are Section */}
        <section className="h-screen flex flex-col justify-center items-center bg-[#020300] text-white">
          <div className="text-center space-y-8 px-4">
            {/* <Lottie animationData={animationData} className="mx-auto w-[300px]" /> */}
            <h2 className="text-4xl font-semibold">Who We Are</h2>
            <p className="text-2xl max-w-2xl">
              We are a passionate team of cybersecurity experts dedicated to
              pushing the boundaries of fuzzing technology. Our mission is to
              expose vulnerabilities before attackers do.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section
          ref={teamRef}
          className="relative h-screen flex justify-center items-center"
        >
          {/* <video
            ref={videoRef}
            src={teamVideo}
            muted
            autoPlay
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          /> */}
          <animated.h1
            style={teamSpringProps}
            className="text-6xl text-white font-bold z-10"
          >
            Meet the Team
          </animated.h1>
        </section>

        {/* Values Section */}
        <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
          <h2 className="text-5xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="text-xl">
              <h3 className="text-3xl font-semibold">Innovation</h3>
              <p>
                Pushing the envelope of what's possible in security testing.
              </p>
            </div>
            <div className="text-xl">
              <h3 className="text-3xl font-semibold">Integrity</h3>
              <p>
                Operating with the highest ethical standards in everything we
                do.
              </p>
            </div>
            <div className="text-xl">
              <h3 className="text-3xl font-semibold">Excellence</h3>
              <p>
                Delivering unparalleled quality and expertise to our clients.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
