class CategoryService {
  static async getAllCategories() {
    const response = await fetch('https://datatubeapi.kevinmanssat.fr/categories');
    const datas = await response.json();

    return datas;
  }
}

export default CategoryService;
