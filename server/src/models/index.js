import Users from "./usersModel.js";
import Admin from "./adminModel.js";
import Profiles from "./profilesModel.js";
import Likes from "./likesModel.js";
import Matches from "./matchesModel.js";
import Reports from "./reportsModel.js";
import Conversation from "./conversationModel.js";
import Messages from "./messagesModel.js";
import Plans from "./plansModel.js";
import Subscriptions from "./subscriptionsModel.js";
import Transactions from "./transactionsModel.js";
import Activities from "./activitiesModel.js";
import Banners from "./bannersModel.js";
import Faqs from "./faqsModel.js";
import Settings from "./settingsModel.js";

// ==========================================
// ASSOCIATIONS
// ==========================================

// 1. Users <-> Profiles (One-to-One)
Users.hasOne(Profiles, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
Profiles.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// 2. Users <-> Likes (One-to-Many: sent & received likes)
Users.hasMany(Likes, {
  foreignKey: "sender_id",
  as: "sentLikes",
  onDelete: "CASCADE",
});
Likes.belongsTo(Users, {
  foreignKey: "sender_id",
  as: "sender",
});

Users.hasMany(Likes, {
  foreignKey: "receiver_id",
  as: "receivedLikes",
  onDelete: "CASCADE",
});
Likes.belongsTo(Users, {
  foreignKey: "receiver_id",
  as: "receiver",
});

// 3. Users <-> Matches (One-to-Many: user_one & user_two)
Users.hasMany(Matches, {
  foreignKey: "user_one_id",
  as: "matchesAsUserOne",
  onDelete: "CASCADE",
});
Matches.belongsTo(Users, {
  foreignKey: "user_one_id",
  as: "userOne",
});

Users.hasMany(Matches, {
  foreignKey: "user_two_id",
  as: "matchesAsUserTwo",
  onDelete: "CASCADE",
});
Matches.belongsTo(Users, {
  foreignKey: "user_two_id",
  as: "userTwo",
});

// 4. Users <-> Reports (One-to-Many: reporter & reported_user)
Users.hasMany(Reports, {
  foreignKey: "reporter_id",
  as: "sentReports",
  onDelete: "CASCADE",
});
Reports.belongsTo(Users, {
  foreignKey: "reporter_id",
  as: "reporter",
});

Users.hasMany(Reports, {
  foreignKey: "reported_user_id",
  as: "receivedReports",
  onDelete: "CASCADE",
});
Reports.belongsTo(Users, {
  foreignKey: "reported_user_id",
  as: "reportedUser",
});

// 5. Matches <-> Conversation (One-to-One)
Matches.hasOne(Conversation, {
  foreignKey: "match_id",
  as: "conversation",
  onDelete: "CASCADE",
});
Conversation.belongsTo(Matches, {
  foreignKey: "match_id",
  as: "match",
});

// 6. Users <-> Conversation (One-to-Many: user_one & user_two)
Users.hasMany(Conversation, {
  foreignKey: "user_one_id",
  as: "conversationsAsUserOne",
  onDelete: "CASCADE",
});
Conversation.belongsTo(Users, {
  foreignKey: "user_one_id",
  as: "userOne",
});

Users.hasMany(Conversation, {
  foreignKey: "user_two_id",
  as: "conversationsAsUserTwo",
  onDelete: "CASCADE",
});
Conversation.belongsTo(Users, {
  foreignKey: "user_two_id",
  as: "userTwo",
});

// 7. Conversation <-> Messages (One-to-Many)
Conversation.hasMany(Messages, {
  foreignKey: "conversation_id",
  as: "messages",
  onDelete: "CASCADE",
});
Messages.belongsTo(Conversation, {
  foreignKey: "conversation_id",
  as: "conversation",
});

// 8. Users <-> Messages (One-to-Many: sender)
Users.hasMany(Messages, {
  foreignKey: "sender_id",
  as: "sentMessages",
  onDelete: "CASCADE",
});
Messages.belongsTo(Users, {
  foreignKey: "sender_id",
  as: "sender",
});

// 9. Users & Plans <-> Subscriptions (One-to-Many)
Users.hasMany(Subscriptions, {
  foreignKey: "user_id",
  as: "subscriptions",
  onDelete: "CASCADE",
});
Subscriptions.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

Plans.hasMany(Subscriptions, {
  foreignKey: "plan_id",
  as: "subscriptions",
  onDelete: "CASCADE",
});
Subscriptions.belongsTo(Plans, {
  foreignKey: "plan_id",
  as: "plan",
});

// 10. Users & Plans <-> Transactions (One-to-Many)
Users.hasMany(Transactions, {
  foreignKey: "user_id",
  as: "transactions",
  onDelete: "CASCADE",
});
Transactions.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

Plans.hasMany(Transactions, {
  foreignKey: "plan_id",
  as: "transactions",
  onDelete: "CASCADE",
});
Transactions.belongsTo(Plans, {
  foreignKey: "plan_id",
  as: "plan",
});

// 11. Users & Admin <-> Activities (One-to-Many)
Users.hasMany(Activities, {
  foreignKey: "user_id",
  as: "activities",
  onDelete: "CASCADE",
});
Activities.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

Admin.hasMany(Activities, {
  foreignKey: "admin_id",
  as: "activities",
  onDelete: "SET NULL",
});
Activities.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
});

export {
  Users,
  Admin,
  Profiles,
  Likes,
  Matches,
  Reports,
  Conversation,
  Messages,
  Plans,
  Subscriptions,
  Transactions,
  Activities,
  Banners,
  Faqs,
  Settings,
};

export default {
  Users,
  Admin,
  Profiles,
  Likes,
  Matches,
  Reports,
  Conversation,
  Messages,
  Plans,
  Subscriptions,
  Transactions,
  Activities,
  Banners,
  Faqs,
  Settings,
};
