import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Gallery.css";
import { FaImages } from "react-icons/fa";

function ImageGallery() {
  const [images, setImages] = useState([
    { id: "image-1", src: "/image-1.webp", isFeature: true, selected: false },
    { id: "image-2", src: "image-2.webp", isFeature: false, selected: false },
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, movedImage);
    setImages(updatedImages);
  };

  const toggleFeature = (imageId) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isFeature: image.id === imageId,
    }));
    setImages(updatedImages);
  };

  const handleSelectImage = (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        return { ...image, selected: !image.selected };
      }
      return image;
    });
    setImages(updatedImages);
  };

  const areAnyImagesSelected = images.some((image) => image.selected);

  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
  };

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

  return (
    <div className="imageGalleryWrap">
      <h2 className="gallaryHeadline">Image Gallery</h2>
      <div className="imageGallery">
        <div className="galleryTopBar">
          <div className="selectedItemWrap">
            <input
              type="checkbox"
              checked={areAnyImagesSelected}
              onChange={() => {
                const updatedImages = images.map((image) => ({
                  ...image,
                  selected: !areAnyImagesSelected,
                }));
                setImages(updatedImages);
              }}
            />
            <h3> {images.filter((image) => image.selected).length} Files Selected</h3>
          </div>
          <button onClick={deleteSelectedImages}>Delete Files</button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="gallery"
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`img ${
                          image.selected ? "selected-image" : ""
                        }`}
                        onClick={() => handleSelectImage(image.id)}
                      >
                        <input
                          type="checkbox"
                          checked={image.selected}
                          onChange={() => handleSelectImage(image.id)}
                          className="checkBox"
                        />
                        <img
                          src={image.src}
                          alt="gallery"
                          className={`w-full h-auto ${
                            image.isFeature ? "feature-image" : "other-image"
                          }`}
                          style={{ pointerEvents: image.selected ? "none" : "auto" }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default ImageGallery;
