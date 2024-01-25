import { Photo, CommonClassProps } from "../types";

interface MainPhotoProps extends CommonClassProps {
    prevPhoto?: Photo;
    activePhoto: Photo;
    nextPhoto?: Photo;
}

export const MainPhoto: React.FC<MainPhotoProps> = ({
    prevPhoto, activePhoto, nextPhoto
}) => (
    <div>Main Photo</div>
)