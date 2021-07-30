const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

const urls = [
  "https://cdn.aleksandar.online/wp-json/ao/v1/menu/main",
  "https://cdn.aleksandar.online/wp-json/ao/v1/menu/social",
  "https://cdn.aleksandar.online/wp-json/wp/v2/projects",
  "https://cdn.aleksandar.online/wp-json/wp/v2/pages?filter[name]=about",
];

async function getData() {
  let promises = urls.map((url) =>
    fetch(corsProxyUrl + url).then((r) => r.json())
  );
  const results = await Promise.all(promises).catch((e) => console.log(e));
  return {
    menus: { main: results[0], social: results[1] },
    projects: results[2],
    about: results[3],
  };
}

export default getData;
