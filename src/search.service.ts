export const searchCountry = async (ip: string) => {
  const countries = ['USA', 'Germany', 'Japan', 'China'];
  return new Promise((resolve) => {
    setTimeout(() => {
      const country = countries.sort(() => 0.5 - Math.random())[0];
      resolve({ country });
    }, 2000);
  })
}