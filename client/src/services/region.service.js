class RegionService {
  static async getAllRegions() {
    const response = await fetch('https://datatubeapi.kevinmanssat.fr/regions');
    const datas = await response.json();

    return datas;
  }
}

export default RegionService;
