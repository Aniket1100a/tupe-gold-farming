const axios = require('axios');
axios.get('https://111e-2409-4090-2013-6615-813f-b565-6073-7106.ngrok-free.app/api/core/site-settings/')
  .then(res => console.log(JSON.stringify(res.data, null, 2)))
  .catch(err => console.error(err.message));
