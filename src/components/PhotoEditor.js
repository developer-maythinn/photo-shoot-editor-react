import React, { useState } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import { Slider, Button, Typography, Box } from "@mui/material";
import ImgDialog from "./ImgDialog";
import getCroppedImg from "./CropImage";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "@/redux/PhotoShoot/PhotoSlice";

const PhotoEditor = ({ image }) => {
  const images = useSelector((state) => state.photos);
  const reduxImages = images;

  const [showEditor, setShowEditor] = useState(true);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const dispatch = useDispatch();
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("Cropped Image:", { croppedImage });
      setCroppedImage(croppedImage);
      dispatch(addImage(croppedImage));
      setShowEditor(true);
    } catch (e) {
      console.error(e);
      // setShowEditor(false);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
    dispatch(addImage(null));
    // setShowEditor(false);
  };

  return (
    <Box>
      {showEditor ? (
        <>
          {" "}
          <Box
            sx={{
              position: "relative",
              width: "50%",
              height: 200,
              background: "#333",
            }}
          >
            <Cropper
              image={image}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline">Zoom</Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline">Rotation</Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </Box>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
            >
              Show Result
            </Button>
          </Box>
        </>
      ) : null}

      {reduxImages?.length > 0 &&
        reduxImages.map((image, index) => {
          return (
            <React.Fragment key={index}>
              <img src={image} />
            </React.Fragment>
          );
        })}
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
    </Box>
  );
};

export default PhotoEditor;
