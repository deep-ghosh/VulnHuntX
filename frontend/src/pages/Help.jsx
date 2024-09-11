import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Help = () => {
  const [helpSpringProps] = useSpring(() => ({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 180, friction: 30 },
  }));

  return (
    <div className="dark:bg-[#0D121C] w-full">
      {/* Help Page Container */}
      <div className="max-w-7xl mx-auto min-h-screen px-4 py-12">
        <animated.h1
          style={helpSpringProps}
          className="text-4xl dark:text-white text-center pb-8"
        >
          How Can We Help You?
        </animated.h1>

        {/* FAQ Section */}
        <section className="space-y-6">
          <div className="bg-[#020300] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">What is VulnHuntX?</h2>
            <p>
              VulnHuntX is a cutting-edge platform that focuses on identifying
              vulnerabilities using advanced fuzzing techniques. Our mission is
              to secure your systems before attackers can find any weaknesses.
            </p>
          </div>

          <div className="bg-[#020300] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              How do I get started?
            </h2>
            <p>
              Simply sign up for an account, navigate to the dashboard, and
              start scanning for vulnerabilities. You can also find detailed
              documentation to guide you through the process.
            </p>
          </div>

          <div className="bg-[#020300] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              What does fuzzing mean?
            </h2>
            <p>
              Fuzzing is a software testing technique that involves providing
              invalid, unexpected, or random data to the inputs of a program.
              The goal is to detect bugs, security loopholes, and crashes.
            </p>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold dark:text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-lg dark:text-gray-300 mb-4">
            If you have any other questions or need further assistance, feel
            free to contact our support team.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=latenightcoder1@gmail.com"
            target="_blank"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700"
          >
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
};

export default Help;
