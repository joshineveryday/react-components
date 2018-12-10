var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var parse = require('react-docgen').parse;
var chokidar = require('chokidar');

var paths = {
    examples: path.join(__dirname, '../src', 'docs', 'examples'),
    components: path.join(__dirname, '../src', 'components'),
    output: path.join(__dirname, '../config', 'componentData.js')
};

const enableWatchMode = process.argv.slice(2) == '--watch';
if (enableWatchMode) {
    // Regenerate component metadata when components or examples change.
    chokidar.watch([paths.examples, paths.components]).on('change', function(event, path) {
        generate(paths);
    });
} else {
    // Generate component and groups metadata
    console.log("GENERATING DATA!!");
    generateAll(paths);
}

function generateAll(paths) {
   var wikiData = generate(paths, "", []);
   console.log("The wiki data");
   console.log(JSON.stringify(wikiData));
}

function generate(rootPaths, current_path, wikiData) {
    var errors = [];
    var pathToSearch = path.join(rootPaths.components, current_path);
    getDirectories(pathToSearch).map(function(dirName) {
        try {
            if(isComponentDir(pathToSearch, dirName)) {
                 // wikiData.push({"componentName": dirName});
                 //console.log("ITS A COMPONENT DIRECTORY!" + pathToSearch+"/"+dirName);
                 getComponentData(pathToSearch, dirName, wikiData);
            } else {
                var wikiDataPart = {"groupName": dirName, "groups": [], "components": []};
                wikiDataPart.groups = generate(rootPaths, path.join(current_path, dirName), wikiDataPart.groups);
                wikiData.push(wikiDataPart);
                //console.log("ITS A REGULAR DIRECTORY: " + path.join(current_path, dirName));
            }
        } catch(error) {
            errors.push('An error occurred while attempting to generate metadata for ' + dirName + '. ' + error);
        }
    });
    return wikiData;
    //writeFile(paths.output, "module.exports = /* eslint-disable */ " + JSON.stringify(errors.length ? errors : componentData));
}

function isComponentDir(filepath, componentName) {
    var componentPath = path.join(filepath, componentName, componentName + '.js');
    return fs.existsSync(componentPath);
}

/**
 * MetaData Generation Algorithm
 * 1. Get Directories from root folder as D
 * 2. For each item in directory D:
 *      a. if it is a component -
 *          i. Add component to its current group
 *      b. If it is a directory.
 *          i. It is a component grouping, Create JSON object for component group
 */



function getComponentData(paths, componentName) {
    console.log("Getting component data... " + componentName);

    // var content = readFile(path.join(paths.components, componentName, componentName + '.js'));
    // var info = parse(content);



    // return {
    //     name: componentName,
    //     description: info.description,
    //     props: info.props,
    //     code: content,
    //     examples: getExampleData(paths.examples, componentName)
    // }
}

function getExampleData(examplesPath, componentName) {
    var examples = getExampleFiles(examplesPath, componentName);
    return examples.map(function(file) {
        var filePath = path.join(examplesPath, componentName, file);
        var content = readFile(filePath);
        var info = parse(content);
        return {
            // By convention, component name should match the filename.
            // So remove the .js extension to get the component name.
            name: file.slice(0, -3),
            description: info.description,
            code: content
        };
    });
}

function getExampleFiles(examplesPath, componentName) {
    var exampleFiles = [];
    try {
        exampleFiles = getFiles(path.join(examplesPath, componentName));
    } catch(error) {
        console.log(chalk.red(`No examples found for ${componentName}.`));
    }
    return exampleFiles;
}

function getDirectories(filepath) {
    return fs.readdirSync(filepath).filter(function(file) {
        return fs.statSync(path.join(filepath, file)).isDirectory();
    });
}

function getFiles(filepath) {
    return fs.readdirSync(filepath).filter(function(file) {
        return fs.statSync(path.join(filepath, file)).isFile();
    });
}

function writeFile(filepath, content) {
    fs.writeFile(filepath, content, function (err) {
        err ? console.log(chalk.red(err)) : console.log(chalk.green("Component data saved."));
    });
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}