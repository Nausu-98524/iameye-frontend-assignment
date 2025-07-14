import React, { useEffect, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import fetchData from "../../service/service";
import toast from "react-hot-toast";

const ImageUpload = ({ imageUrl, onUploadComplete }) => {
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const [imageLoader, setImageLoader] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType) return toast.error("Only JPG or PNG files allowed.");
    if (!isValidSize) return toast.error("File size must be less than 5 MB.");
    handleUpload(file);
  };

  const handleEyeClick = () => {
    window.open(previewUrl);
  };

  const handleUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    setImageLoader(true);
    const response = await fetchData("/upload-image", formData);
    setImageLoader(false);

    if (response.success) {
      const imageUrl = response.imageUrl;
      setPreviewUrl(imageUrl);
      onUploadComplete(imageUrl);
    }
  };

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <div className="flex items-center gap-2">
          Upload Image
          {!imageLoader ? (
            <>
              {previewUrl !== "" && (
                <FaRegEye
                  title="Preview Image"
                  className="cursor-pointer text-lg"
                  onClick={handleEyeClick}
                />
              )}
            </>
          ) : (
            <div className="mini-loader"></div>
          )}
        </div>
      </label>

      <section className="h-full overflow-auto w-full flex flex-col">
        <header className="border-dashed border-2 border-gray-400 md:py-12 py-5 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Drag and drop your</span>&nbsp;
            <span>files anywhere or</span>
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => fileInputRef.current.click()}
          >
            Upload a Image
          </button>
        </header>

        <div className="flex justify-between mt-1 text-sm">
          <div>Accept only JPG/PNG</div>
          <div>Max size: 5 MB</div>
        </div>
      </section>
    </div>
  );
};

export default ImageUpload;
