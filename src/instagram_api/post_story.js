import { readFile } from 'fs';
import { promisify } from 'util';
import { StickerBuilder } from 'instagram-private-api/dist/sticker-builder/index.js';

const readFileAsync = promisify(readFile);

const post_story = async (ig, story_path) => {
    console.log(story_path);
    let publish_result = await ig.publish.story({
        file: await readFileAsync(story_path),
        // this creates a new config
        stickerConfig: new StickerBuilder()
        // you can also set different values for the position and dimensions
        .add(
            StickerBuilder.hashtag({
                tagName: 'Emily Dickension',
                width: 0.5,
                height: 0.5,
                x: 0.5,
                y: 0.5,
            }),
        )
        .build(),
    });
    // return result
    return publish_result;
}

export default post_story;
