"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface PhotosStepProps {
  photos: File[];
  onChange: (photos: File[]) => void;
  maxPhotos?: number;
}

export function PhotosStep({
  photos,
  onChange,
  maxPhotos = 10,
}: PhotosStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/"),
    );
    const merged = [...photos, ...incoming].slice(0, maxPhotos);
    onChange(merged);
  }

  function removeAt(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-white px-6 py-16 text-center transition-colors hover:border-brand-400"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <ImagePlus size={26} />
        </span>
        <p className="mt-4 text-base font-semibold text-brand-900">
          사진을 끌어다 놓거나 클릭해서 업로드하세요
        </p>
        <p className="mt-1 text-sm text-brand-400">
          최대 {maxPhotos}장, JPG/PNG 지원
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => addFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-100"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`숙소 사진 ${index + 1}`}
                fill
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(index);
                }}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={14} />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded-full bg-brand-900 px-2.5 py-1 text-xs font-semibold text-white">
                  대표 사진
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
