const ArticleModel = (sequelize, DataTypes) => {
  const article = sequelize.define("Article", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      required: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      required: true,
    },
    link: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    hnUrl: {
      type: DataTypes.STRING,
      required: true,
    },
    saved: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    age: {
      type: DataTypes.BIGINT,
    },
  });

  return article;
};

module.exports = { ArticleModel };
