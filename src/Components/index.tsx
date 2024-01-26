import { Photo } from "./types";

import style from "./index.module.scss";
import { useState } from "react";
import { TransitionPhoto } from "./TransitionPhoto";
import { PreviewGallery } from "./PreviewGallery";
import { Navigation } from "./Navigation";

interface WebGalleryProps {
  photos: Photo[];
}

export const WebGallery: React.FC<WebGalleryProps> = ({ photos }) => {
  if (!photos.length) {
    return null;
  }

  const [indexActivePhoto, setIndexActivePhoto] = useState(0);
  const prevPhoto = photos[indexActivePhoto - 1];
  const nextPhoto = photos[indexActivePhoto + 1];

  return (
    <div className={style.webelartGallery}>
      <div className={style.webelartGalleryContainer}>
        <TransitionPhoto
          photos={photos}
          indexActivePhoto={indexActivePhoto}
        />
        <Navigation
          className={style.webelartGalleryNavigation}
          disabledPrev={!prevPhoto}
          disabledNext={!nextPhoto}
          onPrevClick={() => {
            setIndexActivePhoto(indexActivePhoto - 1);
          }}
          onNextClick={() => {
            setIndexActivePhoto(indexActivePhoto + 1);
          }}
        />
      </div>
      <PreviewGallery
        activePhotoIndex={indexActivePhoto}
        photos={photos}
        className={style.webelartGalleryPreviewList}
        setNewPhoto={setIndexActivePhoto}
      />
    </div>
  );
};
