import React from 'react';

import Modal from './Modal';

export default function PolicyModal({ setPolicyModal }) {
  const subheadingClassnames = `text-xl font-bold`;
  const bodyClassnames = `text-lg`;

  const Section = ({ title, children, config }) => {
    return (
      <div className={`flex flex-col gap-1 ${config}`}>
        <h2 className={`${subheadingClassnames}`}>{title}</h2>
        <div className={`flex flex-col gap-3 ml-4 ${bodyClassnames}`}>{children}</div>
      </div>
    );
  }

  return <>
    <Modal backgroundColor={`bg-greywhite w-3/4 h-[70vh]`} blurOnClick={() => setPolicyModal(false)}>
      <div className='flex flex-col'>
        <h1 className='font-bold text-2xl text-center'>Portland Indigenous Marketplace Vendor Policy Handbook</h1>
        <h2 className='font-bold text-md text-center text-slate-400'>Updated Aug 2024</h2>
      </div>
      <div className='flex flex-col gap-10'>
        <Section title='Mission Statement'>
          <p>
            Portland Indigenous Marketplace supports indigenous artists and
            entrepreneurs by providing barrier-free, culturally respectful spaces that
            encourage cultural resilience and economic sustainability by promoting
            public education through cultural arts</p>
        </Section>
        <Section title='Introduction'>
          <p>The nonprofit Portland Indigenous Marketplace and their
            Indigenous Marketplace programming together with vendors and event
            staff have compiled this Vendor Policy Handbook to better communicate all
            rules and expectations from vendors that are part of the Indigenous
            Marketplace programming.</p>
          <p>By following the rules and policies outlined in this Vendor Policy Handbook
            you help keep the Indigenous Marketplace community a supportive, viable
            and enjoyable environment for the entire community. As an approved
            Indigenous Marketplace vendor, you are responsible for informing yourself
            and your booth staff/guests/family about following all applicable
            marketplace rules, policies and regulations set forth in this Vendor
            Handbook as well as local, tribal, state and federal policies, rules and
            guidelines. All vendors are asked to comply with the rules and policies
            outlined by the Vendor Policy Committee to remain a vendor in good
            standing. This is a live document and this organization’s serving Board,
            Executive Director, and the Vendor Policy Committee reserve the right to
            modify the policies of the Indigenous Marketplace as circumstances
            warrant. Vendors will receive advance warning, and a revised copy of the
            rules as soon as changes are incorporated into the rules.</p>
          <p>Questions or concerns can be sent to info@indigenousmarketplace.org or 503-901-3881</p>
        </Section>
        <Section title='Indigenous Marketplace Vendor Policies'>
          <Section title='1.'>
            <Section config='ml-4' title='a.'>
              <p > Vendors agree to donate one raffle item to the organization per
                marketplace day that they participate in as a vendor. The item
                donated should be a true representation of the vendor's talent/booth
                with a value of at least $20. Upon review donation could qualify for a
                maximum of 2 days raffle donation.</p>
            </Section>
            <Section config='ml-4' title='b.'>
              <p > Silent Auction Donation Item due at the end of Feb of each
                calendar year, every participating approved vendor will be asked to
                donate a Silent Auction item with a value of a minimum of $50. If
                a vendor has not participated in an Indigenous Marketplace the
                previous calendar year, the annual silent auction item is optional</p>
            </Section>
          </Section>
          <Section title='2.'>
            <p >Vendors agree that all products are made or designed by the Vendor.
              Used or flea-market goods, manufactured items, or commercial,
              brand merchandise are not permitted for sale at the Indigenous
              Marketplace events. Buying products from another vendor,
              wholesaler, store or other operation and then selling those products
              un-altered or not personalized is prohibited at Indigenous
              marketplaces events. Vendors may only sell products for which they
              have been approved, per their application the Exception Process
              Exhibit 1 (upon approval each vendor may have 1 approved item that
              they did not make or design if the Vendor Policy Committee finds that
              the item integrates into the vendors booth).</p>
          </Section>
          <Section title='3.'>
            <p>
              Attendance tracking begins with the first scheduled market day.
              Vendors agree to cancel a market date by notifying staff at least 48
              hours in advance. Notice must be given by calling the general PIM
              number 503-901-3881 or directly contacting the appropriate staff
              member via phone or email. Vendors are allowed 2 excused absences
              per market year. In addition, 2 emergency cancellations are permitted
              without proper notice. All absences must be used before a Policy
              Complaint is completed, all absences are forgiven at the end of each
              calendar year.
            </p>
          </Section>
          <Section title='4.'>
            <p>
              Vendors agree to set up by the start time of the Indigenous
              marketplace events and stay for the duration of marketplace hours. If
              vendor is running late or if a need to leave before the marketplace
              ends arises, vendors agree to communicate with staff before initiating
              any pack up. In such case during breakdown, the utmost care must be
              taken to ensure the safety of our customers and fellow vendors. Staff
              reserves the right to ask vendor to cover table until the end of planned
              marketplace hours.
            </p>
          </Section>
          <Section title='5.'>
            <p>
              Vendor space at the Indigenous Marketplace events will only be
              shared with other approved Indigenous Marketplace vendors. Any
              family or friends with the intent to vend will need to complete a
              vendor application and be approved before vending. (Family, friends
              and staff are welcomed in your space if they are there to support not
              sell their own products), Everyone in a booth space is responsible to
              follow the policies in this handbook.
            </p>
          </Section>
          <Section title='6.'>
            Vendors agree when using canopies/tents they must have four
            grounded and weighted corners. A minimum of 20 pounds of weight
            is required to hold down and to secure EACH canopy leg. Weights will
            be inspected periodically to ensure proper weights are attached to
            your canopies. **Each vendor is responsible for damages incurred
            due to fly-aways of their display, canopy or inventory** PIM staff
            strongly encourage set ups that can be stabilized when winds pick up.
            PIM is not responsible for any personal losses or damages.
          </Section>
          <Section title='7.'>
            <p>Vendors agree not to drive any motorized vehicle in the marketplace
              area during marketplace hours. If late arrivals or early pack ups
              occur, you will not be able to drive your vehicle into the marketplace
              area to unload or load but carts and equipment may be available for
              loading/unloading needs</p>
          </Section>
          <Section title='8.'>
            <p>Before leaving the market, all vendors must clean their booth spaces
              and ensure that all litter, broken equipment, produce, and other
              product debris is removed.</p>
          </Section>
          <Section title='9.'>
            <p>While imitation is the sincerest form of flattery, please respect your
              fellow vendors’ ideas and concepts and refrain from copying
              them. When a Policy #9 complaint is brought forward the committee
              asks for photo/video or other proof that will can reviewed to support
              any completed complaints.</p>
          </Section>
          <Section title='10.'>
            <p>Vendors and all booth staff/guests/family agree to engage in
              respectful communications with each other, staff, community
              members, and volunteers</p>
          </Section>
          <Section title='11.'>
            <p>Vendors agree to NOT sell any sacred items at the Indigenous
              Marketplace events and partnering events. This includes any items
              that are for spiritual use such as: smudge items, palo santo, cedar,
              sweet grass, sage, feathers or anything related are not permitted for
              sale at the Indigenous Marketplace events.</p>
          </Section>
        </Section>
        <Section title=''>
          <p>Complaints concerning policies 1-11 must be submitted by completing the
            Indigenous Marketplace Complaint Form in hardcopy (Exhibit 3) or digital
            form to PIM staff within 24-48hrs of the marketplace day that the alleged
            violation is observed. The complaint will then be given to the Vendor Policy
            Committee for review. The complaint must clearly identify the alleged
            person of interest, either through vendor name, business name or booth
            location on the day of the infraction, plus provide the staff with written
            evidence as to the nature of the alleged violation.</p>
        </Section>

        <Section title='What happens when a policy complaint occurs?'>
          <p>When a complaint is brought forward by community, vendors,
            volunteers or staff the Vendor Policy Committee will review complaint. If
            the complaint is found valid the vendor of interest will receive a notice of
            the appropriate level of accountability.</p>
          <Section title='1.'>
            <p>First infraction. A warning will be issued (exhibit 3) to vendor
              in writing/email and recorded in file/history of vendor.</p>
          </Section>
          <Section title='2.'>
            <p>Second infraction. A face to face or zoom meeting will be
              needed with staff and Vendor Policy Committee before
              returning to in person events. This infraction will be recorded in
              writing/email to the vendor and recorded in file/history of
              vendor (exhibit 3).</p>
          </Section>
          <Section title='3.'>
            <p>A plan of separation for the Indigenous Marketplace
              programming and the Vendor. For severe infractions including
              but not limited to violence and hate the plan of separation may
              be permanent. This plan of separation will be shared in
              writing/email to the vendor and recorded in file/history of
              vendor (exhibit 3).</p>
          </Section>
          <Section title='4.'>
            <p>Extreme Exceptions: Staff and the Vendor Policy Committee
              hold the right for severe violations that include but not limited
              to violence and hate to recommend the plan of separation to be
              activated with the first validated infraction with written
              reasoning (exhibit 3) of being extreme to be reviewed by the
              Board of Directors of the Portland Indigenous Marketplace.
              This Extreme Exception will be shared in writing/email to the
              vendor and recorded in file/history of vendor (exhibit 3).</p>
          </Section>
        </Section>
        <Section title=''>
          <p>Portland Indigenous Marketplace is committed to providing access, equal
            opportunity and reasonable accommodation for individuals with
            disabilities, medical needs and other barriers in its services, programs, and
            activities. To request reasonable accommodations through contact below.</p>
          <div className='flex flex-col'>
            <p className='text-center'>info@indigenousmarketplace.org</p>
            <p className='text-center'>or 503-901-3881</p>

          </div>
        </Section>
        <p>Information on this page could be outdated. Please contact the organization for updated policies.</p>
        <button onClick={() => {
          setPolicyModal(false);
        }} className='bg-blue text-white p-5'>Close Handbook</button>
      </div>
    </Modal>
  </>
}
