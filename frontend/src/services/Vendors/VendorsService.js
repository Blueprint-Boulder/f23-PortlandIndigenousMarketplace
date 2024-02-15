import VendorsRepository from './VendorsRepository.js';
import Vendor from '../../objects/Vendor.js';

export default class VendorsService {
  constructor(baseUrl) {
    this.vendorsRepository = new VendorsRepository(baseUrl);
  }

  async getVendors() {
    const vendorsData = await this.vendorsRepository.getAllVendors();
    return vendorsData.map((data) => new Vendor(
        data.vendorId,
        data.name,
        data.email,
        data.website,
        data.phoneNumber,
        data.image,
    ));
  }

  async getVendorById(vendorId) {
    const vendorData = await this.vendorsRepository.getVendorById(vendorId);
    return new Vendor(
        vendorData.vendorId,
        vendorData.name,
        vendorData.email,
        vendorData.website,
        vendorData.phoneNumber,
        vendorData.image,
    );
  }

  async authenticateVendor(vendor) {
    const vendorData = {
      email: vendor.email,
      password: vendor.password,
    };
    return await this.vendorsRepository.authenticateVendor(vendorData);
  }

  async createVendor(vendor, password) {
    const vendorData = {
      name: vendor.name,
      email: vendor.email,
      password: password,
      website: vendor.website,
      phoneNumber: vendor.phoneNumber,
      image: vendor.image,
    };
    return await this.vendorsRepository.createVendor(vendorData);
  }

  async updateVendor(vendor) {
    const vendorData = {
      name: vendor.name,
      email: vendor.email,
      website: vendor.website,
      phoneNumber: vendor.phoneNumber,
      image: vendor.image,
    };
    return await this.vendorsRepository.updateVendor(vendor.vendorId, vendorData);
  }

  async deleteVendor(vendorId) {
    return await this.vendorsRepository.deleteVendor(vendorId);
  }
}
