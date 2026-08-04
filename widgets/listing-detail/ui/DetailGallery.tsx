import Image from "next/image";

interface DetailGalleryProps {
  images: string[];
  name: string;
}

export function DetailGallery({ images, name }: DetailGalleryProps) {
  const displayImages = images.slice(0, 3);
  const count = displayImages.length;

  if (count === 0) {
    return (
      <section className="mb-16">
        <div className="flex aspect-21/9 items-center justify-center rounded-[2rem] bg-brand-100 text-brand-400">
          등록된 사진이 없어요
        </div>
      </section>
    );
  }

  if (count === 1) {
    return (
      <section className="mb-16">
        <div className="relative aspect-21/9 overflow-hidden rounded-[2rem]">
          <Image
            src={displayImages[0]}
            alt={name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </section>
    );
  }

  if (count === 2) {
    return (
      <section className="mb-16">
        <div className="grid aspect-4/3 grid-cols-1 gap-4 overflow-hidden rounded-[2rem] sm:aspect-21/9 sm:grid-cols-2">
          {displayImages.map((src, index) => (
            <div
              key={src}
              className="group relative cursor-pointer overflow-hidden"
            >
              <Image
                src={src}
                alt={`${name} ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                priority={index === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="grid aspect-4/3 grid-cols-1 grid-rows-2 gap-4 overflow-hidden rounded-[2rem] sm:aspect-21/9 sm:grid-cols-3">
        <div className="group relative cursor-pointer overflow-hidden sm:col-span-2 sm:row-span-2">
          <Image
            src={displayImages[0]}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 66vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {displayImages.slice(1).map((src, index) => (
          <div
            key={src}
            className="group relative cursor-pointer overflow-hidden"
          >
            <Image
              src={src}
              alt={`${name} ${index + 2}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {index === 0 && images.length > 3 && (
              <button
                type="button"
                className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-brand-900 shadow-lg backdrop-blur transition-all hover:bg-white active:scale-95"
              >
                +{images.length - 3}장 더보기
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
