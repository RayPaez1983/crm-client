// Card.js
import React from 'react';
import { cardStyles, cardWrapperStyles } from './styles';
interface CardProp {
  data: [];
}
const Card = ({ data }: CardProp) => {
  return (
    <div
      style={cardWrapperStyles}>
      {data.map((item: any, index) => (
        <div
          key={index}
          style={cardStyles}
          onClick={() => console.log(item.id, 'que jue aqui no jodaa')}>
          <div className="generic-item">{renderItem(item)}</div>
        </div>
      ))}
    </div>
  );
};

const renderItem = (item: any) => {
  if (typeof item === 'object') {
    return Object.entries(item).map(([key, value]) => (
      <div key={key} className="item-property">
        <strong>{key}:</strong> {renderValue(value)}
      </div>
    ));
  }
  return <div className="item-content">{item}</div>;
};

const renderValue = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};

export default Card;
