import { API_URL } from '@/api/index';

class RegionService {
  static async getAllRegions() {
    const response = await fetch(`${API_URL}/regions`);
    const datas = await response.json();

    return datas;
  }
}

export default RegionService;
