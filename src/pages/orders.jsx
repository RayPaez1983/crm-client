import { cardWrapperStyles } from '@/components/styles';
import { useOrderData } from '@/context/orders.context';
import Card from '@/components/card';

const Orders = () => {
  const { orderDataState, loading } = useOrderData();

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div style={cardWrapperStyles}>
      {orderDataState.data?.map((order, idx) => {
        return (
          <Card
            item={order}
            deleteButton
            butonText="Eliminar"
            key={idx}
            OnClickDelete={() => alert(order.id)}
          />
        );
      })}
    </div>
  );
};

export default Orders;
