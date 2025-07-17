import { post_createOrder } from "./fetchExpressAPI";

export const HandleRazorpayPayment = async ({ amount, buyerDetails }) => {
  try {
    const orderData = await post_createOrder(amount); // returns { id, amount }

    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject("Razorpay SDK not loaded.");
        return;
      }

      const options = {
        key: 'rzp_test_RNFMykEhmJ4AFh',
        amount,
        currency: "INR",
        name: "Ambarsariya Mall",
        description: "Order Payment",
        order_id: orderData.id,
        handler: (response) => {
          resolve(response);
        },
        prefill: {
          name: buyerDetails.name,
          email: buyerDetails.email,
          contact: buyerDetails.contact,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (error) => {
        reject(error.error);
      });
    });
  } catch (err) {
    console.error("Razorpay Error:", err);
    throw err;
  }
};
