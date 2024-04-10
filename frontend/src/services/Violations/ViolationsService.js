import ViolationsRepository from './ViolationsRepository.js';
import Violation from '../../objects/Violation.js';

export default class ViolationsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.violationsRepository = new ViolationsRepository(httpClient);
  }

  async getViolationsByVendorId(vendorId) {
    const violationsData = await this.violationsRepository.getViolationsByVendorId(vendorId);
    return violationsData.map((data) => new Violation(
        data.violation_id,
        data.type,
        data.description,
        data.vendor_id,
    ));
  }

  async getViolationById(violationId) {
    const violationData = await this.violationsRepository.getViolationById(violationId);
    return new Violation(
        violationData.violation_id,
        violationData.type,
        violationData.description,
        violationData.vendor_id,
    );
  }

  async createViolation(violation) {
    const violationData = {
      type: violation.type,
      description: violation.description,
      vendorId: violation.vendorId,
    };
    return await this.violationsRepository.createViolation(violationData);
  }

  async updateViolation(violation) {
    const violationData = {
      violation_type: violation.type,
      violation_description: violation.description,
      vendor_id: violation.vendorId,
    };
    return await this.violationsRepository.updateViolation(violation.violationId, violationData);
  }

  async deleteViolation(violationId) {
    return await this.violationsRepository.deleteViolation(violationId);
  }
}
