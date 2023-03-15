module.exports = (baseUrl) => (req, res) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const params = {};
  const pathname = parsedUrl.pathname;
  const id = parsedUrl.search.slice(1);
  pathname.split("").find((letter, index) => {
    if(letter === ":"){
      params.id = id;
      return true;
    }
    return false;
  })
  req.pathname = parsedUrl.pathname;
  req.params = params;
}