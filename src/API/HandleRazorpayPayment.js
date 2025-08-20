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
        key: process.env.REACT_APP_RAZORPAY_API,
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
        modal: {
          // Handle user closing the modal (popup)
          ondismiss: () => {
            reject(new Error("Payment popup closed by user without completing the payment."));
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.open();

      rzp.on("payment.failed", (error) => {
        reject(error.error); // also handles payment failures
      });
    });
  } catch (err) {
    console.error("Razorpay Error:", err);
    throw err;
  }
};