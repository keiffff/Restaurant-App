/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { AppHeader } from '../AppHeader';

export const RestaurantsIndexPage = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        'https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=e0282a617864a747ca5ed4c9566bfa46&lunch=1',
      );
      const result = await res.json();
      setRestaurants(result.rest);
    };
    load();
  }, []);

  return (
    <div>
      <AppHeader />
      {restaurants.map(r => (
        <div key={r.id}>
          <span>{r.name}</span>
          <img src={r.image_url.shop_image1} alt="restaurant" />
        </div>
      ))}
    </div>
  );
};
