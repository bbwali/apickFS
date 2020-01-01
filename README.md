<h1 align="center">
  ApickFS (βETA)
</h1>

<h3 align="center">
  ✍🏻 📄 🍭
</h3>
<h3 align="center">
  Modern File Storage library for Nodejs v12.14.0 and above. βETA release
</h3>
<p align="center">
  ApickFS is a free and open source File System library based on Node's fs.promises() that helps developers ditch callbacks and outdated depencencies.
</p>
<p align="center">
  <a href="https://github.com/apickjs/apickFS/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Gatsby is released under the MIT license." />
  </a>

  <a href="https://www.npmjs.com/package/apickfs">
    <img src="https://img.shields.io/npm/v/apickfs.svg" alt="Current npm package version." />
  </a>

  <a href="https://www.linkedin.com/in/vivmagarwal/">
    <img src="https://img.shields.io/badge/linkedin-in-blue?label=Follow%20@vivmagarwal" alt="Follow @vivmagarwal" />
  </a>
  
  <a href="https://twitter.com/intent/follow?screen_name=vivmagarwal">
    <img src="https://img.shields.io/twitter/follow/vivmagarwal.svg?label=Follow%20@vivmagarwal" alt="Follow @vivmagarwal" />
  </a>

</p>

## Why ApickFS:

- **Based on cutting edge fs.promises**
- **Async Awiat based code**
- **No outdated dependencies**
- **Utilising latest features of Nodejs 12.14.0 Long Term released**
- **Minimal base library**
- **Easy to extend**
- **Easy to read source code**
- **Automatic JSON parsing**
- **Auto Subdirectory creation**

<br>

## Available Methods:

- **writeStorage()**
- **readStorage()**
- **removeStorage()**
- **removeStorageRecursively()**
- **fileOrFolderExists()**
- **storageHander()**

<br>

## Parameter Combinations :

| Parameter Combinations                        | result                      | Description                                              |
| --------------------------------------------- | --------------------------- | -------------------------------------------------------- |
| `writeStorage(directoryPath)`                 | Success, Messge             | Creates directory                                        |
| `writeStorage(directoryPath , fieName)`       | Success, Messge             | Creates or Truncates file                                |
| `writeStorage(directoryPath , fieName, data)` | Success, Messge             | Creates file. Adds or Overwrites file content with data. |
| `readStorage(directoryPath, fileName)`        | Success, Messge, Data       | Reads file                                               |
| `removeStorage(directoryPath)`                | Success, Messge             | Removes directory                                        |
| `removeStorage(directoryPath , fieName)`      | Success, Messge             | removes file                                             |
| `removeStorage(directoryPath,null,true)`      | Success, Messge             | Removes directory recursively                            |
| `removeStorageRecursively(directoryPath)`     | Success, Messge             | Removes directory recursively                            |
| `fileOrFolderExists(<directory/file> path)`   | true/false                  | Checks if a directory or a file exists                   |
| `storageHander(<directory/file> path)`        | true/false , file/directory | Checks if a directory or a file exists and its type.     |

<br>

## Important Notes

- ApickFS requires Node 12.14.0 LTS
- Feel free to create a github issue if required.
- It will be great if every Pull request is accompanied by a github issue.

<br>

## 🤹🏻‍♂️ Examples / Tutorial

1. **Install the ApickFS file Storage.**

   ```shell
   npm i apickfs

   ```

2. **Make sure that you are using Nodejs `v12.14.0` or above.**

   Check your node version now:

   ```shell
   node -v
   nvm use
   ```

3. **Include required modules.**

   Next, create a file called `index.js` (for example) and requre these modules:

   ```shell
    const path = require('path');
    const apickFileStorage = require('apickfs');
   ```

## ✍🏻 Using `writeStorage()`

`writeStorage()` - the selection of this name has a purpose. Its made up of two words = `Write` and `Storage`.
**Write** stands for both _creating_ and _editing_ whereas **Store** stands for both _files_ and _directories_.

## Creating a directory called `foo` in our current directory :

### Inside an async function :

```shell
(async () => {
  try {
    status = await apickFileStorage.writeStorage(path.join(__dirname, 'foo'));
    console.log(status);
  } catch (err) {
    console.log(err);
  }
})();
```

### Outside an async function :

