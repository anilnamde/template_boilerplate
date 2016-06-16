# template_boilerplate
Project to create the files in project dynamically


## Description
We spend a lot of time in creating files in project then checking its naming conventions in project. 

Think about following scenario in angular project I want to create component. I have src/js/components directory to host components and src/test/components to contain test. Now i should be adding following files and their templates every time I have to create new file,

+ some_file.html (tempate used)
+ some_file.js (controller logic)
+ some_file_controller.js (assuming ES6 is used controller)
+ _some_file.scss (its styling)
+ some_file_test.js (component test)
+ some_file_controller_test.js (controller test)

Now imaging following templates which will be eqully repeatative
+ some_file.html (need root element with some class to scope styling some-file--component)
+ some_file.js (component boilerplate)
+ some_file_controller.js (controller boilerplate)
+ _some_file.scss (should have default scss class)
+ some_file_test.js (component testing boilerplate code)
+ some_file_controller_test.js (controller testing boilerplate)

I believe it can be automaded with some efforts. Obviously same solution might not fit for all but sure if configuration can be provided to tool with some initial efforts it could make life easy.

