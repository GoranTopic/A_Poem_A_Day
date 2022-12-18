// the cut off for the story is 10 lines
let cut_off = 10;

const divide = ({poem, author, year}) => {
    // add author and year to the end of the poem
    poem = poem + `\n - ${author} (${year})`;
    // add 'poem of the day' message
    poem = poem + `\n\npoem of the day`;
    // get lines of poem
    let lines = poem.split(/\r\n|\r|\n/);
    // count the enumber of lines
    let count_lines = lines.length
    // divided poem
    let divs = count_lines / cut_off;
    // number of pages
    var pages = Math.floor(divs);
    //  the lst lines of the poem
    let remaining_lines = divs - pages;
    // divied poem
    let poem_texts = []

    // for every page
    for(let i = 1; i < pages+1; i++){
        let start_line = 0 + ( cut_off * (i-1));
        let end_line = cut_off * i;
        let current_lines = lines.slice(start_line, end_line);
        poem_texts.push(current_lines.join('\n'));
    }
    // if there is a reminer
    if(remaining_lines > 0){
        let start_line = cut_off * pages;
        let end_line = count_lines;
        let current_lines = lines.slice(start_line, end_line);
        let text = current_lines.join('\n');
        poem_texts.push(current_lines.join('\n'));
    }
    // return the divied poem text
    return poem_texts;
}

export default divide;

