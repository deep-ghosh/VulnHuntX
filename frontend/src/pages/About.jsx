import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSpring, animated } from "@react-spring/web";
// import teamVideo from "../../assets/videos/team.mp4";
// import missionBg from "../../assets/images/missionBg.jpg";
// import animationData from "../../assets/Animation/aniAbout.json";
import aboutVid from "../assets/videos/Vicon.mp4";
import deep from "../assets/TeamMembers/Deep.jpg";
import prachi from "../assets/TeamMembers/Prachi.jpg";
import snihita from "../assets/TeamMembers/snihita.jpg";
import anyket from "../assets/TeamMembers/Anyket.png";
import Krish from "../assets/TeamMembers/Krish.jpg";
import mania from "../assets/TeamMembers/mania.jpg";
// import {} from "../assets/TeamMembers/Deep.jpg"
import Lottie from "lottie-react";
import TeamCards from "../components/TeamCards";

// const images = [image1, image2, image3, image4];
// const [currentIndex, setCurrentIndex] = useState(0);

// const nextSlide = () => {
//   setCurrentIndex((prevIndex) =>
//     prevIndex === images.length - 1 ? 0 : prevIndex + 1
//   );
// };

// const prevSlide = () => {
//   setCurrentIndex((prevIndex) =>
//     prevIndex === 0 ? images.length - 1 : prevIndex - 1
//   );
// };

// useEffect(() => {
//   const interval = setInterval(nextSlide, 3000);
//   return () => clearInterval(interval);
// }, []);

const teamList = [
  {
    id: 1,
    name: "Deep Ghosh",
    role: "Team Lead",
    image: deep,
    description: "Leads the team towards project success.",
  },
  {
    id: 2,
    name: "Mania Rahman",
    role: "UI/UX Lead",
    image: mania,
    description: "Leads design and user experience strategies.",
  },
  {
    id: 3,
    name: "Snihita Nandi",
    role: "UI Expert & Video Editor",
    image: snihita,
    description: "Specializes in UI design and video editing.",
  },
  {
    id: 4,
    name: "Krish Gupta",
    role: "Lead Developer",
    image: Krish,
    description: "Heads the development of technical solutions.",
  },
  {
    id: 5,
    name: "Anyket Naskar",
    role: "Cyber Security Expert",
    image: anyket,
    description: "Secures systems against cyber threats.",
  },

  {
    id: 6,
    name: "Prachi Jha",
    role: "Marketing Manager",
    image: prachi,
    description: "Drives marketing strategies and campaigns.",
  },
];

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
    from: { opacity: 0, transform: "translateY(200px)" },
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
    <div className="dark:bg-[#020300] w-full">
      {/* Container for the entire About page */}
      <div className="max-w-7xl mx-auto min-h-screen">
        {/* <h1 className="text-7xl font-bold font-mono dark:text-white text-center py-8">
          About Us
        </h1> */}

        {/* Mission Section */}
        {/* <section
          ref={missionRef}
          className="relative h-screen flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${missionBg})` }}
        > */}

        <animated.h1
          style={missionSpringProps}
          className="text-6xl dark:text-white font-bold py-8"
        >
          Our Mission
        </animated.h1>

        {/* Who We Are Section */}
        <section className="relative h-screen rounded-xl flex flex-col justify-center items-center bg-[#020300]/90 dark:bg-neutral-900 text-white overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 object-cover opacity-40"
            src={aboutVid}
          />

          <div className="text-center space-y-8 px-4 z-10">
            {/* <Lottie animationData={animationData} className="mx-auto w-[300px]" /> */}
            <h2 className="text-7xl font-semibold">Who We Are</h2>
            <p className="text-2xl max-w-2xl">
              We are a passionate team of cybersecurity experts dedicated to
              pushing the boundaries of fuzzing technology. Our mission is to
              expose vulnerabilities before attackers do.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section
          // ref={teamRef}
          className="relative h-screen flex flex-col justify-center items-center"
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
            className="text-6xl dark:text-white font-bold z-10 py-8"
          >
            Meet the Team
          </animated.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamList.map((member) => (
              <TeamCards
                key={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
                description={member.description}
              />
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="h-screen rounded-xl mt-20 p-14 flex flex-col justify-evenly items-center text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
          <h2 className="text-7xl font-bold ">Our Core Values</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-2xl">
              <h3 className="text-3xl font-semibold">Innovation</h3>
              <p>
                Pushing the envelope of what's possible in security testing.
              </p>
            </div>
            <div className="text-2xl">
              <h3 className="text-3xl font-semibold">Integrity</h3>
              <p>
                Operating with the highest ethical standards in everything we
                do.
              </p>
            </div>
            <div className="text-2xl">
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
