/**
 * Фотографии хостела лежат в public/photos в двух размерах:
 * NN-1600.webp (для крупных блоков) и NN-800.webp (для карточек и мобильных).
 * Список и alt-тексты — в src/lib/photos.ts.
 */
export type PhotoRef = {
  id: string;
  alt: string;
  width: number;
  height: number;
};

type PhotoProps = {
  photo: PhotoRef;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export const photoSrc = (id: string, size: 800 | 1600 = 1600) => `/photos/${id}-${size}.webp`;

export function Photo({ photo, className, sizes = "100vw", priority = false }: PhotoProps) {
  return (
    <img
      src={photoSrc(photo.id, 1600)}
      srcSet={`${photoSrc(photo.id, 800)} 800w, ${photoSrc(photo.id, 1600)} 1600w`}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className ? `bg-secondary ${className}` : "bg-secondary"}
    />
  );
}
