import { RESTDataSource } from 'apollo-datasource-rest'

export default class CovidAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://lab.isaaclin.cn/'
  }

  async getOverall({ latest = 1 } = {}) {
    return (await this.get('/nCoV/api/overall', { latest })).results
  }

  async getAllProvinceName({ lang = 'zh' } = {}) {
    return (await this.get('/nCoV/api/provinceName', { lang })).results
  }

  async getAll({ latest = 1, province, provinceEng } = {}) {
    return (await this.get('/nCoV/api/area', { latest, province, provinceEng })).results
  }

  async getNews({ page, num } = {}) {
    return (await this.get('/nCoV/api/news', { page, num })).results
  }

  async getRumors({ rumorType = 0, page, num } = {}) {
    return (await this.get('/nCoV/api/overall', { latest })).results
  }
}
