/* Save files with a timestamp filename */
/* this script does not overwrite existing files - unique names are created */

function DoesFileExists(pathname)
{
    var result = false;
    try
    {
        var otherDoc = app.openDoc(pathname);
        if (otherDoc != null)
        {
            result = true;
            otherDoc.closeDoc();
        }
    }
    catch(e)
    {
        result = false; 
    }
    return result;
}

// create a unique filename for output file
function GetUniqueOutputFileName(pathName)
{
    var i = 1; 
    var baseName = pathName.slice(0, pathName.length - 4);
    var testName = pathName;
    while (DoesFileExists(testName) == true)
    {
        testName = baseName + " " + i + ".pdf";
        i++;
    }
    return testName;
}

var i = this.path.search(/[^:/]+\.pdf$/);
var fname = this.path.slice(i, this.path.length - 4);

// replace /c/data/ with a desired folder path where to store extracted files
var folder = "/c/data2/";

// now add time stamp data to the filename
var t = new Date();
fname += " - " + t.toLocaleString();
var outputname = fname.replace(/[,\\/\?*<>]/g," ");
outputname = outputname.replace(/[:]/g,"-");

var outputpath = folder + outputname + ".pdf";
this.saveAs(GetUniqueOutputFileName(outputpath));
