const { NaverCafeCategories, NaverCafes } = require('../models');

class NaverCafeCategoriesRepository {
  getAllNaverCafeCategory = async ({}) => {
    const naverCafeCategories = await NaverCafeCategories.findAll({
      include: [NaverCafes],
    });

    return naverCafeCategories;
  };

  createNaverCafeCategory = async ({ cafeId, category }) => {
    const naverCafeCategory = await NaverCafeCategories.create({
      cafeId,
      category,
    });

    return naverCafeCategory;
  };
}

module.exports = NaverCafeCategoriesRepository;
