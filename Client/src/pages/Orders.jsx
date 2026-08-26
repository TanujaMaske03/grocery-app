import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/common/Button";
import { orderService } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge-warning";

      case "Processing":
        return "badge-info";

      case "Shipped":
        return "badge-secondary";

      case "Out for Delivery":
        return "badge-accent";

      case "Delivered":
        return "badge-success";

      case "Cancelled":
        return "badge-error";

      default:
        return "badge-neutral";
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Loading Orders...</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold">
              No Orders Found
            </h2>

            <p className="text-gray-500">
              You haven't placed any orders yet.
            </p>

            <div className="mt-5">
              <Link to="/products">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition"
            >
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order ID : {order._id.slice(-8).toUpperCase()}
                    </h2>

                    <p className="mt-2">
                      Order Date :{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <p className="mt-2">
                      Total : ₹ {order.totalAmount}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`badge badge-lg ${getStatusBadge(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="flex flex-wrap gap-4">
                  <Link to={`/orders/${order._id}`}>
                    <Button>
                      View Details
                    </Button>
                  </Link>

                  <Button>
                    Download Invoice
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link to="/products">
          <Button>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Orders;