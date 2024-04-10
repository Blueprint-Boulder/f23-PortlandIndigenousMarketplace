import VendorsRepository from './VendorsRepository.js';
import Vendor from '../../objects/Vendor.js';

export default class VendorsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.vendorsRepository = new VendorsRepository(httpClient);
  }

  async getVendors() {
    const vendorsData = await this.vendorsRepository.getAllVendors();
    if (vendorsData == undefined) {
      return undefined;
    }

    return vendorsData.map((data) => new Vendor(
        data.vendor_id,
        data.name,
        data.email,
        data.website,
        data.phone_number,
        data.image,
    ));
  }

  async getPublicVendors() {
    const vendorsData = await this.vendorsRepository.getPublicVendors();
    if (vendorsData == undefined) {
      return undefined;
    }

    return vendorsData.map((data) => new Vendor(
        data.vendor_id,
        data.name,
        data.email,
        data.website,
        data.phone_number,
        data.image,
        data.is_public,
    ));
  }

  async getVendorById(vendorId) {
    const vendorData = await this.vendorsRepository.getVendorById(vendorId);
    return new Vendor(
        vendorData.vendor_id,
        vendorData.name,
        vendorData.email,
        vendorData.website,
        vendorData.phone_number,
        vendorData.image,
        vendorData.is_public,
    );
  }

  async getPublicVendorById(vendorId) {
    const vendorData = await this.vendorsRepository.getVendorById(vendorId);
    return new Vendor(
        vendorData.vendor_id,
        vendorData.name,
        vendorData.email,
        vendorData.website,
        vendorData.phone_number,
        vendorData.image,
        vendorData.is_public,
    );
  }

  async getSelfVendor() {
    const vendorData = await this.vendorsRepository.getOwnProfile();
    return new Vendor(
        vendorData.vendor_id,
        vendorData.name,
        vendorData.email,
        vendorData.website,
        vendorData.phone_number,
        vendorData.image,
        vendorData.is_public,
    );
  }

  async authenticateVendor(vendor) {
    const vendorData = {
      email: vendor.email,
      password: vendor.password,
    };
    const response = await this.vendorsRepository.authenticateVendor(vendorData);
    return response;
  }

  async createVendor(vendor, password) {
    console.log('creating vendor', vendor);
    const vendorData = {
      name: vendor.name,
      email: vendor.email,
      password: password,
      website: vendor.website,
      phoneNumber: vendor.phoneNumber,
      image: vendor.image,
      is_public: data.is_public,
    };
    return await this.vendorsRepository.createVendor(vendorData);
  }

  async updateSelfVendor(vendor) {
    const vendorData = {
      name: vendor.name,
      email: vendor.email,
      website: vendor.website,
      phone_number: vendor.phoneNumber,
      is_public: vendor.is_public,
    };
    return await this.vendorsRepository.updateSelfVendor(vendorData);
  }

  async updateVendor(vendor) {
    const vendorData = {
      name: vendor.name,
      email: vendor.email,
      website: vendor.website,
      phoneNumber: vendor.phoneNumber,
      image: vendor.image,
      is_public: vendor.is_public,
    };
    return await this.vendorsRepository.updateVendor(vendor.vendorId, vendorData);
  }

  async deleteVendor(vendorId) {
    return await this.vendorsRepository.deleteVendor(vendorId);
  }

  async logout() {
    return await this.vendorsRepository.logout();
  }
}