```shell
apickFileStorage
  .writeStorage(path.join(__dirname, 'fboo'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

Run any one of the above and if all is good you must get a response object similar to it :

```shell
{
  success: true,
  message: 'SUCCESS: /Users/vivek/practice-apps/temp/fspromises/foo created.'
}
```

You have a `sucess` value to check if the opration was success and you have a `message` that can be logged or shown to the user.

> You may use any one of async/await or then/catch approach. In rest of the examples, I'll be using then/catch approach.

<br>

## Creating a file called `bar.txt` in the `foo` directory :

```shell
apickFileStorage
  .writeStorage(path.join(__dirname, 'boo'), 'bar.txt')
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

An empty file gets created.

```
{
  success: true,
  message: 'SUCCESS: /Users/vivek/practice-apps/temp/fspromises/boo/bar.txt created.'
}
```

<br>

## Creating a file called `zoo.txt` in the `foo` directory with some data :

```shell
const textData1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

apickFileStorage
  .writeStorage(path.join(__dirname, 'foo'), 'zoo.txt', textData1)
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

<br>

## Updating `zoo.txt` in the `foo` directory with some other data :

```shell
const textData1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const textData2 =
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

apickFileStorage
  .writeStorage(path.join(__dirname, 'foo'), 'zoo.txt', textData2)
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

<br>

## Creating a file called `data.json` in the `foo` directory with some JSON data :

```shell
const objData = {
  firstName: 'John',
  lastName: 'Doe',
  age: 50,
  eyeColor: 'blue'
};

apickFileStorage
  .writeStorage(path.join(__dirname, 'foo'), 'data.json', objData)
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

`data.json` looks something like this :

```shell
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 50,
  "eyeColor": "blue"
}
```

🍭 Sweet!! valid `objects` and `arrays` gets automatically parsed to JSON.

<br>

## Reading `zoo.txt` in the `foo` directory:

```shell
apickFileStorage
  .readStorage(path.join(__dirname, 'foo'), 'zoo.txt')
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

If all goes well, we get back following response :

```shell
{
  success: true,
  message: 'SUCCESS: data successfully read from /Users/vivek/practice-apps/temp/fspromises/foo/zoo.txt.',
  data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}
```

<br>

## Reading `data.json` in the `foo` directory:

```shell
apickFileStorage
  .readStorage(path.join(__dirname, 'foo'), 'data.json')
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

If all goes well, we get back following response :

```shell
{
  success: true,
  message: 'SUCCESS: data successfully read from /Users/vivek/practice-apps/temp/fspromises/foo/data.json.',
  data: { firstName: 'John', lastName: 'Doe', age: 50, eyeColor: 'blue' }
}
```

🕺🏻Awesome!! Valid json data gets parsed to `objects` or `arrays`.

<br>

## Removing `data.json` in the `foo` directory:

```shell
apickFileStorage
  .removeStorage(path.join(__dirname, 'foo'), 'data.json')
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

<br>

## Removing the `boo` directory (if it is empty):

```shell
apickFileStorage
  .removeStorage(path.join(__dirname, 'boo'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

<br>

There are two way to remove `boo` if it's not empty (recursively)

## Removing the `boo` directory (if it is empty):

Way 1 : provide a `directory path`, keep filename `null` and pass `true` for allowing recursive deleting

```shell
apickFileStorage
  .removeStorage(path.join(__dirname, 'boo'), null, true)
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

Way 2 :

```
apickFileStorage
  .removeStorageRecursively(path.join(__dirname, 'boo'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

<br>

## check if a `file` or a `directory` exists:

```shell
apickFileStorage
  .fileOrFolderExists(path.join(__dirname, 'boo'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

It returns `true` or `false`

```shell
false
```

<br>

## check if a `file` or a `directory` exists:

```shell
apickFileStorage
  .fileOrFolderExists(path.join(__dirname, 'boo'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

It takes just one argument and returns `true` or `false`

```shell
false
```

Example with a file:

```shell
apickFileStorage
  .fileOrFolderExists(path.join(__dirname, 'data', 'text.txt'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

```
true
```

<br>

## check if a `file` or a `directory` exists and also get its type if it exists:

```shell
apickFileStorage
  .storageHander(path.join(__dirname, 'data', 'text.txt'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

```shell
{ exists: true, type: 'file' }
```

Example with a folder :

```shell
apickFileStorage
  .storageHander(path.join(__dirname, 'data'))
  .then(d => {
    console.log(d);
  })
  .catch(e => {
    console.log(e);
  });
```

```shell
{ exists: true, type: 'directory' }
```
