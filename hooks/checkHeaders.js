function checkHeaders(ses) {
  let returned = undefined;
  if (ses) {
    returned = { Authorization: `Bearer ${ses.accessToken}` };
  } else {
    returned = { "Content-Type": "application/x-www-form-urlencoded" };
  }
  return returned;
}

export default checkHeaders;
