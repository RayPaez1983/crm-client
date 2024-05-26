import { cardWrapperStyles } from '@/components/styles';
import { useOrderData } from '@/context/orders.context';
import Card from '@/components/card';

const Orders = () => {
  const { orderDataState, deleteSingleOrder, loading } = useOrderData();

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div style={cardWrapperStyles}>
      {orderDataState.data?.map((order, idx) => {
        return (
          <Card
            index={idx}
            item={order}
            deleteButton
            butonText="Eliminar"
            key={idx}
            OnClickDelete={() => deleteSingleOrder(order.id)}
          />
        );
      })}
    </div>
  );
};

export default Orders;
