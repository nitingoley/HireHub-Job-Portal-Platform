import { Webhook } from "svix";
import User from "../models/User.js";

// Clerk Webhook Controller
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("📩 Clerk Webhook received!");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Log raw payload
    const payload = req.body.toString("utf8");
    console.log("🔹 Raw Payload:", payload);

    // Log headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    console.log("🔹 Headers:", headers);

    // Verify + parse event
    const evt = whook.verify(payload, headers);
    console.log("✅ Verified Event:", evt);

    const { data, type } = evt;
    console.log("📌 Event Type:", type);
    console.log("📌 Event Data:", data);

    switch (type) {
      case "user.created": {
        console.log("⚡ Handling user.created for ID:", data.id);

        const user = await User.findByIdAndUpdate(
          data.id,
          {
            _id: data.id,
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url,
            resume: "",
          },
          { upsert: true, new: true }
        );

        console.log("✅ User created/updated in DB:", user);
        break;
      }

      case "user.updated": {
        console.log("⚡ Handling user.updated for ID:", data.id);

        const updatedUser = await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        });

        console.log("✅ User updated in DB:", updatedUser);
        break;
      }

      case "user.deleted": {
        console.log("⚡ Handling user.deleted for ID:", data.id);

        const deletedUser = await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", deletedUser);
        break;
      }

      default:
        console.log(`⚠️ Unhandled Clerk event: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.status(400).json({ message: "Invalid webhook signature", error: err.message });
  }
};

