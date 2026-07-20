import { Link } from "react-router-dom";

import Button from "../components/Button";

const Orders = () => {

  const orders = [

    {
      id: "ORD1001",
      date: "18 July 2026",
      status: "Delivered",
      total: 1250,
    },

    {
      id: "ORD1002",
      date: "15 July 2026",
      status: "Shipped",
      total: 780,
    },

    {
      id: "ORD1003",
      date: "10 July 2026",
      status: "Processing",
      total: 560,
    },

  ];
    return (

    <div className="py-10">

      <h1 className="text-4xl font-bold mb-10">

        My Orders

      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="card bg-base-100 shadow-lg"
          >

            <div className="card-body">

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                  <h2 className="text-xl font-bold">

                    Order ID : {order.id}

                  </h2>

                  <p>

                    Order Date : {order.date}

                  </p>

                  <p>

                    Total : ₹ {order.total}

                  </p>

                </div>

                <div>

                  <span className="badge badge-success badge-lg">

                    {order.status}

                  </span>

                </div>

              </div>
                            <div className="divider"></div>

              <div className="flex flex-wrap gap-4">

                <Button>

                  View Details

                </Button>

                <Button>

                  Download Invoice

                </Button>

              </div>

            </div>

          </div>

        ))}

      </div>

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