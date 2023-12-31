import Vendor from '../../objects/Vendor.js';

/*
Provides an interface to retrieve vendor data from the backend.
*/
export default class MockVendorService {
  // This is static so that every instance of MockVendorService
  // has the same vendors
  static mockvendors = [];

  // Creates many mock vendors. Generated with chatgpt!
  static init() {
    if (this.mockvendors === undefined) this.mockvendors = [];

    if (this.mockvendors.length === 0) {
      this.mockvendors.push(new Vendor(
          1, 'John Smith', 'John.smith@gmail.com',
          'www.johnsmith.com', '123-456-7890', 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png'));
      this.mockvendors.push(new Vendor(
          2, 'Jane Doe', 'Jane.doe@gmail.com',
          'www.janedoe.com', '987-654-3210', 'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png'));
      this.mockvendors.push(new Vendor(
          3, 'Michael Johnson', 'Michael.johnson@gmail.com',
          'www.michaeljohnson.com', '555-123-7890', 'https://www.kasandbox.org/programming-images/avatars/purple-pi.png'));
      this.mockvendors.push(new Vendor(
          4, 'Emily Wilson', 'Emily.wilson@gmail.com',
          'www.emilywilson.com', '777-999-8888', 'https://www.kasandbox.org/programming-images/avatars/purple-pi-teal.png'));
      this.mockvendors.push(new Vendor(
          5, 'David Brown', 'David.brown@gmail.com',
          'www.davidbrown.com', '111-222-3333', 'https://www.kasandbox.org/programming-images/avatars/purple-pi-pink.png'));
      this.mockvendors.push(new Vendor(
          6, 'Sophia Taylor', 'Sophia.taylor@gmail.com',
          'www.sophiataylor.com', '444-777-2222', 'https://www.kasandbox.org/programming-images/avatars/primosaur-ultimate.png'));
      this.mockvendors.push(new Vendor(
          7, 'James Miller', 'James.miller@gmail.com',
          'www.jamesmiller.com', '888-777-9999', 'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png'));
      this.mockvendors.push(new Vendor(
          8, 'Olivia Davis', 'Olivia.davis@gmail.com',
          'www.oliviadavis.com', '666-333-1111', 'https://www.kasandbox.org/programming-images/avatars/primosaur-sapling.png'));
      this.mockvendors.push(new Vendor(
          9, 'Liam Anderson', 'Liam.anderson@gmail.com',
          'www.liamanderson.com', '555-111-7777', 'https://www.kasandbox.org/programming-images/avatars/orange-juice-squid.png'));
      this.mockvendors.push(new Vendor(
          10, 'Ava White', 'Ava.white@gmail.com',
          'www.avawhite.com', '222-444-6666', 'https://www.kasandbox.org/programming-images/avatars/old-spice-man.png'));
      this.mockvendors.push(new Vendor(
          11, 'William Moore', 'William.moore@gmail.com',
          'www.williammoore.com', '444-111-5555', 'https://www.kasandbox.org/programming-images/avatars/old-spice-man-blue.png'));
      this.mockvendors.push(new Vendor(
          12, 'Isabella Hall', 'Isabella.hall@gmail.com',
          'www.isabellahall.com', '999-555-4444', 'https://www.kasandbox.org/programming-images/avatars/mr-pants.png'));
      this.mockvendors.push(new Vendor(
          13, 'Benjamin Lewis', 'Benjamin.lewis@gmail.com',
          'www.benjaminlewis.com', '111-333-6666', 'https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png'));
      this.mockvendors.push(new Vendor(
          14, 'Mia Martinez', 'Mia.martinez@gmail.com',
          'www.miamartinez.com', '777-222-3333', 'https://www.kasandbox.org/programming-images/avatars/mr-pants-green.png'));
      this.mockvendors.push(new Vendor(
          15, 'Ethan Clark', 'Ethan.clark@gmail.com',
          'www.ethanclark.com', '333-666-9999', 'https://www.kasandbox.org/programming-images/avatars/marcimus.png'));
      this.mockvendors.push(new Vendor(
          16, 'Charlotte Walker', 'Charlotte.walker@gmail.com',
          'www.charlottewalker.com', '555-999-1111', 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png'));
      this.mockvendors.push(new Vendor(
          17, 'Daniel Green', 'Daniel.green@gmail.com',
          'www.danielgreen.com', '666-444-3333', 'https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png'));
      this.mockvendors.push(new Vendor(
          18, 'Amelia Baker', 'Amelia.baker@gmail.com',
          'www.ameiliabaker.com', '888-999-7777', 'https://www.kasandbox.org/programming-images/avatars/marcimus-orange.png'));
      this.mockvendors.push(new Vendor(
          19, 'Matthew King', 'Matthew.king@gmail.com',
          'www.matthewking.com', '222-333-4444', 'https://www.kasandbox.org/programming-images/avatars/duskpin-ultimate.png'));
      this.mockvendors.push(new Vendor(
          20, 'Grace Harris', 'Grace.harris@gmail.com',
          'www.graceharris.com', '111-888-6666', 'https://www.kasandbox.org/programming-images/avatars/duskpin-tree.png'));
    }
  }

  // Fetches all vendors from the backend
  static getVendors() {
    return this.mockvendors;
  }

  // Fetches the vendor with the given id from the backend
  static getVendorById(id) {
    const v = this.mockvendors.filter((vendor) => vendor.id === id);
    return v.length > 0 ? v[0] : null;
  }

  // Fetches the vendor with the given email from the backend
  static getVendorByEmail(email) {
    const v = this.mockvendors.filter((vendor) => vendor.email === email);
    return v.length > 0 ? v[0] : null;
  }

  // Fetches the vendor with the given name from the backend
  static getVendorByName(name) {
    const v = this.mockvendors.filter((vendor) => vendor.name === name);
    return v.length > 0 ? v[0] : null;
  }

  static getLastVendorId() {
    return this.mockvendors.length;
  }

  // Sends backend request to create a vendor from the local vendor object
  static createVendor(vendor) {
    this.mockvendors.push(vendor);
  }
}
