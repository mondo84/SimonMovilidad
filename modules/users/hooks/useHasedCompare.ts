import bcrypt from "bcrypt";

// Para el login.
const equalShash = async (pass: string): Promise<boolean> => {
  const savedHash =
    "$2a$12$skdyH0xbZ0HSFLekManfvOWA1aerBcSJjLmsv7jiJUUyM43BkhpgG";
  const res = await bcrypt.compare(pass, savedHash);
  return res;
};

export default equalShash;
