const Order = require("../models/Order");


// Create Order

exports.createOrder = async (req,res)=>{

    try{

        const {
            products,
            totalAmount,
            address,
            paymentMethod
        } = req.body;


        const order = await Order.create({

            user:req.user.id,

            products,

            totalAmount,

            address,

            paymentMethod

        });


        res.status(201).json({

            success:true,

            order

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Get My Orders  👈 इथे add कर

exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        })
        .populate("products.product")
        .sort({createdAt:-1});


        res.json({

            success:true,

            orders

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// Get Single Order

exports.getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("products.product");


        if (!order) {

            return res.status(404).json({

                success:false,

                message:"Order not found"

            });

        }


        res.json({

            success:true,

            order

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// Update Order Status (Admin)

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
