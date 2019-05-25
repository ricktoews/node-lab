var axios = require('axios');

const API = {
  dc: 'http://arithmo-rest.toewsweb.net/dc/',
  phi: 'http://arithmo-rest.toewsweb.net/phi/powers/'
}

class MathToys {
  
  getTriList(n) {
    let triList = [], tri = 0;
    for (let i = 1; i <= n; i++) {
      tri += i;
      triList.push(tri);
    }
    return triList;
  }

  dc(d) {
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

  phi(n) {
    let url = API.phi + n;
	return axios.get(url).then(res => {
      return res.data;
	})
	.catch(error => {
      let res = error.response;
      let status = res && res.status;
      return res.status;
	});
  }
}

module.exports = MathToys;
