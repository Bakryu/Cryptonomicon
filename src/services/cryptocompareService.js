export default async function getResource(currency) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USD&api_key=f81a5394b7647ae20f8b93bb08c0efeb0b88dfd110bda5ea6c3e0af2340573c2`
  );
  return await res.json();
}
