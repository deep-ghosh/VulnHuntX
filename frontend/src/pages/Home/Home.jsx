import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import homeBg from "../../assets/videos/homeBg.mp4";
import vid from "../../assets/videos/BottomScroll.mp4";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSpring, animated } from "@react-spring/web";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const messages = [
    "Is Your Data Truly Safe?",
    "Are You Vulnerable?",
    "Is Your Password Weak?",
  ];

  // Typing effect hook
  useEffect(() => {
    const typingSpeed = 100; // Speed of typing
    const deletingSpeed = 50; // Speed of deleting
    const delay = 2000; // Delay before deleting starts

    const handleTypingEffect = () => {
      const currentMessage = messages[currentMessageIndex];

      if (!isDeleting) {
        setDisplayedText((prev) => {
          const newText = currentMessage.substring(0, prev.length + 1);
          if (newText === currentMessage) {
            setTimeout(() => setIsDeleting(true), delay);
          }
          return newText;
        });
      } else {
        setDisplayedText((prev) => {
          const newText = currentMessage.substring(0, prev.length - 1);
          if (newText === "") {
            setIsDeleting(false);
            setCurrentMessageIndex(
              (prevIndex) => (prevIndex + 1) % messages.length
            );
          }
          return newText;
        });
      }
    };

    const typingInterval = setInterval(
      handleTypingEffect,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearInterval(typingInterval);
  }, [displayedText, isDeleting, currentMessageIndex, messages]);

  // GSAP scroll-trigger effect hook
  useEffect(() => {
    const videoElement = videoRef.current;

    const onVideoLoaded = () => {
      if (videoElement) {
        const videoDuration = videoElement.duration || 0;

        // GSAP scroll-triggered animation for video
        gsap.to(videoElement, {
          currentTime: videoDuration,
          ease: "none",
          scrollTrigger: {
            trigger: videoElement,
            start: "top top",
            end: "+=" + videoDuration * 1000 + "px", // Ensuring smooth scroll effect for video
            scrub: true,
            onUpdate: (self) => {
              if (videoElement) {
                videoElement.currentTime = videoDuration * self.progress;
              }
            },
          },
        });

        // Initial fade-in effect
        gsap.fromTo(
          videoElement,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "+=100vh",
              scrub: true,
            },
          }
        );
      }
    };

    videoElement.addEventListener("loadeddata", onVideoLoaded);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", onVideoLoaded);
      }
    };
  }, []);

  // URL validation function
  const isValidUrl = (inputUrl) => {
    try {
      const formattedUrl =
        inputUrl.startsWith("http://") || inputUrl.startsWith("https://")
          ? inputUrl
          : `https://${inputUrl}`;
      new URL(formattedUrl);
      return true;
    } catch {
      return false;
    }
  };

  // Handle URL scanning
  const handleScan = async () => {
    if (!url || !isValidUrl(url)) {
      setErrorMessage("Invalid URL");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    try {
      const response = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      navigate("/result", { state: { scanResults: data.result } });

      setUrl("");
    } catch (error) {
      setErrorMessage(
        error.message ||
          "An error occurred while scanning the URL. Please try again."
      );
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setUrl(event.target.value);
    setErrorMessage("");
  };

  // React Spring for VulnHuntX
  const [springProps, api] = useSpring(() => ({
    from: { transform: "scale(0.5)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".vuln-hunt-section",
      start: "top bottom",
      onEnter: () => api.start({ transform: "scale(1)", opacity: 1 }),
      onLeaveBack: () => api.start({ transform: "scale(0.5)", opacity: 0 }),
    });
  }, [api]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full-Screen Background Video */}
      <video
        muted
        src={homeBg}
        autoPlay
        loop
        className="fixed top-0 left-0 w-full h-screen z-[-2]"
        style={{ objectFit: "cover" }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Scroll-Controlled Video */}
      <video
        ref={videoRef}
        src={vid}
        muted
        className="fixed top-0 left-0 w-full h-screen z-[-1]"
        style={{ objectFit: "cover" }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col lg:flex-row justify-center h-screen lg:gap-6">
            <div className="p-6 md:p-10 duration-200 w-full h-fit flex flex-col items-center">
              <div className="text-center h-32">
                <h2 className="animated-text w-fit text-8xl">
                  {displayedText}
                </h2>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mt-20 flex flex-col items-center gap-4">
                <span>Expose Weak Spots</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-[#e560f1]">
                  And
                </span>
                <span>Uncover Risks Within Seconds!</span>
              </h2>

              <div className="flex flex-col lg:flex-row justify-between dark:bg-gray-800 bg-orange-400 rounded-lg space-y-4 lg:space-y-0 p-4 mt-20 w-4/5">
                <input
                  type="text"
                  name="domain"
                  value={url}
                  onChange={handleChange}
                  placeholder="Enter Website URL"
                  className={`w-full rounded-md lg:rounded-s-md lg:rounded-e-none outline-none placeholder:text-gray-400 placeholder:text-2xl placeholder:pl-10 border-none p-4 ${
                    errorMessage ? "border-red-500 border-2 text-red-500" : ""
                  }`}
                  required
                />
                <button
                  type="submit"
                  onClick={handleScan}
                  className="bg-yellow-300 dark:bg-orange-400 rounded-md lg:rounded-e-md lg:rounded-s-none px-8 py-6 text-xl font-medium flex items-center gap-4 justify-center active:scale-95 duration-200"
                >
                  <IoSearch className="w-6 h-6" />
                  SCAN
                </button>
              </div>
              {errorMessage && (
                <div className="text-red-500 font-semibold text-center mt-4">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>

          {/* New Sections */}
          <div className="w-full">
            {/* Section 1: Move Beyond */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
                Move Beyond
              </h1>
            </section>

            {/* Section 2: Detecting Cyberattacks */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
                Detecting Cyberattacks
              </h1>
            </section>

            {/* Section 3: Predicting Cyberattacks */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
                Predicting Cyberattacks
              </h1>
            </section>

            {/* Section 4: Self-Heal From Cyber Attacks */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
                Self-Heal From Cyber Attacks
              </h1>
            </section>

            {/* <section className="h-screen flex flex-col justify-center items-center">
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
                INTRODUCING
              </h1>
              <h1 className="text-[10rem] font-bold text-neutral-900 dark:text-white">
                VULNHUNTX
              </h1>
            </section> */}

            <section className="h-screen flex flex-col justify-center items-center vuln-hunt-section">
              <div className="text-center mb-4">
                {/* Introducing Text */}
                <h1>
                  <animated.div
                    style={springProps}
<<<<<<< HEAD
                    className="introducing-text"
=======
                    className="text-[4rem] md:text-[4rem] lg:text-[6rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest leading-tight vuln-hunt-text"
>>>>>>> 009f999d3e3f9e2a285cc9d642d6824792012771
                  >
                    INTRODUCING
                  </animated.div>
                </h1>
              </div>
              <animated.div
                style={springProps}
                className="text-8xl md:text-[12rem] lg:text-[15rem] font-bold leading-tight vuln-hunt-text"
              >
                VulnHuntX
              </animated.div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;