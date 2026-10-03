import sequelize from "../config/db.js";
import { Faqs } from "../models/index.js";

export const initialFaqsData = [
  {
    faq_id: 100001,
    category: "Matching & Discovery",
    question: "How does LoveConnect match people?",
    answer:
      "LoveConnect utilizes an advanced AI compatibility score combined with proximity radius, lifestyle interests, and relationship goals. Profiles with verified badges and mutual interest are prioritized in your daily swipe stack.",
    status: "active",
  },
  {
    faq_id: 100002,
    category: "Safety & Verification",
    question: "How does the blue checkmark photo verification work?",
    answer:
      "Users perform a dynamic 5-second selfie gesture verification. Our secure biometric engine compares your real-time facial landmarks against your uploaded gallery photos. Once confirmed by our moderation team, your profile receives the verified badge.",
    status: "active",
  },
  {
    faq_id: 100003,
    category: "Subscriptions & Billing",
    question: "What is included in the LoveConnect Premium Plan?",
    answer:
      "Premium unlocks Unlimited Likes, the ability to See Who Likes You, 5 free weekly Super Likes, Profile Boost to top of deck, Rewind Swipes, Advanced Filters (height, lifestyle, verified only), and an ad-free experience.",
    status: "active",
  },
  {
    faq_id: 100004,
    category: "Account & Privacy",
    question: "Can I hide my profile without deleting my account?",
    answer:
      'Yes! In Settings > Profile Visibility, choose "Hidden" or enable "Incognito Mode". Existing matches can still message you, but your profile will not be shown to any new prospective members.',
    status: "active",
  },
  {
    faq_id: 100005,
    category: "Subscriptions & Billing",
    question: "How do I cancel or request a refund for a subscription?",
    answer:
      "Subscriptions can be managed directly in the Account Settings > Subscription tab. For refund requests within 48 hours of purchase, please reach out to support@loveconnect.com with your transaction receipt ID.",
    status: "active",
  },
  {
    faq_id: 100006,
    category: "Safety & Verification",
    question: "What happens when I report a suspicious user or message?",
    answer:
      "Our 24/7 trust & safety moderation team investigates flagged accounts within 15 minutes. If a profile violates our community guidelines (scam, fake photos, harassment), they are immediately banned across device hardware IDs.",
    status: "active",
  },
];

export const seedFaqs = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    let insertedCount = 0;
    let existingCount = 0;

    for (const item of initialFaqsData) {
      const existing = await Faqs.findOne({
        where: { question: item.question },
      });

      if (!existing) {
        await Faqs.create(item);
        console.log(`[+] Inserted FAQ: "${item.question}"`);
        insertedCount++;
      } else {
        console.log(`[=] FAQ already exists: "${item.question}"`);
        existingCount++;
      }
    }

    console.log(
      `\nFAQ Seeding completed! Inserted: ${insertedCount}, Existing: ${existingCount}, Total: ${initialFaqsData.length}`
    );
    return { insertedCount, existingCount, total: initialFaqsData.length };
  } catch (error) {
    console.error("Error seeding FAQs:", error);
    throw error;
  }
};

// If run directly via node command
if (process.argv[1]?.replace(/\\/g, "/").endsWith("faqSeeder.js")) {
  seedFaqs()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
