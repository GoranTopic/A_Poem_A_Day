import im from 'imagemagick';

const make_story_img = async (text, story_filename) => 
    await new Promise( (res, rej) => {
        im.convert([
            '-size', '1080x1920', 
            '-background', 'black', 
            '-fill', 'white', 
            '-font', 'Corsiva', 
            //'-pointsize', '24',
            '-gravity', 'center', 
            `label:${text}`,
            story_filename,
        ], (err, stdout) => {
            if(err)
                throw err
            else
                res(stdout);
        })
    });

export default make_story_img
