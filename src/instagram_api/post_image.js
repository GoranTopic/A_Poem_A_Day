import { IgApiClient } from 'instagram-private-api';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
dotenv.config();
import lodash from 'lodash';
import fs from 'fs';
const { sample } = lodash;

const ig = new IgApiClient();
console.log("ig user id", process.env.IG_USERNAME);
ig.state.generateDevice(process.env.IG_USERNAME);


(async () => { 
    // Execute all requests prior to authorization in the real Android application
    // Not required but recommended
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    console.log(loggedInUser.username);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    //process.nextTick(async () => { await ig.simulate.postLoginFlow(); })
    // Create UserFeed instance to get loggedInUser's posts
    const readFileAsync = promisify(fs.readFile);
    //let file = await readFileAsync('./stories/story1.png');
    const { latitude, longitude, searchQuery } = {
        latitude: 0.0,
        longitude: 0.0,
        // not required
        searchQuery: 'place',
    };
    const locations = await ig.search.location(latitude, longitude, searchQuery);
    const mediaLocation = locations[0];
    console.log(mediaLocation.name);
    const publishResult = await ig.publish.photo({
        // read the file into a Buffer
        file: await readFileAsync('./1651296734358.jpg'),
        // optional, default ''
        caption: 'my caption',
        // optional
        //location: mediaLocation,
    });
    console.log(publishResult);
    //console.log(file);
    debugger;
    //const userFeed = ig.feed.user(loggedInUser.pk);
    //const myPostsFirstPage = await userFeed.items();
    //console.log(myPostsFirstPage);
    // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
    /*
    Object.values(myPostsFirstPage)
        .forEach( 
            post => console.log(post.caption?.text)
        );
    
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
