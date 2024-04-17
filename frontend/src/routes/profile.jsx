import React, {useEffect, useContext, useState} from 'react';
import handbook from './../assets/Handbook.png';
import {useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Context} from '../services/context';
import FooterPad from '../components/footerpad';
import ViolationModal from '../components/violationmodal';
import Alert from '../components/alert';

function editModal({handleSubmit, closeModal}){

}

export default function Profile({vendorService, violationService}) {
  const {vendorId} = useParams();
  const [vendor, setVendor] = useState({});
  const [openViolation, setOpenViolation] = useState(false);
  const [numViolations, setNumViolations] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const {user, setMessage, setBad} = useContext(Context);
  const [validEmail, setValidEmail] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   setMessage('Please log in');
    //   setBad(true);
    //   navigate('/');
    // }

    const fetchVendor = async () => {
      const vendorData = await vendorService.getVendorById(vendorId);
      if (!vendorData) {
        setMessage('Vendor not found');
        setBad(true);
        navigate('/vendors');
      } else {
        setVendor(vendorData);
      }
    };

    fetchVendor();
  }, []);


  const handleViolation = () => {
    setOpenViolation(true);
  };

  const incrementViolations = () => {
    setNumViolations(numViolations + 1);
  };

  const handleEditVendor = async () => {
    const response = await vendorService.updateSelfVendor(vendorData);
    if (response) {
      setMessage('Updated succesfully');
      const vendorData = await vendorService.getVendorById(vendorId);
      setVendor(vendorData);
    } else {
      setBad(true);
      setMessage('Failed to update');
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
    if (email === '') {
      setValidEmail(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(email)) {
      setVendorData({...vendorData, email: email});
      setBadLocal(false);
      setValidEmail(true);
    } else {
      // The website input does not match the pattern
      setValidEmail(false);
      setBadLocal(true);
    }
  };

  const handleWebsiteChange = (e) => {
    const website = e.target.value;
    const pattern = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (website === '') {
      setValidWebsite(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(website)) {
      // The website input matches the pattern
      setVendorData({...vendorData, website: website});
      setBadLocal(false);
      setValidWebsite(true);
    } else {
      // The website input does not match the pattern
      setValidWebsite(false);
      setBadLocal(true);
    }
  };

  async function handleSubmit(profile){
    console.log("Profile", profile);
    if(modalOpen){
      const res = await profileService.editProfile(); //Need to update with actual service
      console.log("Res status", res.status);
      if (res !== undefined){
        console.log("Profile updated successfully")
      }else{
        console.log("Failed to update Profile")
      }

    }
  }
  function EditProfileModal({ handleSubmit, vendor }) {
    const [profileInfo, setProfileInfo] = useState({
      name: vendor.name,
      email: vendor.email,
      phoneNum: vendor.phoneNumber,
      website: vendor.website,
      insta: vendor.insta,
      x: vendor.x,
      facebook: vendor.facebook,
    });
  
    return (
      <form
        action=''
        className='grid z-50 gap-2 p-4 lg:grid-cols-12 grid-cols-3 left-0 right-0 top-0 bottom-0 mt-auto mb-auto h-4/6 lg:ml-auto lg:mr-auto rounded-sm lg:w-8/12 w-full fixed bg-grey-1'
        onSubmit={() => handleSubmit(profileInfo)}
      >
        <div className='lg:col-span-2 col-span-1 my-auto'>Name:</div>
        <input
          className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1'
          required
          type='text'
          id='name'
          name='name'
          value={profileInfo.name}
          onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
        />
        <div className='lg:col-span-2 col-span-1 my-auto'>Email:</div>
        <input
          className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1'
          required
          type='text'
          id='email'
          name='email'
          value={profileInfo.email}
          onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
        />
        <div className='lg:col-span-2 col-span-1 my-auto'>Phone Number:</div>
        <input
          className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1'
          required
          type='text'
          id='phoneNum'
          name='phoneNum'
          value={profileInfo.phoneNum}
          onChange={(e) => setProfileInfo({ ...profileInfo, phoneNum: e.target.value })}
        />
        <div className='lg:col-span-2 col-span-1 my-auto'>Website:</div>
        <input
          className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1'
          required
          type='text'
          id='website'
          name='website'
          value={profileInfo.website}
          onChange={(e) => setProfileInfo({ ...profileInfo, website: e.target.value })}
        />
       <div className='lg:col-span-12 col-span-3 my-auto'>Social Handles:</div> 
       <input type="text" className='lg:col-span-4 col-span-1 rounded-md shadow-md p-1 placeholder:italic placeholder:text-slate-400' placeholder="Instagram" id='insta' name='insta' value={profileInfo.insta} onChange={(e) => setProfileInfo({ ...profileInfo, insta: e.target.value })}/>
       <input type="text" className='lg:col-span-4 col-span-1 rounded-md shadow-md p-1 placeholder:italic placeholder:text-slate-400' placeholder="X" id='x' name='x' value={profileInfo.x} onChange={(e) => setProfileInfo({ ...profileInfo, x: e.target.value })}/>
       <input type="text" className='lg:col-span-4 col-span-1 rounded-md shadow-md p-1 placeholder:italic placeholder:text-slate-400' placeholder="Facebook" id='facebook' name='facebook' value={profileInfo.facebook} onChange={(e) => setProfileInfo({ ...profileInfo, facebook: e.target.value })}/>
        <button
          onClick={() => {
            setEditModal(false);
          }}
          className='bg-red lg:col-span-4 col-span-1 rounded-md shadow-sm text-white p-1 '
        >
          Cancel
        </button>
        <button type='submit' className='bg-blue lg:col-span-8 col-span-2 rounded-md shadow-sm text-white p-1 '>Save Changes</button>
      </form>
    );
  }
  return (
    <div className='items-center h-[80vh] w-screen flex flex-col space-y-4 items-center'>
      <div className='flex flex-row items-center bg-white p-2 px-5 w-10/12 rounded-lg drop-shadow-xl'>
        <div className='rounded-full'>
          <img className='w-20' src={'/profilepics/' + vendor.image} alt="vendor profile pic" />
        </div>
        <h1 className='text-xl ml-4'>{vendor.name}</h1>
        {
          (user.id == vendorId || user.isadmin ) &&
          <button className='ml-auto' onClick={() => {
            setEditModal(true);
          }}>Edit</button>
        }
      </div>
      <hr className='bg-grey-1 w-9/12 drop-shadow-lg'/>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>{vendor.email}</li>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>{vendor.phoneNumber}</li>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>{vendor.website}</li>
        {/* <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>Location</li> dont think this is necessary */}
      </div>
      <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {/* {socials.insta && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={socials.insta} target="_blank"><FontAwesomeIcon icon={faSquareInstagram} size="2x"/></a></li>}
        {socials.x && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={socials.x} target="_blank"><FontAwesomeIcon icon={faSquareXTwitter} size="2x"/></a></li>}
        {socials.facebook && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={socials.facebook} target="_blank"><FontAwesomeIcon icon={faSquareFacebook} size="2x"/></a></li>} */}
      </div>
      <div className='bg-white w-10/12 p-2 rounded-lg drop-shadow-lg'>
        <h1 className='text-xl'>Upcoming Events</h1>
        <p>Insert upcoming events modal/reference here</p>
      </div>
      <div className='bg-white w-10/12 p-2 rounded-lg drop-shadow-lg'>
        <div className='flex flex-row justify-between'>
          <h1 className='flex-1'>Violations: {numViolations}</h1>
          {user.isadmin && (
            <button className="bg-red drop-shadow-xl border border-0 rounded-md w-4/12 h-2/12" onClick={() => handleViolation()}>Add A Violation</button>
          )}
        </div>
        <div className='flex flex-col items-center drop-shadow-lg'>
          <button onClick={() => {
            setPolicyModal(true);
          }}>
            <img src={handbook} alt="Policy Handbook" />
          </button>

          <h1 className='text-xl w-auto font-bold'>Policy Handbook</h1>
        </div>
      </div>
      {openViolation && <ViolationModal closeModal={setOpenViolation} vendor={vendor} setViolations={incrementViolations} />}
      {
      editModal && (
        <EditProfileModal handleSubmit={handleSubmit} vendor={vendor} />
      )
    }
      {
        policyModal && (
          <div className='absolute bg-white rounded-md p-2 drop-shadow-lg w-11/12 h-4/6'>
          <div className='flex flex-col justify-center h-full'>
            <div className='overflow-auto max-h-full'>
              <p className='overflow-x-scroll text-left p-5'>
                <h1 className='font-bold'>Mission Statement:</h1>
                Portland Indigenous Marketplace supports indigenous artists and
                entrepreneurs by providing barrier-free, culturally respectful spaces that
                encourage cultural resilience and economic sustainability by promoting
                public education through cultural arts
                  <h1 className='font-bold'>Introduction:</h1>
                  <p>
                   The nonprofit Portland Indigenous Marketplace and their
                    Indigenous Marketplace programming together with vendors and event
                                   staff have compiled this Vendor Policy Handbook to better communicate all
                                   rules and expectations from vendors that are part of the Indigenous
                                   Marketplace programming.
                  </p>
                By following the rules and policies outlined in this Vendor Policy Handbook
                you help keep the Indigenous Marketplace community a supportive, viable
                and enjoyable environment for the entire community. As an approved
                Indigenous Marketplace vendor, you are responsible for informing yourself
                and your staff about following all applicable marketplace rules, policies and
                regulations set forth in this Vendor Handbook as well as local, tribal, state
                and federal policies, rules and guidelines. All vendors are asked to comply
                with the rules and policies outlined by the Vendor Policy Committee to
                remain a vendor in good standing.
                This is a live document and this organization’s serving Board, Executive
                Director, and the Vendor Policy Committee reserve the right to modify the
                policies of the Indigenous Marketplace as circumstances warrant. Vendors
                will receive advance warning, and a revised copy of the rules as soon as
                changes are incorporated into the rules.
                Questions or concerns can be sent to info@indigenousmarketplace.org
                or 503-901-3881
                Portland Indigenous Marketplace:Vendor Policy Handbook

                  <h1 className='font-bold'>Indigenous Marketplace Vendor Policies:</h1>
                  <p>
                  1. a. Vendors agree to donate one raffle item to the organization per
                  marketplace day that they participate in as a vendor. The item
                  donated should be a true representation of the vendor's talent/booth
                  with a value of at least $20. Upon review donation could qualify for a
                  maximum of 2 days raffle donation.
                  b. In Nov/Dec of each year every approved vendor will be asked to
                  donate a Silent Auction item with a value of a minimum of $50.
                  This donation will be needed to participate as an approved
                  Indigenous Marketplace vendor into the following of each year.
                  </p>
                  <p>
                  2. Vendors agree that all products are made or designed by the Vendor.
                  Used or flea-market goods, manufactured items, or commercialbrand merchandise are not permitted for sale at the Indigenous
                  Marketplace events. Buying products from another vendor,
                  wholesaler, store or other operation and then selling those products
                  un-altered or not personalized is prohibited at Indigenous
                  marketplaces events. Vendors may only sell products for which they
                  have been approved, per their application the Exception Process
                  Exhibit 3 (upon approval each vendor may have 1 approved item that they did
                  not make or design if the Vendor Policy Committee finds that the item integrates
                  into the vendors booth).
                  </p>
                3. Attendance tracking begins with the first scheduled market day.
                Vendors agree to cancel a market date by notifying staff at least 48
                hours in advance. Notice must be given by calling the general PIM
                number 503-901-3881 or directly contacting the appropriate staff
                member via phone or email. Vendors are allowed 2 excused absences
                per market year. In addition, 2 emergency cancellations are permitted
                without proper notice.

                  <p>
                  4. Vendors agree to set up by the start time of the Indigenous
                  marketplace events and stay for the duration of marketplace hours. If
                  vendor is running late or if a need to leave before the marketplace
                  ends arises, vendors agree to communicate with staff before initiating
                  any pack up. In such case during breakdown, the utmost care must be
                  taken to ensure the safety of our customers and fellow vendors. Staff
                  reserves the right to ask vendor to cover table until the end of planned
                  marketplace hours.
                  </p>
                  <p>
                  5. Vendor space at the Indigenous Marketplace events will only be
                  shared with other approved Indigenous Marketplace vendors. Any
                  family or friends with the intent to vend will need to complete a
                  vendor application and be approved before vending. (Family, friends
                  and staff are welcomed in your space if they are there to support not sell their
                  own products)
                  </p>
                  <p>
                  6. Vendors agree when using canopies/tents they must have four
                  grounded and weighted corners. A minimum of 20 pounds of weight
                  is required to hold down and to secure EACH canopy leg. Weights will
                  be inspected periodically to ensure proper weights are attached to
                  your canopies. **Each vendor is responsible for damages incurred
                  due to fly-aways of their display, canopy or inventory** PIM staff
                  strongly encourage set ups that can be stabilized when winds pick up.
                  PIM is not responsible for any personal losses or damages.
                  </p>
                  <p>
                  7. Vendors agree not to drive any motorized vehicle in the marketplace
                  area during marketplace hours. If late arrivals or early pack ups
                  occur, you will not be able to drive your vehicle into the marketplace
                  area to unload or load but carts and equipment may be available for
                  loading/unloading needs.
                  </p>
                  <p>
                  8. Before leaving the market, all vendors must clean their booth spaces
                  and ensure that all litter, broken equipment, produce, and other
                  product debris is removed.
                  </p>

                  <p>
                  9. While imitation is the sincerest form of flattery, please respect your
                  fellow vendors’ ideas and concepts and refrain from copying them.
                  </p>
                  <p>
                  10. Vendors agree to engage in respectful communications with staff, community members, and volunteers.
                  Complaints concerning policies 1-10 must be submitted by completing the
                  Indigenous Marketplace Complaint Form in hardcopy (Exhibit 1) or digital
                  form to PIM staff within 24-48hrs of the marketplace day that the alleged
                  violation is observed. The complaint will then be given to the Vendor Policy
                  Committee for review. The complaint must clearly identify the alleged
                  person of interest, either through vendor name, business name or booth
                  location on the day of the infraction, plus provide the staff with written
                  evidence as to the nature of the alleged violation.
                  </p>
                  <h1 className='font-bold'>What happens when a policy complaint occurs?</h1>
                  <p>When a complaint is brought forward by community, vendors,
                volunteers or staff the Vendor Policy Committee will review complaint. If
                the complaint is found valid the vendor of interest will receive a notice of
                the appropriate level of accountability.
                <p>
                1. First infraction. A warning will be issued (exhibit 3) to vendor
                in writing/email and recorded in file/history of vendor.
                </p>
                <p>
                2. Second infraction. A face to face or zoom meeting will be
                needed with staff and Vendor Policy Committee before
                returning to in person events. This infraction will be recorded in
                writing/email to the vendor and recorded in file/history of
                vendor (exhibit 3).
                </p>
                <p>
                3. A plan of separation for the Indigenous Marketplace
                programming and the Vendor. For severe infractions including
                but not limited to violence and hate the plan of separation may
                be permanent. This plan of separation will be shared in
                writing/email to the vendor and recorded in file/history of
                vendor (exhibit 2).
                </p>
                <p>
                4. Extreme Exceptions: Staff and the Vendor Policy Committee
                hold the right for severe violations that include but not limited
                to violence and hate to recommend the plan of separation to be
                activated with the first validated infraction with written
                reasoning (exhibit 2) of being extreme to be reviewed by the
                Board of Directors of the Portland Indigenous Marketplace.
                This Extreme Exception will be shared in writing/email to the
                vendor and recorded in file/history of vendor (exhibit 2).
                </p>
                Portland Indigenous Marketplace is committed to providing access, equal
                opportunity and reasonable accommodation for individuals with
                disabilities, medical needs and other barriers in its services, programs, and
                activities. To request reasonable accommodations through contact below. 
                <a className='font-bold' href="mailto:info@indigenousmarketplace.org">info@indigenousmarketplace.org</a> 
                or <p className='font-bold'>503-901-3881</p>
                Thank you for being a part of the Indigenous Marketplace community!
                  </p>
                </p>
              </div>
              <button onClick={()=>{
                setPolicyModal(false);
              }} className='bg-blue text-white p-5'>Close Handbook</button>
            </div>
          </div>
        )
      }
      <FooterPad/>
    </div>

  );
}

Profile.propTypes = {
  vendorService: PropTypes.shape({
    getVendorById: PropTypes.func.isRequired,
    updateSelfVendor: PropTypes.func.isRequired,
  }).isRequired,
  violationService: PropTypes.shape({
    createViolation: PropTypes.func.isRequired,
  }).isRequired,
};
