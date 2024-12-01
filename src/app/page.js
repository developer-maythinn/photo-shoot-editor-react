"use client";
import PhotoEditor from "@/components/PhotoEditor";
import { addImage } from "@/redux/PhotoShoot/PhotoSlice";
import Image from "next/image";
// import PhotoEditor from "@/components/PhotoEditor";
// import React, { useRef, useCallback, useState } from "react";
// import Webcam from "react-webcam";

// const PhotoShoot = () => {
//   const webcamRef = useRef(null);
//   const [image, setImage] = useState(null);

//   const videoConstraints = {
//     facingMode: "environment", // Use the back camera
//   };

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//   }, [webcamRef]);

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={videoConstraints}
//       />
//       <button onClick={capture}>Capture Photo</button>
//       {image && <img src={image} alt="Captured" />}
//       {image && <PhotoEditor image={image} />}
//     </div>
//   );
// };

// export default PhotoShoot;

import React, { useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";

const CameraOnClick = () => {
  // const images = useSelector((state) => state.photos);
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Track camera state
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  // const image = images && images[0];

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setIsCameraOpen(false);
    }
  }, [webcamRef]);
  console.log("v>>", image);
  return (
    <div>
      {!isCameraOpen && (
        <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
      )}
      {isCameraOpen && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user", // Change to "environment" for back camera
            }}
            style={{ width: 300, height: 300, objectFit: "cover" }}
          />
          <button onClick={capture}>Capture Photo</button>
          <button onClick={() => setIsCameraOpen(false)}>Close Camera</button>
        </>
      )}
      {/* {image && (
        <Image
          width={500}
          height={500}
          style={{ width: 300, height: 300, objectFit: "cover" }}
          src={image}
          alt="Captured"
        />
      )} */}
      {image && <PhotoEditor image={image} />}
    </div>
  );
};

export default CameraOnClick;
