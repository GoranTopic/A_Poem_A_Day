import { IgApiClient } from 'instagram-private-api';
import * as dotenv from 'dotenv';
dotenv.config();
import lodash from 'lodash';
const { sample } = lodash;


const ig = new IgApiClient();
console.log("ig user id", process.env.IG_USERNAME);
ig.state.generateDevice(process.env.IG_USERNAME);


(async () => { 
    // Execute all requests prior to authorization in the real Android application
    // Not required but recommended
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    console.log(loggedInUser);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    // Create UserFeed instance to get loggedInUser's posts
    const userFeed = ig.feed.user(loggedInUser.pk);
    const myPostsFirstPage = await userFeed.items();
    debugger;
    // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
    // print all off the coptions from the first page of posts
    Object.values(myPostsFirstPage)
        .forEach( 
            post => console.log(post.caption?.text)
        );
    /*
    await ig.media.like({
        // Like our first post from first page or first post from second page randomly
        mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
        moduleInfo: {
            module_name: 'profile',
            user_id: loggedInUser.pk,
            username: loggedInUser.username,
        },
        d: sample([0, 1]),
    });
    */
    
})();
