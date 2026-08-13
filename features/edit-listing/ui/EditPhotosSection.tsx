"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

interface EditPhotosSectionProps {
  existingImages: string[];
  newPhotos: File[];
  onRemoveExisting: (url: string) => void;
  onAddNew: (files: File[]) => void;
  onRemoveNew: (index: number) => void;
  maxPhotos?: number;
}

export function EditPhotosSection({
  existingImages,
  newPhotos,
  onRemoveExisting,
  onAddNew,
  onRemoveNew,
  maxPhotos = 10,
}: EditPhotosSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const totalCount = existingImages.length + newPhotos.length;

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/"),
    );
    const remainingSlots = maxPhotos - totalCount;
    onAddNew(incoming.slice(0, Math.max(0, remainingSlots)));
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-brand-900">사진</h2>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => totalCount < maxPhotos && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-white px-6 py-10 text-center transition-colors ${
          totalCount < maxPhotos
            ? "cursor-pointer hover:border-brand-400"
            : "cursor-default opacity-50"
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <ImagePlus size={22} />
        </span>
        <p className="mt-3 text-sm font-semibold text-brand-900">
          {totalCount >= maxPhotos
            ? "최대 개수에 도달했어요"
            : "사진을 끌어다 놓거나 클릭해서 업로드하세요"}
        </p>
        <p className="mt-1 text-xs text-brand-400">
          {totalCount}/{maxPhotos}장
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {totalCount > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {existingImages.map((url, index) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-100"
            >
              <img
                src={url}
                alt={`기존 사진 ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveExisting(url)}
                className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
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

          {newPhotos.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-100 ring-2 ring-brand-300"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`새 사진 ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveNew(index)}
                className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={14} />
              </button>
              <span className="absolute bottom-2 left-2 rounded-full bg-brand-700 px-2.5 py-1 text-xs font-semibold text-white">
                신규
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
