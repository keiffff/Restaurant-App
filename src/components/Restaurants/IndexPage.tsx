/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import { AppHeader } from '../AppHeader';

const restaurantsWrapperStyle = css({
  padding: `16px 8px 16px`,
});

const restaurantStyle = css({
  '& + &': {
    marginTop: 16,
  },
});

const mediaStyle = css({
  height: 160,
});

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
      <div css={restaurantsWrapperStyle}>
        {restaurants.map(r => (
          <Card key={r.id} css={restaurantStyle}>
            <CardMedia css={mediaStyle} component="img" image={r.image_url.shop_image1} title={r.name} />
            <CardContent>
              <span>{r.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
