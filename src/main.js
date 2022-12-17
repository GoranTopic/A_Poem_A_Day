import { IgApiClient } from 'instagram-private-api';
import * as dotenv from 'dotenv';
dotenv.config();
import { ls_dir, read_file } from './files.js';
import Checklist from './Checklist.js';
import divide from './poem_divider.js';
import make_story_img from './make_story_img.js';
import insert_exif from './insert_exif.js';
import login from './instagram_api/login.js';
import post_story from './instagram_api/post_story.js'

let poems_path = './Poems_of_the_Day/Emily_Dickenson/';
let author = 'E.D.';

// read all the poem in file
let poem_titles = ls_dir(poems_path)
    .map(f => f.name);

// get checklist
let checklist = new Checklist(
    'poems_checklist', 
    poem_titles, 
    '.'
);

// get next missing poem
let title = checklist.nextMissing();
//console.log('title');
//console.log(title);

// read the poem
let poem = read_file(poems_path + title);
//console.log('poem');
//console.log(poem)

// divied poem into caption
let poem_texts = divide(poem + `\n - ${author}`);
//console.log('poem_texts');
//console.log(poem_texts)

// for each poem text make a story img
let story_imgs = [];
for (let i = 1; i < poem_texts.length+1; i++){
    let text = poem_texts[i-1];
    let story_path =  `./stories/story${i}.jpg`;
    story_imgs.push(story_path);
    let result = await make_story_img(text, story_path);
}

// add exif data to images
for (let img of story_imgs)
    insert_exif(img);

/*

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
    console.log(story + '->' + result.status);
    results.push(result);
}

// if we where able to post the stories, check the poem
if( results.every(res => res.status === 'ok' ) )
    checklist.check(title);
*/

