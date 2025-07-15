import React, { useEffect, useRef, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import fetchData from "../../service/service";
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";

const VideoUpload = ({ videoUrl, onUploadComplete, video_public_id }) => {
  const [videoDetails, setVideodetails] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [videoLoader, setVideoLoader] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideodetails(file);
    const isValidType = ["video/mp4", "video/quicktime"].includes(file.type);
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) return toast.error("Only MP4 or MOV files allowed.");
    if (!isValidSize) return toast.error("Video size must be less than 10 MB.");

    handleUpload(file);
  };

  const handleEyeClick = () => {
    window.open(previewUrl);
  };

  const handleUpload = async (videoFile) => {
    const formData = new FormData();
    formData.append("video", videoFile);
    setVideoLoader(true);
    const response = await fetchData("/upload-video", formData);
    setVideoLoader(false);

    if (response.success) {
      const videoUrl = response.videoUrl;

      setPreviewUrl(videoUrl);
      onUploadComplete(videoUrl, response.video_public_id);
    } else {
      toast.error(response.message || "Video upload failed.");
    }
  };

  useEffect(() => {
    setPreviewUrl(videoUrl);
  }, [videoUrl]);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            Upload Video
            {!videoLoader ? (
              <>
                {previewUrl !== "" && (
                  <FaRegCirclePlay
                    title="Preview Video"
                    className="cursor-pointer text-lg"
                    onClick={handleEyeClick}
                  />
                )}
              </>
            ) : (
              <div className="mini-loader"></div>
            )}
          </div>

          {videoDetails !== null && (
            <div>
              <IoMdCloseCircleOutline
                title="remove Video"
                className="cursor-pointer text-lg"
                onClick={() => {
                  setVideodetails(null);
                  setPreviewUrl("");
                }}
              />
            </div>
          )}
        </div>
      </label>

      <section className="h-full overflow-auto w-full flex flex-col">
        {videoDetails === null ? (
          <header className="border-dashed border-2 bg-white border-gray-400 md:py-5 py-5 flex flex-col justify-center items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.mov"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={() => fileInputRef.current.click()}
            >
              Upload a Video
            </button>
          </header>
        ) : (
          <header className="border-dashed border-2 bg-white border-gray-400 md:py-5 py-5 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>{videoDetails?.name}</span>
            </p>
          </header>
        )}

        <div className="flex justify-between mt-1 text-sm">
          <div>Accept only MP4/MOV</div>
          <div>Max size: 10 MB</div>
        </div>
      </section>
    </div>
  );
};

export default VideoUpload;
