// Card.js
import React from 'react';
interface CardProp {
  data: [];
}
const Card = ({ data }: CardProp) => {
  return (
    <div
      style={{
        padding: '40px 0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px',
      }}>
      {data.map((item: any, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: '5px',
            border: '1px red solid',
            margin: '10px',
            borderRadius: '5px',
            width: 'fit-content',
            minWidth: 240,
            minHeight: 150,
          }}
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
