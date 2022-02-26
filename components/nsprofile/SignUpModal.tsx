/* eslint-disable */
//@ts-nocheck
import React from "react";
import Modal from "../Modal";
import SignUp from "./SignUp";

const SuperModal = ({ objectId, isProfileAvailable, setRecheck }) => {
  return (
    <>
      <Modal
        isOpen={!isProfileAvailable && isProfileAvailable !== undefined}
        header={"Let's set up your Northstarre profile!"}>
        <SignUp id={objectId} onSubmit={setRecheck} />
      </Modal>
    </>
  );
};
export default SuperModal;
