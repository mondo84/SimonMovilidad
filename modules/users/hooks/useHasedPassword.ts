import bcrypt from "bcrypt";

// Este metodo se usa cuando se registra un nuevo usuario.
const hasedPass = async (pass: string): Promise<string> => {
  const res = await bcrypt.hash(pass, 10);
  return res;
};

export default hasedPass;
