import React, { useState } from "react";
import SignatureComponent from "./SignatureComponent";

const ContractComponent = ({ signature, setSignature }) => {
  const [accepted, setAccepted] = useState(false);
  const [signatureData, setSignatureData] = useState("");

  // Function to handle the saved signature
  const handleSignatureSave = (compressedSignature) => {
    setSignatureData(compressedSignature);
  };

  const toggleAccept = () => {
    setAccepted(!accepted);
  };

  return (
    <div className="p-6 font-sans bg-white">
      <h2 className="text-2xl font-bold mb-4 text-peach-600 text-center">
        Wedding Makeup Artist Contract
      </h2>

      <p className="font-semibold text-peach-600 text-center">
        <strong className="text-peach-600">Policies</strong>
      </p>
      <div className="max-h-[300px] overflow-y-auto mb-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-peach-600">Booking</h3>
        <p className="mb-2">
          The Wedding/PRENUP date will be officially booked once the 50% or
          required amount of downpayment is received/complete. This will
          permanently block the booked schedule slot & the Makeup Artist will
          not accept another client on the same slot. Cancellation of service
          for the Wedding day will lead you to <strong>PAY</strong> the{" "}
          <strong>FULL REGULAR RATE</strong> of PRENUP which is in the amount of{" "}
          <strong>10,000.00</strong> plus transpo fee during the prenup, due to
          the fact that you are availing the PRENUP PROMO PACKAGE rate.
        </p>
        <h3 className="text-xl font-semibold text-peach-600">Payment</h3>
        <p className="mb-2">
          Downpayment of 50% of the total amount of service(s) or advised
          minimum amount is required to confirm the booking in order to secure
          the date. This downpayment is non-refundable and non-transferable. The
          remaining balance should be paid on or before the day of the event. In
          case, fail to pay the remaining balance on the due date, we are giving
          the chance for you to pay it within 3 days starting from the due date
          otherwise,{" "}
          <strong>
            <em>Legal action will be applied</em>
          </strong>
          . Mode of payment can be through CASH OR BANK TRANSFER.{" "}
          <strong>Gratuity</strong> is never expected but always appreciated.
        </p>
        <h3 className="text-xl font-semibold text-peach-600">
          Freebies & Inclusions Rules
        </h3>
        <p>
          The descriptions & quantities of Inclusions & Freebies that are
          mentioned below must be followed. Verbal changes during the Wedding
          day is strictly prohibited and will not be granted. Without the
          presence|not availing of inclusions and freebies (PAX) mentioned
          below, the remaining amount due will not be deducted and must be paid
          completely. <strong>REMINDER: FREEBIES HAS NO COST</strong> and the
          Makeup Artist is not obliged to refund or to insert a proxy from the
          absence of PAX mentioned below. <strong>FREEBIES PURPOSES: </strong>
          It’s a Gift and doesn’t have cost, to share happiness to the Bride and
          to make the outlook of the Bride beautifully.
        </p>

        <h3 className="text-xl font-semibold text-peach-600">
          SATISFACTION GUARANTEED:
        </h3>
        <p>
          Makeup and Hairstyle will be completed to its client satisfaction.
          Whenever there are concerns about our services during the preparation,
          kindly & respectfully approach us immediately and we will cater your
          needs right away. Acknowledgment of services done will be considered
          as a client’s satisfaction and we are expecting that there will be{" "}
          <strong>no complaints afterwards</strong>. Complaints in{" "}
          <strong>Public|Social Media Defamation</strong> during and after the
          Wedding day against{" "}
          <strong>GRACE CLARUS SIBAYAN Professional Makeup Artist</strong> is
          outlawed and{" "}
          <strong>
            <em>Legal action will be applied</em>
          </strong>
          .
        </p>
        <h3 className="text-xl font-semibold text-peach-600">
          SECURITY & TRANSPERANCY:
        </h3>
        <p>
          For awareness to our dear clients, the HMU session will be recorded
          from the time that we arrive in the venue. It’s purpose is for the
          TRANSPERANCY & PROTECTION to the clients and of the GLAM TEAM during
          the service. As well as to avoid DOMESTIC OR VERBAL VIOLENCE &
          DEFAMATION against to the glam team. This is due to numerous agony of
          the team and to my experienced from our previous clients. The recorded
          video will serve as reference whenever the both parties will need it.
        </p>
        {/* PHOTOS & VIDEOS POSTING:  */}
        <h3 className="text-xl font-semibold text-peach-600">
          PHOTOS & VIDEOS POSTING:
        </h3>
        <p>
          Client(s) is/are aware that the taken photos and videos by us during
          the hmu service will be uploaded <strong>automatically</strong> in
          different social media applications for business page’s marketing
          purposes. IF the client(s) has/have paid the service in{" "}
          <span className="text-red-700">
            <strong className="text-red-700">100%</strong>
          </span>{" "}
          <strong>REGULAR RATE</strong>, we will not upload the taken photos &
          videos,{" "}
          <strong>
            <em>IF</em>
          </strong>{" "}
          it is requested by the client to <strong>NOT</strong> upload it. IF
          the client(s) has/have paid the service in{" "}
          <strong className="text-red-700">PROMO/DISCOUNTED</strong>{" "}
          <strong>RATE</strong>,{" "}
          <strong>GRACE CLARUS SIBAYAN Professional Makeup Artist</strong> has
          the <strong>FULL RIGHTS</strong> to use and upload the photos & videos
          taken during the hmu session for Business Page’s Marketing purposes,
          but still It is <strong>NEGOTIABLE</strong>, if it is requested by the
          client(s) in proper manner and conditions will be apply to it.
        </p>
        {/* TRAVEL FEES: within CAVITE/TAGAYTAY CLIENT  */}
        <h3 className="text-xl font-semibold text-peach-600">
          TRAVEL FEES: within CAVITE/TAGAYTAY CLIENT
        </h3>
        <p>
          NO TRANSPORTATION FEE in going to Preparation Venue and in going home
          otherwise, conditions apply and transportation fee vary to its
          location. No hidden charges. But in some cases, like: The reception is
          far from Preparation venue and we are required to go in the Reception
          to change the Bride’s Look and re-touching - the couple is obliged to
          provide the transportation or refund the transportation fee
          (Preparation Venue to Reception). <strong>PARKING FEE</strong> will be
          shouldered by the client if there is any.
        </p>
        {/* RE-SCHEDULING:  */}
        <h3 className="text-xl font-semibold text-peach-600">RE-SCHEDULING:</h3>
        <p>
          Client(s) will be charged of{" "}
          <em className="text-red-600">
            ₱ 2,000.00(non-deductible in the final balance)
          </em>{" "}
          due to{" "}
          <em className="text-red-500">
            COMPROMISED PROJECT on the booked date
          </em>{" "}
          <strong>UNLESS</strong>, advance notice of 1 week prior to the
          appointment booked date has received. Also,{" "}
          <strong>It is negotiable</strong> in instances like:{" "}
          <strong>(a)</strong>The new chosen date is Occupied. Beauty Team B
          will take over the booked service & I, Grace Sibayan Makeup Artist
          will do my best to serve the Bride. <strong>(b)</strong> Due to
          Unforeseen events like: Unstable community quarantine alarm level,
          natural calamity or personal unfortunate events.
        </p>
        {/* CANCELLATION:  */}
        <h3 className="text-xl font-semibold text-peach-600">CANCELLATION:</h3>
        <p>
          Cancellation of service will lead you to pay{" "}
          <strong className="text-red-600">
            <em className="text-red-600">5,000.00</em>
          </strong>{" "}
          as penalty due to the{" "}
          <em className="text-red-500">
            COMPROMISED APPOINTMENT/PROJECT that you have booked
          </em>
          ; and cancellation of service must be made{" "}
          <strong>at least thirty (30) days</strong> prior to the client’s
          reserved date otherwise, Client(s) will be responsible for paying the
          <strong>
            {" "}
            <em>full remaining amount</em>
          </strong>{" "}
          due to services agreed upon in this contract. In instances like, due
          to UNFORSEEN NATURAL CALAMITY or PANDEMIC, details could be negotiable
          & conditions apply.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-peach-600">
          Details of Service(s) Chosen
        </h3>
        <p className="mb-2">
          <strong>Inclusions:</strong> 10 pax Adult Ladies: PRO-HD Traditional
          Makeup & Hairstyle w/ Free False Lashes...
        </p>
        <p className="mb-4">
          <strong>Assigned Team:</strong> Grace, Team B, Team C
        </p>
        <h3 className="text-xl font-semibold text-peach-600">Re-scheduling:</h3>
        <p>₱ 2,000.00 non-deductible fee applies...</p>
      </div>

      <div className="mt-4">
        <label className="flex items-center space-x-2 text-peach-400">
          <input
            type="checkbox"
            checked={accepted}
            onChange={toggleAccept}
            className="h-5 w-5"
          />
          <span>
            I agree to the terms and conditions outlined in the contract.
          </span>
        </label>
      </div>

      {/* Signature Component */}
      <div className="mt-6">
        <SignatureComponent
          accepted={accepted}
          onSave={handleSignatureSave}
          signature={signature}
          setSignature={setSignature}
        />
      </div>
    </div>
  );
};

export default ContractComponent;
