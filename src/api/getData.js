const urls = [
    "https://cdn.aleksandar.online/wp-json/ao/v1/menu/main",
    "https://cdn.aleksandar.online/wp-json/ao/v1/menu/social",
    "https://cdn.aleksandar.online/wp-json/wp/v2/projects",
    "https://cdn.aleksandar.online/wp-json/wp/v2/pages?filter[name]=about"
  ];

async function getData(){
    let promises = urls.map(url => fetch(url).then(r => r.json()));
    const results = await Promise.all(promises).catch(e => console.log(e));
    return results;
}

export default getData;