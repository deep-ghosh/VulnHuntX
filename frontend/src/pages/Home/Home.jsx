import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import homeBg from "../../assets/videos/homeBg.mp4";
import vid from "../../assets/videos/BottomScroll.mp4";
// import vid from "../../assets/videos/stockbg.mp4";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSpring, animated } from "@react-spring/web";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation/ani3.json";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef(null);
  const lastSectionRef = useRef(null); // Ref for the last section
  const lastSectionVideoRef = useRef(null); // Ref for the background video in the last section
  const navigate = useNavigate();

  const messages = [
    "Is Your Data Truly Safe?",
    "Are You Vulnerable?",
    "Is Your Password Weak?",
  ];

  // Typing effect hook
  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delay = 2000;

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

  // GSAP scroll-trigger effect hook for video
  useEffect(() => {
    const videoElement = videoRef.current;
    const lastSectionVideoElement = lastSectionVideoRef.current;

    const onVideoLoaded = () => {
      if (videoElement) {
        const videoDuration = videoElement.duration || 0;

        gsap.to(videoElement, {
          currentTime: videoDuration,
          ease: "none",
          scrollTrigger: {
            trigger: videoElement,
            start: "top top",
            end: "+=" + videoDuration * 1000 + "px",
            scrub: true,
            onUpdate: (self) => {
              if (videoElement) {
                videoElement.currentTime = videoDuration * self.progress;
              }
            },
          },
        });

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

        if (lastSectionVideoElement) {
          gsap.fromTo(
            lastSectionVideoElement,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.5,
              scrollTrigger: {
                trigger: lastSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
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
  // const [springProps, api] = useSpring(() => ({
  //   from: { transform: "scale(0.5)", opacity: 0 },
  //   to: { transform: "scale(1)", opacity: 1 },
  //   config: { tension: 200, friction: 20 },
  // }));

  // useEffect(() => {
  //   ScrollTrigger.create({
  //     trigger: ".vuln-hunt-section",
  //     start: "top bottom",
  //     onEnter: () => api.start({ transform: "scale(1)", opacity: 1 }),
  //     onLeaveBack: () => api.start({ transform: "scale(0.5)", opacity: 0 }),
  //   });
  // }, [api]);

  // React Spring for VulnHuntX
  const [vulnHuntSpringProps, setVulnHuntSpring] = useSpring(() => ({
    transform: "scale(0.5)",
    opacity: 0,
    config: { tension: 200, friction: 20 },
  }));

  // React Spring for INTRODUCING
  const [introducingSpringProps, setIntroducingSpring] = useSpring(() => ({
    transform: "scale(0.5)",
    opacity: 0,
    config: { tension: 200, friction: 6 },
  }));

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".vuln-hunt-section",
      start: "top 80%", // Start animation when the section is near the viewport
      onEnter: () => {
        setVulnHuntSpring({ transform: "scale(1)", opacity: 1 });
        setIntroducingSpring({ transform: "scale(1)", opacity: 1 });
      },
      onLeaveBack: () => {
        setVulnHuntSpring({ transform: "scale(0.5)", opacity: 0 });
        setIntroducingSpring({ transform: "scale(0.5)", opacity: 0 });
      },
    });
  }, [setVulnHuntSpring, setIntroducingSpring]);

  // GSAP scroll-trigger effect hook for background fade-in
  // useEffect(() => {
  //   const lastSectionElement = lastSectionRef.current;

  //   gsap.fromTo(
  //     ".background-fade",
  //     { opacity: 0 },
  //     {
  //       opacity: 1,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: lastSectionElement,
  //         start: "top center",
  //         end: "bottom top",
  //         scrub: true,
  //       },
  //     }
  //   );
  // }, []);

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

              <div className="flex flex-col lg:flex-row justify-between bg-gradient-to-l hover:bg-gradient-to-tr from-orange-400 via-pink-400 to-blue-500 rounded-lg space-y-4 lg:space-y-0 p-[4px] mt-20 w-4/5">
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
                  className="bg-white rounded-md lg:rounded-e-md lg:rounded-s-none px-8 py-6 text-xl font-medium flex items-center gap-4 justify-center active:scale-95 duration-200 hover:gap-x-6 hover:bg-gradient-to-t hover:from-yellow-300 hover:to-orange-500"
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
            <section className="h-screen flex justify-center items-center ">
              <h1 className="text-7xl tracking-[0.4em] font-bold  font-pixelify text-transparent bg-gradient-to-r from-emerald-400 via-[#e6ab2d] to-[#e760f1] bg-clip-text">
                Move Beyond
              </h1>
            </section>

            {/* Section 2: Detecting Cyberattacks */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-7xl tracking-[0.2em] font-bold font-pixelify text-transparent bg-gradient-to-r from-emerald-400 via-[#ece22b] to-[#31d42b] bg-clip-text">
                Detecting Cyberattacks
              </h1>
            </section>

            {/* Section 3: Predicting Cyberattacks */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-7xl tracking-[0.2em] font-bold font-pixelify text-transparent bg-gradient-to-r from-[#d42b60] via-[#ece22b] to-[#2baad4] bg-clip-text">
                Predicting Cyberattacks
              </h1>
            </section>

            {/* Section 4: Self-Heal From Cyber Attacks */}
            <section className="h-screen flex justify-center items-center">
              <h1 className="text-7xl tracking-widest font-bold font-pixelify text-transparent bg-gradient-to-r from-red-400 via-[#ece22b] to-[#31d42b] bg-clip-text">
                Self-Heal From Cyber Attacks
              </h1>
            </section>

            {/* Section 5: VulnHuntX */}
            <section className="h-screen w-full flex flex-col justify-center items-center">
              {/* Full-Screen Background Video */}
              <video
                muted
                ref={lastSectionVideoRef}
                src={homeBg}
                autoPlay
                loop
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                style={{ objectFit: "cover" }}
              >
                Your browser does not support the video tag.
              </video>
              <Lottie
                loop
                animationData={animationData}
                style={{ width: "100vw", height: "100vh" }}
                className="absolute"
              />
              <animated.div
                style={introducingSpringProps}
                className="text-[2rem] md:text-[4rem] lg:text-[6rem] font-bold tracking-widest leading-tighter introducing-text"
              >
                I N T R O D U C I N G
              </animated.div>
              <animated.div
                style={vulnHuntSpringProps}
                className="text-8xl md:text-[8rem] lg:text-[8rem] font-bold leading-tight vuln-hunt-text"
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
