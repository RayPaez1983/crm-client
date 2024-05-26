// Card.js
import React from 'react';
import { cardStyles } from './styles';

interface CardProp {
  item: any;
  deleteButton?: Boolean;
  OnClickDelete?: () => void;
  OnClick?: () => void;
  butonText?: String;
  index: Number;
}

const Card = ({
  item,
  deleteButton,
  OnClickDelete,
  butonText,
  OnClick,
  index,
}: CardProp) => {
  console.log(item);
  return (
    <div style={cardStyles} className="generic-item">
      {index}
      {renderItem(item)}
      {item['__typename'] === 'Client' ? (
        <>
          {' '}
          <div className="item-property">
            <strong>Order: </strong> {item.order}
          </div>
          <button onClick={OnClick}>NewOrder</button>
        </>
      ) : null}
      {typeof item.order !== 'string' && item.order !== undefined
        ? item.order.map((it: any, idx: number) => {
            return (
              <div key={idx}>
                <div className="item-property">
                  <strong>ID: </strong> {it.id}
                </div>
                <div className="item-property">
                  <strong>Cantidad: </strong> {it.quantity}
                </div>
              </div>
            );
          })
        : null}
      {deleteButton ? (
        <button onClick={OnClickDelete}>{butonText}</button>
      ) : null}
    </div>
  );
};

const renderItem = (item: any) => {
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
};


export default Card;
