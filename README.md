# Template Boilerplate

Project to create files in project dynamically and make developer job easy.


## Description
We spend a lot of time in creating files in project then checking its naming conventions in project. 

Think about following scenario in angular project I want to create component. I have src/js/components directory to host components and src/test/components to contain test. Now i should be adding following files and their templates every time I have to create new file,

1. some_file.html (tempate used)
2. some_file.js (controller logic)
3. some_file_controller.js (assuming ES6 is used controller)
4. _some_file.scss (its styling)
5. some_file_test.js (component test)
6. some_file_controller_test.js (controller test)

Now imaging following templates which will be eqully repeatative,

1. some_file.html (need root element with some class to scope styling some-file--component)
2. some_file.js (component boilerplate)
3. some_file_controller.js (controller boilerplate)
4. _some_file.scss (should have default scss class)
5. some_file_test.js (component testing boilerplate code)
6 some_file_controller_test.js (controller testing boilerplate)

I believe it can be automaded with some efforts. Obviously same solution might not fit for all but sure if configuration can be provided to tool with some initial efforts it could make life easy.

