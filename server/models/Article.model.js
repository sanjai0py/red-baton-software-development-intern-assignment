const Article = (sequelize, DataTypes) => {
  const article = sequelize.define("Article", {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    hnid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      unique: true,
      required: true,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Integer,
      default: Date.now,
    },
  });

  return article;
};

module.exports = Article;
