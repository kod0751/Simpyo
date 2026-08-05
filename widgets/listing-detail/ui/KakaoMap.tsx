"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface KakaoMapProps {
  address: string;
}

type MapStatus = "loading" | "ready" | "error";

export function KakaoMap({ address }: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [status, setStatus] = useState<MapStatus>("loading");

  useEffect(() => {
    if (!sdkLoaded || !mapContainerRef.current) return;

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, geocodeStatus) => {
        console.log("지오코딩 주소:", address);
        console.log("지오코딩 상태:", geocodeStatus);
        console.log("지오코딩 결과:", result);
        if (
          geocodeStatus !== window.kakao.maps.services.Status.OK ||
          !mapContainerRef.current
        ) {
          setStatus("error");
          return;
        }

        const coords = new window.kakao.maps.LatLng(
          Number(result[0].y),
          Number(result[0].x),
        );

        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center: coords,
          level: 4,
        });

        new window.kakao.maps.Marker({ map, position: coords });
        setStatus("ready");
      });
    });
  }, [sdkLoaded, address]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        onLoad={() => setSdkLoaded(true)}
        onError={() => setStatus("error")}
      />

      <div className="relative aspect-21/9 w-full overflow-hidden rounded-[2rem] bg-brand-200 md:aspect-3/1">
        <div ref={mapContainerRef} className="h-full w-full" />

        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-200">
            {status === "loading" ? (
              <span className="text-sm font-medium text-brand-500">
                지도를 불러오는 중이에요...
              </span>
            ) : (
              <div className="flex flex-col items-center gap-2 text-brand-500">
                <MapPin size={24} />
                <span className="text-sm font-medium">
                  지도를 표시할 수 없어요
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
