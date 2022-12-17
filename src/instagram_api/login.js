/**
 * login.
 * this function handesl the basic login logic
 *
 * @param {} ig
 *  this is the client obj created by const ig = new IgApiClient();
 */
async function login(ig) {
    // preLoginFlow whatever it means
    await ig.simulate.preLoginFlow();
    // login
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    console.log('logged in as:', loggedInUser.username);
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    //process.nextTick(async () => { await ig.simulate.postLoginFlow(); })
}

export default login
