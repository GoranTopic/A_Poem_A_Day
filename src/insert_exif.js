import fs from 'fs';
import piexif from 'piexifjs';

var zeroth = {};
zeroth[piexif.ImageIFD.Make] = "Make";
zeroth[piexif.ImageIFD.XResolution] = [777, 1];
zeroth[piexif.ImageIFD.YResolution] = [777, 1];
zeroth[piexif.ImageIFD.Software] = "Goran Topic";
var exif = {};
exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
exif[piexif.ExifIFD.LensMake] = "FotoTopic";
exif[piexif.ExifIFD.Sharpness] = 777;
exif[piexif.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
var gps = {};
gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";


const insert_exif_data = file_path => {
    // read file a binary string
    let img = fs.readFileSync(file_path).toString('binary');
    // create exif data
        var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};
    var exifStr = piexif.dump(exifObj);
    // insert exif data into binary string
    let inserted = piexif.insert(exifStr, img);
    // convert back to binary
    let binary = Buffer.from(inserted, 'binary')
    // rewrite file
    fs.writeFileSync(file_path, binary);
}

export default insert_exif_data;
