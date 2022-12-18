import fs from 'fs'

const write_json = (obj, path) => {
    try{
        let str = JSON.stringify(obj)
        fs.writeFileSync(path, str);
        return true
    }catch(e) {
        console.error('could not write file');
        console.error(e)
        return false
    }
}

const read_json = path => {
    try{
        let str = fs.readFileSync(path);
        return JSON.parse(str)
    }catch(e) {
        console.error('could not read file ' + e);
        return null
    }
}

const read_file = path => {
    try{
        return fs.readFileSync(path, 'utf8');
    }catch(e) {
        console.error('could not read file ' + e);
        return null
    }
}

const delete_json = path => {
		try{
				return fs.unlinkSync(path);
		}catch(e) {
				console.error('could not delete json file ' + e);
				return null
		}
}

const fileExists = path => {
		try{
				return fs.existsSync(path);
		}catch(e) {
				console.error('could not find file ' + e);
				return false;
		}
}

const mkdir = path => 
    fs.access(path, (error) => {
        if (error) {
            // If current directory does not exist then create it
            fs.mkdir(path, { recursive: true }, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`${path} created successfully !!`);
                }
            });
        } else {
            console.log("Given Directory already exists !!");
        }
    });

const ls_dir = path => {
    try{
        return fs.readdirSync(path, { withFileTypes: true });
    }catch(e) {
        console.error('could read directory: ' + path);
        console.error(e)
        return null;
    } 
}

const delete_file = path => {
    try{
        return fs.unlinkSync(path);
    }catch(e) {
        console.error('could delete file: ' + path);
        console.error(e)
        return null;
    } 
}


export { write_json, read_json, delete_json, mkdir, ls_dir, delete_file, fileExists, read_file }

