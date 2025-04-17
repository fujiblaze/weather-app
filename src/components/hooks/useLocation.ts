import { useEffect, useState } from "react";
import { Coordinates } from "../../api/types";

interface LocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useLocation() {
  const [locationData, setLocationData] = useState<LocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported in your browser",
        isLoading: false,
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // return data
        return setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location perms denied, please enable location access in your browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "Unable to find your current location, please try again later.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred, please try again later.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
