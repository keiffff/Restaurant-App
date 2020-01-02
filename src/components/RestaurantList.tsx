/** @jsx jsx */
import React, { useCallback, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { Card, CardActions, CardMedia, CardContent, Collapse, IconButton } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, Payment as PaymentIcon, Place as PlaceIcon } from '@material-ui/icons';
import { Restaurant } from '../types/graphql';

type Props = {
  restaurants: Restaurant[];
};

const restaurantsWrapperStyle = css({
  padding: 0,
  margin: 0,
  width: '100%',
  listStyle: 'none',
});

const restaurantStyle = css({
  '& + &': {
    marginTop: 16,
  },
});

const mediaWrapperStyle = css({
  position: 'relative',
});

const mediaStyle = css({
  height: 160,
});

const restaurantInfoOnMediaStyle = css({
  position: 'absolute',
  bottom: 8,
  left: 8,
  padding: 4,
  color: 'white',
  background: 'rgb(0, 0, 0, 0.5)',
  fontSize: 14,
  fontWeight: 'bold',
  borderRadius: 5,
});

const infoItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1.4,
  '> .MuiSvgIcon-root': {
    width: 14,
    height: 14,
    marginRight: 4,
  },
});

const contentStyle = css({
  padding: `8px 16px`,
});

const restaurantNameStyle = css({
  margin: 0,
});

const expandButtonStyle = css({
  marginLeft: 'auto',
});

const openTimeTitleStyle = css({
  margin: 0,
  display: 'inline-block',
  '&:after': {
    content: '"："',
  },
});

const openTimeTextStyle = css({
  display: 'inline',
});

const RestaurantItem = ({ restaurant }: { restaurant: Restaurant }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggleExpanded = useCallback(() => setExpanded(state => !state), []);

  return (
    <li css={restaurantStyle}>
      <Card key={restaurant.id}>
        <div css={mediaWrapperStyle}>
          <CardMedia css={mediaStyle} component="img" image={restaurant.image} title={restaurant.name} />
          <div css={restaurantInfoOnMediaStyle}>
            <span css={infoItemStyle}>
              <PaymentIcon />
              {restaurant.budget} 円
            </span>
            <span css={infoItemStyle}>
              <PlaceIcon />
              {restaurant.nearStation}
            </span>
          </div>
        </div>
        <CardContent css={contentStyle}>
          <h3 css={restaurantNameStyle}>{restaurant.name}</h3>
        </CardContent>
        <CardActions>
          <IconButton css={expandButtonStyle} size="small" onClick={handleToggleExpanded}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded}>
          <CardContent css={contentStyle}>
            <h4 css={openTimeTitleStyle}>営業時間</h4>
            <p css={openTimeTextStyle}>{restaurant.openTime}</p>
          </CardContent>
        </Collapse>
      </Card>
    </li>
  );
};

export const RestaurantList = ({ restaurants }: Props) => {
  return (
    <ul css={restaurantsWrapperStyle}>
      {restaurants.map(r => (
        <RestaurantItem key={r.id} restaurant={r} />
      ))}
    </ul>
  );
};
