const Axios = require('axios');

async function getEncToken(user) {
  const { userID, password, auth_type, totp_secret } = user;
  const body = { userID, password, auth_type, totp_secret };
  try {
    const response = await Axios.post(process.env.YODHA_LOGIN_LAMBDA, body);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getEncToken;
