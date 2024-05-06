// Card.js
import React from 'react';
import { cardStyles, cardWrapperStyles } from './styles';
interface CardProp {
  item: {};
  cardButton?: Boolean;
  OnClick?: () => void;
  butonText?: String;
}
const Card = ({ item, cardButton, OnClick, butonText }: CardProp) => {
  return (
    <div onClick={OnClick}>
      <div style={cardStyles} className="generic-item">
        {renderItem(item)}
        {cardButton ? <button onClick={OnClick}>{butonText}</button> : null}
      </div>
    </div>
  );
};

const renderItem = (item: any) => {
  const date = new Date(Number(item.created));
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  console.log(year, month, day, Object.entries(item));
  if (typeof item === 'object') {
    return Object.entries(item)
      .splice(1)
      .map(([key, value]) => (
        <div key={key} className="item-property">
          <strong>{key.replaceAll('__typename', '')}: </strong>
          {key === 'created' ? `${month}-${day}-${year}` : (value as string)}
        </div>
      ));
  }
  return <div className="item-content">{item}</div>;
};


export default Card;
