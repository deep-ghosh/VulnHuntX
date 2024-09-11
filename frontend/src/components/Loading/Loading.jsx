import "./Loading.css"; // Create this CSS file for styling
// import loadingVid from "../../assets/gifs/load.mp4";
import loadingVid2 from "../../assets/gifs/newLoad.mp4";
const Loading = () => {
  return (
    <div className="loading-overlay">
      <video
        className=" w-full h-full object-fill bg-cover absolute top-0 left-0"
        muted
        loop
        autoPlay
        src={loadingVid2}
      ></video>
    </div>
  );
};

export default Loading;
