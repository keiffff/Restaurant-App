import { useEffect, useState } from 'react';

export const useLocationInfo = ({
  onSuccess,
  onError,
}: Partial<{
  onSuccess: (position?: Position) => void;
  onError: (error?: PositionError) => void;
}>) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [positionError, setPositionError] = useState<PositionError | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentPosition(position);
        setPositionError(null);
        onSuccess && onSuccess(position);
      },
      error => {
        setPositionError(error);
        setCurrentPosition(null);
        onError && onError(error);
      },
    );
  }, [onError, onSuccess]);

  return { positionError, currentPosition };
};
