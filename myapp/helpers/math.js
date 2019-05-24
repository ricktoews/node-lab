var axios = require('axios');

function getTriList(n) {
  let triList = [], tri = 0;
  for (let i = 1; i <= n; i++) {
    tri += i;
    triList.push(tri);
  }
  return triList;
}

let API = {
  dc: 'http://arithmo-rest.toewsweb.net/dc/'
}

function dc(d) {
  let url = API.dc + d;
  return axios.get(url).then(res => {
    return res.data;
  })
  .catch(error => {
    let res = error.response;
	let status = res && res.status;
	return res.status;
  });
}

module.exports = {
  getTriList: getTriList,
  dc: dc
};
