const { scrapeHackerNews } = require("../scraper/hn-scraper");
const { Article, sequelize } = require("../sequelize");

async function uploadData() {
  try {
    const dataToUpload = await scrapeHackerNews();

    for (const pageData of dataToUpload) {
      const { page, data } = pageData;

      for (const item of data) {
        const { id, link, hnUrl, title, age, upvotes } = item;

        // Find or create the record
        const [post, created] = await Article.findOrCreate({
          where: { id },
          defaults: {
            link,
            hnUrl,
            title,
            age,
            upvotes,
          },
        });

        // If the record already existed, update upvotes and comments
        if (!created) {
          await post.update({
            upvotes,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error uploading data:", error.message);
  } finally {
    await sequelize.close();
  }
}

module.exports = { uploadData };
