const UserArticleModel = (sequelize, DataTypes) => {
  const UserArticles = sequelize.define("UserArticles", {
    markAsRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    markedAsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return UserArticles;
};

module.exports = { UserArticleModel };
