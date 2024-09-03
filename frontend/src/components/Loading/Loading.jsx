import "./Loading.css"; // Create this CSS file for styling
import loadingVid from "../../assets/gifs/load.mp4";
const Loading = () => {
  return (
    <div className="loading-overlay">
      <video
        className=" w-full h-full bg-cover absolute top-0 left-0"
        muted
        loop
        autoPlay
        src={loadingVid}
      ></video>
    </div>
  );
};

export default Loading;
