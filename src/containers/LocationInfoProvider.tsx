import React, { createContext, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

type LocationInfo = {
  currentPosition: Position | null;
  positionError: PositionError | null;
};

export const LocationInfoContext = createContext<LocationInfo>({ currentPosition: null, positionError: null });

export const LocationInfoProvider = ({ children }: Props) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [positionError, setPositionError] = useState<PositionError | null>(null);
  navigator.geolocation.getCurrentPosition(
    position => {
      setCurrentPosition(position);
      setPositionError(null);
    },
    error => {
      setPositionError(error);
    },
  );

  return (
    <LocationInfoContext.Provider value={{ currentPosition, positionError }}>{children}</LocationInfoContext.Provider>
  );
};
