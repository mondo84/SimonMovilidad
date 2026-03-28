export const GET = (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  console.log("GET ROUTE ID Params: ", id);

  return null;
};
