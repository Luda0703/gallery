import cl from "classnames";
import { element } from "prop-types";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Photo, CommonClassProps } from "../types";
import style from "./index.module.scss";

interface TransitionPhotoProps extends CommonClassProps {
  photos: Photo[],
  indexActivePhoto: number,
}

export const TransitionPhoto: React.FC<TransitionPhotoProps> = ({
  photos,
  indexActivePhoto,
  className,
}) => {
  const [prevIndexActivePhoto, setPrevIndexActivePhoto] = useState(indexActivePhoto)
  const containerRef = useRef<HTMLDivElement | null>(null);

  type RefT = React.MutableRefObject<HTMLDivElement | null>;
  const getPhotoByRef = (ref: RefT, index: number): HTMLElement | null => 
  (
    ref.current!.querySelector(`img:nth-of-type(${index + 1})`)
  );

  const hidePhoto = (element: HTMLElement | null) => {
    if(!element) {
      return;
    }

    element.dataset.active = 'false';

    if(element.previousSibling) {
      // @ts-ignore
      element.previousSibling.dataset.active = 'false'
    }

    if(element.nextSibling) {
      // @ts-ignore
      element.nextSibling.dataset.active = 'false'
    }

  }
  const showPhoto = (element: HTMLElement | null) => {
    if(!element) {
      return;
    }

    element.dataset.active = 'true';

    if(element.previousSibling) {
      // @ts-ignore
      element.previousSibling.dataset.active = 'prepared'
    }

    if(element.nextSibling) {
      // @ts-ignore
      element.nextSibling.dataset.active = 'prepared'
    }

    
  }

  useLayoutEffect(() => {
    if(!containerRef.current) {
      return;
    }

    const activePhoto = getPhotoByRef(
      containerRef,
      prevIndexActivePhoto
    )

    const nextActivePhoto = getPhotoByRef(
      containerRef,
      indexActivePhoto
    )

    if(prevIndexActivePhoto !== indexActivePhoto) {
      hidePhoto(activePhoto);
      showPhoto(nextActivePhoto);
    } else {
      showPhoto(activePhoto);
    }

    setPrevIndexActivePhoto(indexActivePhoto)

  }, [indexActivePhoto])

  return useMemo(() => (
    <div 
    className={cl(className, style.transitionPhoto)}
    ref={containerRef}
    >
      {photos.map((photo, id) => (
        <img
        key={photo.id}
        className={style.transitionPhotoImage}
        src={photo.src}
        alt={photo.description}
        loading="lazy"
        data-active={id === prevIndexActivePhoto}
      />

      ))}
      
    </div>
  ), [])
}

