import { API_URL } from '@/api/index';

class CategoryService {
  static async getAllCategories() {
    const response = await fetch(`${API_URL}/categories`);
    const datas = await response.json();

    return datas;
  }
}

export default CategoryService;
