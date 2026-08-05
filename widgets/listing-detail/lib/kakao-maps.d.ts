export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao.maps {
    function load(callback: () => void): void;

    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(
        container: HTMLElement,
        options: { center: LatLng; level: number },
      );
    }

    class Marker {
      constructor(options: { map: Map; position: LatLng });
    }

    namespace services {
      enum Status {
        OK = "OK",
        ZERO_RESULT = "ZERO_RESULT",
        ERROR = "ERROR",
      }

      interface AddressSearchResult {
        x: string;
        y: string;
        address_name: string;
      }

      class Geocoder {
        addressSearch(
          address: string,
          callback: (result: AddressSearchResult[], status: Status) => void,
        ): void;
      }
    }
  }
}
