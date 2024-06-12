
/** This is a sample transform function **/
export const transformProduct = (data: any) => {
  const response = data
    ? {
        title: data?.title ?? "",
        description: data?.description ?? "",
      }
    : null;

  return response;
};
