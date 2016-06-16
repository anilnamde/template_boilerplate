// ?? why passing function this.path not worked ??
require('shelljs/global');
var colors = require('colors');

const src = './app/src/';
const test = './app/test/';
const tmplt = './templates/';


// UTIL function actually doing hardwork
function createFile(tempatePath, toFilePath, message){
    console.log(colors.green(">>>>>>>  " + message));
    console.log(colors.green("       tempatePath =  " + tempatePath));
    console.log(colors.green("       toFile       =  " + toFilePath));

    cat(tempatePath).to(toFilePath);
}

function createDirectory(srcDir, testDir, message){
    console.log(colors.green(">>>>>>>  " + message));
    console.log(colors.green("       source directories      =  " + srcDir));
    console.log(colors.green("       test directories        =  " + testDir));

    mkdir('-p', [srcDir, testDir]);
}


// TASK functions
function taskCreateDirectory(obj) {
    const message = "create directories if needed";

    createDirectory(obj.srcDirPath, obj.testDirPath, message);

}
function taskCreateJS(obj){
    const message = "creating source file";
    const toFile = obj.hasComponents? `${obj.srcComponentDirPath}/${obj.fileName}.js` : `${obj.srcDirPath}/${obj.fileName}.js`;
    const tempalteFile = `${obj.temlplateFileName}.js`;

    createFile(tempalteFile, toFile, message);
}

function taskCreateTestJS(obj){
    const message = "creating test file";
    const toFile = obj.hasComponents? `${obj.testComponentDirPath}/${obj.fileName}_test.js` : `${obj.testDirPath}/${obj.fileName}_test.js`;
    const tempalteFile = `${obj.temlplateFileName}.test.js`;
    
    createFile(tempalteFile, toFile, message);
}

function taskCreateComponentDirectory(obj){
    const message = "create component directory";
    createDirectory(obj.srcComponentDirPath, obj.testComponentDirPath, message);
}

function taskCreateHTML(obj){
    const message = "creating html file";
    const toFile = `${obj.srcComponentDirPath}/${obj.fileName}.html`;
    const tempalteFile = `${obj.temlplateFileName}.html`;
    
    createFile(tempalteFile, toFile, message);
}

function taskCreateControllerJs(obj){
    const message = "creating component controller js file";
    const toFile = `${obj.testComponentDirPath}/${obj.fileName}_controller.js`;
    const tempalteFile = `${obj.temlplateFileName}.controller.js`;

    createFile(tempalteFile, toFile, message);
}

function taskCreateControllerJsTest(obj){
    const message = "creating component controller js test file";
    const toFile = `${obj.srcComponentDirPath}/${obj.fileName}_controller_test.js`;
    const tempalteFile = `${obj.temlplateFileName}.controller.test.js`;

    createFile(tempalteFile, toFile, message);
}

function taskCreateSCSS(obj){
    const message = "creating html file";
    const toFile = `${obj.srcComponentDirPath}/${obj.fileName}.css`;
    const tempalteFile = `${obj.temlplateFileName}.css`;
    
    createFile(tempalteFile, toFile, message);
}


//TASK configurations
var taskCollection = {
    utilities:[
        taskCreateDirectory,

        taskCreateJS,
        taskCreateTestJS
    ],
    services: [
        taskCreateDirectory,

        taskCreateJS,
        taskCreateTestJS
    ],
    models: [
        taskCreateDirectory,

        taskCreateJS,
        taskCreateTestJS
    ],
    filters: [
        taskCreateDirectory,

        taskCreateJS,
        taskCreateTestJS
    ],
    adapters: [
        taskCreateDirectory,

        taskCreateJS,
        taskCreateTestJS
    ],
    components: [
        taskCreateDirectory,
        taskCreateComponentDirectory,
        
        taskCreateJS,
        taskCreateTestJS,
        
        taskCreateHTML,
        
        taskCreateControllerJs,
        taskCreateControllerJsTest,
        
        taskCreateSCSS
    ],
    pages: [
        taskCreateDirectory,
        taskCreateComponentDirectory,
        
        taskCreateJS,
        taskCreateTestJS,
        
        taskCreateHTML,
        
        taskCreateControllerJs,
        taskCreateControllerJsTest,
        
        taskCreateSCSS
    ]
};

var gtasks = {
    common: taskCollection,
    customer: taskCollection,
    agent: taskCollection
};


// TASK generator to read the conf and running tasks as per parsing inputs
class Generator{
    constructor(args){
        this.conf = {};
        this.conf.fileName = args.pop();
        this.conf.tasksPath = Array.from(args);

        this.conf.temlplateFileName = `${tmplt}${args[args.length-1]}.template`;
        this.conf.srcDirPath = `${src}${args.join('/')}`;
        this.conf.testDirPath = `${test}${args.join('/')}`;

        this.conf.hasComponents = this.hasComponents();
        this.conf.srcComponentDirPath = `${src}${args.join('/')}/${this.conf.fileName}`;
        this.conf.testComponentDirPath = `${test}${args.join('/')}/${this.conf.fileName}`;

        this.conf.taskList = this.extractTasks();

        this.runTasks();

        
    }
    hasComponents(){
        console.log('hasComponents', this.conf.tasksPath);
        return this.conf.tasksPath.indexOf('components') !== -1 || this.conf.tasksPath.indexOf('pages') !== -1;
    }



    extractTasks(){
        console.log('extractTasks', this.conf.tasksPath);

        let task = gtasks; // because mama saying no do not override gtasks
        this.conf.tasksPath.forEach((value)=>{
            task = task[value];
        });
        return task;
    }

    runTasks(){
        console.log("if", this.conf.taskList);
            
        this.conf.taskList.forEach((executionTask)=>{
            try{
                executionTask(this.conf);
            }catch(error){
                console.log(colors.red(error));
            }
        });
    }
}

const gen = new Generator(process.argv.slice(2));
