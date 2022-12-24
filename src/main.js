import { IgApiClient } from 'instagram-private-api';
import * as dotenv from 'dotenv';
dotenv.config();
import { ls_dir, read_json, delete_file } from './files.js';
import Checklist from './Checklist.js';
import poem_divider from './poem_divider.js';
import make_story_img from './make_story_img.js';
import insert_exif from './insert_exif.js';
import login from './instagram_api/login.js';
import post_story from './instagram_api/post_story.js';
import { make_logger } from './logger.js';
import sleep from './sleep.js';
import options from './options.js';

// sometimes we don't want to post
// the poem for debuggin purposes
let post_on_inst = options.post_on_inst;
// we could add a title page
let add_title_story_img = options.add_title_story_img;
// do we delete the story images at the end
let delete_imgs = options.delete_imgs;
// where the poems live
let poems_path = options.poems_path;
let stories_path = options.stories_images_path;
// wait between post requests
let wait_secs = options.sec_wait_per_post;
// make logger
const log = make_logger('', true);

// read all the poem in file
let poem_titles = ls_dir(poems_path)
    .map(f => f.name);

// delete any poems in ./stories folder
if(delete_imgs) ls_dir(stories_path)
	.forEach(s => delete_file(stories_path + s.name));
log('deleting previous stories images')

// get checklist
let checklist = new Checklist(
    'checklist', 
    poem_titles, 
);

// get next missing poem
let filename = checklist.nextMissing();

// read the poem
let { poem, author, year, title } = read_json(poems_path + filename);
log({ 
    Poem: title,
    Author: author,
    year: year
})

// divied poem into caption
let poem_texts = poem_divider({poem, author, year});
log('divided into stories');

// let create stories images
let story_imgs = [];

// create title story page
if(add_title_story_img){
    let title_story_path = stories_path + `story0.jpg`;
    let title_story_text = `Poem of the Day: \n${title}`
    let result = await make_story_img(title_story_text, title_story_path);
    story_imgs.push(title_story_path);
    log(`story image ${title_story_path}, created`);
}

// for each poem text make a story text img
for (let i = 1; i < poem_texts.length+1; i++){
    let text = poem_texts[i-1];
    let story_path =  stories_path + `/story${i}.jpg`;
    let result = await make_story_img(text, story_path);
    story_imgs.push(story_path);
    log(`story image ${story_path}, created`);
}

// add exif data to images
for (let img of story_imgs) insert_exif(img);
log('exif data added');

if(post_on_inst){
// if we are posting the poem
    // generate device
    const ig = new IgApiClient();
    // generate device
    ig.state.generateDevice(process.env.IG_USERNAME);

    // login
    await login(ig);
    // post the story
    let results = [];
    for(let story of story_imgs){
        let result = await post_story(ig, story);
        log(story + ' post result: ' + result.status);
        results.push(result);
	// wait for a minute
	log(`waiting for ${wait_secs} seconds`);
	await sleep(1000 * wait_secs);
    }

    // if we where able to post the stories, check the poem
    if( results.every(res => res.status === 'ok' ) ){
        checklist.check(filename);
        log(`${title} checked off`);
    }
}

