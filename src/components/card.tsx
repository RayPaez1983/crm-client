// Card.js
import React from 'react';
import { cardStyles } from './styles';

interface CardProp {
  item: any;
  cardButton?: Boolean;
  OnClick?: () => void;
  butonText?: String;
}

const Card = ({ item, cardButton, OnClick, butonText }: CardProp) => {
 
  return (
    <div>
      <div style={cardStyles} className="generic-item">
        {renderItem(item)}
        {typeof item.order !== 'string'
          ? item.order.map((it: any, key: number) => {
              return (
                <div key={key}>
                  <div className="item-property">
                    <strong>ID: </strong> {it.id}{' '}
                  </div>
                  <div className="item-property">
                    <strong>Cantidad: </strong> {it.quantity}
                  </div>
                </div>
              );
            })
          : null}
        {cardButton ? <button onClick={OnClick}>{butonText}</button> : null}
      </div>
    </div>
  );
};

const renderItem = (item: any) => {
  console.log(item.order);
  const date = new Date(Number(item.created));
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  if (typeof item === 'object') {
    return Object.entries(item)
      .splice(1)
      .map(([key, value]) => {
        return key === 'order' ? null : (
          <div key={key} className="item-property">
            <strong>{key.replaceAll('__typename', '')}: </strong>
            {key === 'created' ? `${month}-${day}-${year}` : (value as string)}
          </div>
        );
      });
  }

  <>
    {item.order.map((it: any, key: number) => {
      return (
        <div key={key}>
          <div className="item-property">ID:{it.id} </div>
          <div className="item-property">Cantidad{it.quantity}</div>
        </div>
      );
    })}
  </>;
};


export default Card;
