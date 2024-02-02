const { Sequelize, DataTypes } = require("sequelize");

const { ArticleModel } = require("./models/Article.model");
const { UserModel } = require("./models/User.model");
const { UserArticleModel } = require("./models/UserArticle.model");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established with database");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
  });

(async () => await sequelize.sync({ force: true }))();

const Article = ArticleModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// User relationships
User.belongsToMany(Article, {
  as: "readArticles",
  through: "UserArticles",
});

User.belongsToMany(Article, {
  as: "deletedArticles",
  through: "UserArticles",
});

Article.belongsToMany(User, {
  as: "ReadByUsers",
  through: "UserArticles",
});

Article.belongsToMany(User, {
  as: "DeletedByUsers",
  through: "UserArticles",
});

module.exports = { sequelize, Article, User };
