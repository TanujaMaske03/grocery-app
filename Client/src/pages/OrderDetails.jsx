import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await orderService.getOrderById(id);
      setOrder(data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Order Details
      </h1>

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-2xl font-bold">
            Order ID : {order._id.slice(-8).toUpperCase()}
          </h2>

          <p>
            Status :
            <span className="badge badge-warning ml-2">
              {order.orderStatus}
            </span>
          </p>

          <p>
            Payment :
            <strong> {order.paymentMethod}</strong>
          </p>

          <p>
            Total :
            <strong> ₹ {order.totalAmount}</strong>
          </p>

          <p>
            Date :
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <div className="divider"></div>

          <h3 className="text-xl font-bold mb-4">
            Ordered Products
          </h3>

          <div className="space-y-4">

            {order.products.map((item) => (

              <div
                key={item._id}
                className="flex justify-between border rounded-lg p-4"
              >

                <div>

                  <h4 className="font-bold">

                    {item.product?.name}

                  </h4>

                  <p>

                    Quantity : {item.quantity}

                  </p>

                </div>

                <div>

                  ₹ {item.price}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;