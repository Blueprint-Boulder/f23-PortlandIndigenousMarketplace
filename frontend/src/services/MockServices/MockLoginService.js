import Vendor from '../../objects/Vendor.js';
import MockVendorService from './MockVendorService.js';

/*
Provides an interface to login / register with the backend.
*/
export default class MockLoginService{
    
    //Attempts to login the user. Returns a Vendor object on success, or null on failure
    static login({email, password}) {
        //Get the vendor with the given email
        const v = MockVendorService.getVendorByEmail(email);

        //Check if the vendor exists and the password is correct
        if(v != null) return v;

        return null;
    }

    //Attempts to register the user. Returns true on success, and false on failure.
    static register({name, email, password, website, phone_number}) {
        //Check if email is already in use
        if(MockVendorService.getVendorByEmail(email) != null) return false;

        //Create the vendor
        const v = new Vendor(MockVendorService.getLastVendorId() + 1, name, email, website, phone_number);

        //Add the vendor to the database
        MockVendorService.createVendor(v);

        return true;
    }
}