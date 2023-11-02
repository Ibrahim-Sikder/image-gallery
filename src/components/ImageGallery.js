import React, { useState } from "react";
import "./Gallery.css";
import { FaImages } from "react-icons/fa";

function ImageGallery() {
  const [images, setImages] = useState([
    { id: "image-1", src: "/image-1.webp", isFeature: true, selected: false },
    { id: "image-2", src: "/image-2.webp", isFeature: true, selected: false },
    { id: "image-3", src: "image-3.webp", isFeature: false, selected: false },
    { id: "image-4", src: "image-4.webp", isFeature: false, selected: false },
    { id: "image-5", src: "image-5.webp", isFeature: false, selected: false },
    { id: "image-6", src: "image-6.webp", isFeature: false, selected: false },
    { id: "image-7", src: "image-7.webp", isFeature: false, selected: false },
    { id: "image-8", src: "image-8.webp", isFeature: false, selected: false },
    { id: "image-9", src: "image-9.webp", isFeature: false, selected: false },
    { id: "image-10", src: "image-10.jpeg", isFeature: false, selected: false },
    { id: "image-11", src: "image-11.jpeg", isFeature: false, selected: false },
  ]);

  const [draggedImage, setDraggedImage] = useState(null);
// drag and drop
  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    const updatedImages = images.slice();
    const draggedIndex = updatedImages.findIndex((image) => image === draggedImage);
    const targetIndex = updatedImages.findIndex((image) => image === targetImage);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(targetIndex, 0, draggedImage);
      setImages(updatedImages);
    }

    setDraggedImage(null);
  };
// selected iamge 
  const handleSelectImage = (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        return { ...image, selected: !image.selected };
      }
      return image;
    });
    setImages(updatedImages);
  };
// delelte selected image
  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
  };
// image upload 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newId = `image-${images.length + 1}`;
      const newImage = {
        id: newId,
        src: URL.createObjectURL(file),
        isFeature: false,
        selected: false,
      };
      setImages([...images, newImage]);
      e.target.value = null;
    }
  };
// selected count 
  const selectedImageCount = images.filter((image) => image.selected).length;
  const isAnyImageSelected = selectedImageCount > 0;
  const showGallery = !isAnyImageSelected;

  return (
    <div className="imageGalleryWrap">
      <div className="imageGallery">
        {showGallery ? (
          <h2 className="galleryHead galleryTopBar">Gallery</h2>
        ) : (
          <div className="galleryTopBar">
            <div className="selectedItemWrap">
              <input
                type="checkbox"
                checked={selectedImageCount === images.length}
                onChange={() => {
                  const updatedImages = images.map((image) => ({
                    ...image,
                    selected: !isAnyImageSelected,
                  }));
                  setImages(updatedImages);
                }}
              />
              <h2 className="galleryHeadline">
                {`${selectedImageCount} Files Selected`}
              </h2>
            </div>
            <button onClick={deleteSelectedImages}>Delete Files</button>
          </div>
        )}
        <div className="gallery">
          {images.map((image) => (
            <div
              key={image.id}
              className={`img ${image.selected ? "selected-image" : ""}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, image)}
              onClick={() => handleSelectImage(image.id)}
            >
              {showGallery ? null : (
                <input
                  type="checkbox"
                  checked={image.selected}
                  onChange={() => handleSelectImage(image.id)}
                  className="checkBox"
                />
              )}
              <img
                src={image.src}
                alt="gallery"
                className={`gallery-image ${
                  image.isFeature ? "feature-image" : "other-image"
                }`}
              />
            </div>
          ))}
         
            <div
              className="img add-image-button-container"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <label htmlFor="imageUpload" className="add-image-button">
                <FaImages />
                <span>Add Image</span>
              </label>
              <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden hiddenFile"
          id="imageUpload"
        />
            </div>
         
        </div>
       
      </div>
    </div>
  );
}

export default ImageGallery;
