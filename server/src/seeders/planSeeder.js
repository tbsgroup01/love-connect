import sequelize from "../config/db.js";
import { Plans } from "../models/index.js";
import { Op } from "sequelize";

export const initialPlansData = [
  {
    plan_id: 100001,
    name: "Free Starter",
    price: 0.0,
    duration: 0,
    description:
      "10 Daily Likes aur 1 Chat conversation. Profile create karein, local members dekhein aur basic matching shuru karein.",
    features: [
      { id: "profile", name: "Create & Edit Profile", included: true },
      { id: "browse", name: "Browse & Discover Matches", included: true },
      { id: "likes", name: "10 Daily Likes", included: true },
      { id: "chat", name: "1 Chat Conversation", included: true },
      { id: "video", name: "Video Calling", included: false },
      { id: "likes_you", name: "See Who Likes You", included: false },
    ],
    status: "active",
  },
  {
    plan_id: 100002,
    name: "1 Month Premium",
    price: 499.0,
    duration: 30,
    description:
      "Full Unlimited Access (30 Din): Unlimited Likes, Unlimited Chat, Video Calling, See Who Likes You, Rewind Swipes & Super Likes.",
    features: [
      { id: "profile", name: "Create & Edit Profile", included: true },
      { id: "browse", name: "Browse & Discover Matches", included: true },
      { id: "likes", name: "Unlimited Likes & Rewind", included: true },
      { id: "chat", name: "Unlimited Chat Messaging", included: true },
      { id: "video", name: "Video Calling", included: true },
      { id: "likes_you", name: "See Who Likes You", included: true },
    ],
    status: "active",
  },
  // 3 Months Plan commented out per user preference
  {
    plan_id: 100004,
    name: "1 Year VIP Elite",
    price: 3899.0,
    duration: 365,
    description:
      "Full Unlimited Access (365 Din) with 35% savings: Sabhi features unlocked, Worldwide Passport Mode, Rewind Swipes aur VIP Support.",
    features: [
      { id: "profile", name: "Create & Edit Profile", included: true },
      { id: "browse", name: "Browse & Discover Matches", included: true },
      { id: "likes", name: "Unlimited Likes & Rewind", included: true },
      { id: "chat", name: "Unlimited Chat Messaging", included: true },
      { id: "video", name: "Video Calling", included: true },
      { id: "likes_you", name: "See Who Likes You", included: true },
    ],
    status: "active",
  },
];

export const seedPlans = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Remove any plans that are not part of the active 4 plans (0, 30, 90, 365)
    const validPlanIds = initialPlansData.map((p) => p.plan_id);
    const validDurations = initialPlansData.map((p) => p.duration);
    const deletedCount = await Plans.destroy({
      where: {
        [Op.or]: [
          { duration: { [Op.notIn]: validDurations } },
          { plan_id: { [Op.notIn]: validPlanIds } },
        ],
      },
    });
    if (deletedCount > 0) {
      console.log(`[-] Removed ${deletedCount} obsolete plan(s) from database.`);
    }

    let insertedCount = 0;
    let existingCount = 0;

    for (const item of initialPlansData) {
      const existing = await Plans.findOne({
        where: {
          [Op.or]: [{ plan_id: item.plan_id }, { duration: item.duration }],
        },
      });

      if (!existing) {
        await Plans.create(item);
        console.log(
          `[+] Inserted Plan: "${item.name}" (ID: ${item.plan_id}, Price: ₹${item.price}, Duration: ${item.duration} days)`
        );
        insertedCount++;
      } else {
        await existing.update({
          plan_id: item.plan_id,
          name: item.name,
          price: item.price,
          duration: item.duration,
          description: item.description,
          features: item.features,
          status: item.status,
        });
        console.log(`[=] Synced Plan: "${item.name}" (ID: ${item.plan_id}, Duration: ${item.duration} days)`);
        existingCount++;
      }
    }

    console.log(
      `\nPlans Seeding completed! Inserted: ${insertedCount}, Synced: ${existingCount}, Total: ${initialPlansData.length}`
    );
    return { insertedCount, existingCount, total: initialPlansData.length };
  } catch (error) {
    console.error("Error seeding Plans:", error);
    throw error;
  }
};

// If run directly via node command
if (process.argv[1]?.replace(/\\/g, "/").endsWith("planSeeder.js")) {
  seedPlans()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
