import { Button } from "flowbite-react";

const Home = () => {
  const handleScan = async () => {
    const urlInput = document.querySelector('input[name="domain"]');
    const url = urlInput.value.trim();

    if (url) {
      try {
        const response = await fetch(`http://localhost:3000/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle the response data here
        console.log("Scan result:", data);
        alert(`Scan completed: ${JSON.stringify(data)}`);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred while scanning the URL. Please try again.');
      }
    } else {
      alert('Please enter a valid URL');
    }
  };

  return (
    <>
      <div className="dark:bg-[#0D121C] w-full">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center min-h-screen">
          <div className="p-10 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg space-y-6 mt-10">
            <h2 className="md:text-5xl text-3xl font-bold dark:text-white text-center">
              Welcome to 
              <span className="text-orange-500 font-semibold tracking-wider">
                VulnHunt
              </span>
            </h2>
            <h2 className="text-md md:text-xl text-gray-500 dark:text-gray-400 text-center">
              Scan for vulnerabilities by entering your website URL
            </h2>
            <div className="flex items-center space-x-4 p-5 bg-neutral-700 dark:bg-neutral-900 rounded-lg shadow-inner">
              <input
                type="text"
                name="domain"
                placeholder="Enter the URL"
                className="w-full h-12 rounded-lg outline-none px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                required
              />
              <Button
                onClick={handleScan}
                color="warning"
                size="lg"
                className="transform transition-transform duration-300 hover:scale-105"
              >
                Scan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
