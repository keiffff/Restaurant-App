import { useEffect, useState } from 'react';

type Props = {
  callbackOnSuccess?: () => void;
  callbackOnError?: () => void;
};

export const useLocationInfo = ({ callbackOnSuccess, callbackOnError }: Props) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [positionError, setPositionError] = useState<PositionError | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentPosition(position);
        setPositionError(null);
        callbackOnSuccess && callbackOnSuccess();
      },
      error => {
        setPositionError(error);
        callbackOnError && callbackOnError();
      },
    );
  }, [callbackOnError, callbackOnSuccess]);

  return { positionError, currentPosition };
};
