// import { Webhook } from "svix";
// import User from "../models/User.js";

// // Api controller function manage clerk user with db

// export const clerkWebhooks = async (req, res) => {
//   try {
//     // CREATE a svix instance with clerk webhook secret.
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
//     // testing 
//     console.log(process.env.CLERK_WEBHOOK_SECRET);

//     // verify headers
//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     // getting data from req body
//     const { data, type } = req.body;

//     // switch case for different events
//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         res.json({});
//         break;
//       }
//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         res.json({});
//         break;
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         res.json({});
//         break;
//       }
//       default:
//         break;
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//     console.log(error.message);
//   }
// };




import { Webhook } from "svix";
import User from "../models/User.js";

// Clerk Webhook Controller
export const clerkWebhooks = async (req, res) => {
  try {
    // Clerk webhook secret from .env
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // IMPORTANT: req.body is raw Buffer here
    const payload = req.body.toString("utf8");

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verify + parse event
    const evt = whook.verify(payload, headers);
    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: "",
        };
        await User.findByIdAndUpdate(data.id, userData, { upsert: true, new: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log(`Unhandled Clerk event: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ message: "Invalid webhook signature" });
  }
};
