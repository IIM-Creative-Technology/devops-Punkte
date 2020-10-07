import { API_URL } from '@/api/index';

class RessourceService {
  static async getRessouces(countryID, categoryID, subscriberRange) {
    const response = await fetch(
      `${API_URL}/ressources/country/${countryID}/category/${categoryID}/subscribers/${subscriberRange}`,
    );
    const datas = await response.json();

    return datas;
  }
}

export default RessourceService;
