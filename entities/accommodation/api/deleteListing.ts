import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "listing-images";

function extractStoragePath(imageUrl: string): string | null {
  const marker = `/${BUCKET_NAME}/`;
  const index = imageUrl.indexOf(marker);
  if (index === -1) return null;
  return imageUrl.slice(index + marker.length);
}

export async function deleteListing(
  id: string,
  images: string[],
): Promise<void> {
  const supabase = createClient();

  if (images.length > 0) {
    const paths = images
      .map(extractStoragePath)
      .filter((path): path is string => path !== null);

    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(paths);
      if (storageError) {
        console.error("이미지 삭제 중 일부 실패:", storageError.message);
      }
    }
  }

  const { error } = await supabase.from("listings").delete().eq("id", id);

  if (error) {
    throw new Error(`숙소 삭제 실패: ${error.message}`);
  }
}
