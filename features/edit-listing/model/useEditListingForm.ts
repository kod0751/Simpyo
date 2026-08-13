import { useState } from "react";
import type { Stay } from "@/entities/accommodation/model/types";
import { amenities as amenityDefinitions, highlightTags } from "@/lib/host";

export interface EditFormData {
  propertyType: string;
  region: string;
  address: string;
  title: string;
  description: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  tags: string[];
  price: number;
  hostName: string;
  hostPhone: string;
  existingImages: string[];
  newPhotos: File[];
}

function labelsToIds(
  labels: string[],
  definitions: { id: string; label: string }[],
): string[] {
  return labels
    .map((label) => definitions.find((d) => d.label === label)?.id)
    .filter((id): id is string => id !== undefined);
}

function toEditFormData(listing: Stay): EditFormData {
  return {
    propertyType: listing.category,
    region: listing.region,
    address: listing.address,
    title: listing.name,
    description: listing.description,
    maxGuests: listing.max_guests,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    bathrooms: listing.bathrooms,
    amenities: labelsToIds(listing.amenities, amenityDefinitions),
    tags: labelsToIds(listing.tags, highlightTags),
    price: listing.price_per_night,
    hostName: listing.host_name ?? "",
    hostPhone: listing.host_phone ?? "",
    existingImages: listing.images,
    newPhotos: [],
  };
}

export function useEditListingForm(listing: Stay) {
  const [form, setForm] = useState<EditFormData>(() => toEditFormData(listing));

  function update<K extends keyof EditFormData>(
    key: K,
    value: EditFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAmenity(id: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id],
    }));
  }

  function toggleTag(id: string) {
    setForm((prev) => {
      const isSelected = prev.tags.includes(id);
      if (isSelected) {
        return { ...prev, tags: prev.tags.filter((t) => t !== id) };
      }
      if (prev.tags.length >= 3) return prev;
      return { ...prev, tags: [...prev.tags, id] };
    });
  }

  function removeExistingImage(url: string) {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== url),
    }));
  }

  function addNewPhotos(files: File[]) {
    setForm((prev) => ({ ...prev, newPhotos: [...prev.newPhotos, ...files] }));
  }

  function removeNewPhoto(index: number) {
    setForm((prev) => ({
      ...prev,
      newPhotos: prev.newPhotos.filter((_, i) => i !== index),
    }));
  }

  return {
    form,
    update,
    toggleAmenity,
    toggleTag,
    removeExistingImage,
    addNewPhotos,
    removeNewPhoto,
  };
}
