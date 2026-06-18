import React from "react";
import { LoginPage } from "../(components)/Login";

const page = () => {
  return (
    <LoginPage
      title="Staff"
      titleAccent="Portal"
      description="Manage the global manpower distribution network."
      emailPlaceholder="staff@email.com"
      userType="staff"
    />
  );
};

export default page;
