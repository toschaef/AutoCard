import { CardSet, User } from '@/types';
import { normalizeIncomingSet } from './normalize';

// Example C++ Set using normalizeIncomingSet
const cppExample = normalizeIncomingSet({
  "setName": "C++ Programming Fundamentals",
  "setDescription": "Essential C++ concepts for beginners",
  "cards": [
    {
      "question": "What is the entry point function of a C++ program?",
      "correctAnswer": "main()",
      "incorrectAnswers": ["start()", "run()", "execute()"]
    },
    {
      "question": "Which keyword is used to include header files?",
      "correctAnswer": "#include",
      "incorrectAnswers": ["import", "using", "require"]
    },
    {
      "question": "What does cout stand for in C++?",
      "correctAnswer": "console output",
      "incorrectAnswers": ["character output", "code output", "compiler output"]
    },
    {
      "question": "Which operator is used for pointer dereferencing?",
      "correctAnswer": "*",
      "incorrectAnswers": ["&", "->", "."]
    },
    {
      "question": "What namespace is cout part of?",
      "correctAnswer": "std",
      "incorrectAnswers": ["io", "iostream", "console"]
    },
    {
      "question": "Which keyword creates a constant in C++?",
      "correctAnswer": "const",
      "incorrectAnswers": ["final", "readonly", "constant"]
    },
    {
      "question": "What symbol ends a statement in C++?",
      "correctAnswer": ";",
      "incorrectAnswers": [":", ".", ","]
    },
    {
      "question": "Which header file is needed for input/output?",
      "correctAnswer": "iostream",
      "incorrectAnswers": ["stdio.h", "io.h", "input.h"]
    }
  ]
});

const cppBasicsSet = {
  ...cppExample,
  id: "cpp-basics",
  userId: "1"
};

// JavaScript Fundamentals - Complete Set
const jsSet: CardSet = {
  id: 'js-fundamentals',
  userId: '1',
  title: 'JavaScript Fundamentals',
  description: 'Core JavaScript concepts and modern ES6+ features',
  cards: [
    {
      id: 'js-1',
      question: 'What is the difference between let and var?',
      correct_answer: 'let has block scope, var has function scope',
      incorrect_answers: ['No difference', 'let is faster', 'var is deprecated']
    },
    {
      id: 'js-2',
      question: 'What does === do in JavaScript?',
      correct_answer: 'Strict equality comparison (type and value)',
      incorrect_answers: ['Assigns a value', 'Checks only value', 'Compares references']
    },
    {
      id: 'js-3',
      question: 'What is an arrow function?',
      correct_answer: 'A shorter syntax for function expressions',
      incorrect_answers: ['A pointer function', 'A loop structure', 'A variable declaration']
    },
    {
      id: 'js-4',
      question: 'What does "this" refer to in JavaScript?',
      correct_answer: 'The object that is executing the current function',
      incorrect_answers: ['The global object always', 'The previous function', 'The next line of code']
    },
    {
      id: 'js-5',
      question: 'What is array destructuring?',
      correct_answer: 'Extracting values from arrays into variables',
      incorrect_answers: ['Deleting array elements', 'Sorting arrays', 'Creating arrays']
    },
    {
      id: 'js-6',
      question: 'What is a Promise in JavaScript?',
      correct_answer: 'An object representing eventual completion of an async operation',
      incorrect_answers: ['A loop structure', 'A variable type', 'A function declaration']
    },
    {
      id: 'js-7',
      question: 'What does the spread operator (...) do?',
      correct_answer: 'Expands an array or object',
      incorrect_answers: ['Multiplies numbers', 'Creates a range', 'Concatenates strings']
    },
    {
      id: 'js-8',
      question: 'What is NaN in JavaScript?',
      correct_answer: 'Not a Number - result of invalid numeric operation',
      incorrect_answers: ['Null value', 'Undefined', 'Empty string']
    }
  ],
  created: new Date('2024-01-15')
};

// React Hooks - Complete Set
const reactSet: CardSet = {
  id: 'react-hooks',
  userId: '1',
  title: 'React Hooks Essentials',
  description: 'Master modern React development with hooks',
  cards: [
    {
      id: 'react-1',
      question: 'What does useState return?',
      correct_answer: 'An array with state value and setter function',
      incorrect_answers: ['Just the state value', 'An object with value and setter', 'A function']
    },
    {
      id: 'react-2',
      question: 'When does useEffect run?',
      correct_answer: 'After render, based on dependency array',
      incorrect_answers: ['Before render', 'Only on mount', 'Never automatically']
    },
    {
      id: 'react-3',
      question: 'What is useContext used for?',
      correct_answer: 'Accessing context values without prop drilling',
      incorrect_answers: ['Creating contexts', 'Managing state', 'Handling events']
    },
    {
      id: 'react-4',
      question: 'What does useMemo do?',
      correct_answer: 'Memoizes expensive calculations',
      incorrect_answers: ['Stores data permanently', 'Creates components', 'Handles side effects']
    },
    {
      id: 'react-5',
      question: 'What is useCallback used for?',
      correct_answer: 'Memoizing callback functions',
      incorrect_answers: ['Creating callbacks', 'Calling functions', 'Handling events']
    },
    {
      id: 'react-6',
      question: 'What does useRef return?',
      correct_answer: 'A mutable ref object with .current property',
      incorrect_answers: ['A state variable', 'A DOM element', 'A function']
    },
    {
      id: 'react-7',
      question: 'When should you use useReducer?',
      correct_answer: 'When state logic is complex with multiple sub-values',
      incorrect_answers: ['Always instead of useState', 'For simple state', 'Never']
    },
    {
      id: 'react-8',
      question: 'What is the dependency array in useEffect?',
      correct_answer: 'Controls when the effect re-runs',
      incorrect_answers: ['Lists all variables', 'Creates dependencies', 'Imports modules']
    },
    {
      id: 'react-9',
      question: 'Can you use hooks inside conditions?',
      correct_answer: 'No, hooks must be at the top level',
      incorrect_answers: ['Yes, anytime', 'Only in useEffect', 'Only with useState']
    }
  ],
  created: new Date('2024-01-20')
};

// Python Basics - Complete Set
const pythonSet: CardSet = {
  id: 'python-basics',
  userId: '1',
  title: 'Python Programming Basics',
  description: 'Fundamental Python concepts for beginners',
  cards: [
    {
      id: 'py-1',
      question: 'What is a Python list?',
      correct_answer: 'An ordered, mutable collection',
      incorrect_answers: ['An unordered collection', 'An immutable collection', 'A key-value pair']
    },
    {
      id: 'py-2',
      question: 'What does the range() function do?',
      correct_answer: 'Generates a sequence of numbers',
      incorrect_answers: ['Creates arrays', 'Sorts lists', 'Finds maximum value']
    },
    {
      id: 'py-3',
      question: 'What is a Python dictionary?',
      correct_answer: 'A collection of key-value pairs',
      incorrect_answers: ['A list of words', 'An ordered array', 'A string type']
    },
    {
      id: 'py-4',
      question: 'What does len() return?',
      correct_answer: 'The number of items in an object',
      incorrect_answers: ['The maximum value', 'The sum of items', 'The type of object']
    },
    {
      id: 'py-5',
      question: 'What is list slicing in Python?',
      correct_answer: 'Extracting a portion of a list using [start:end]',
      incorrect_answers: ['Deleting list items', 'Sorting lists', 'Combining lists']
    },
    {
      id: 'py-6',
      question: 'What keyword defines a function in Python?',
      correct_answer: 'def',
      incorrect_answers: ['function', 'func', 'define']
    },
    {
      id: 'py-7',
      question: 'What is indentation used for in Python?',
      correct_answer: 'Defining code blocks and scope',
      incorrect_answers: ['Making code readable', 'Comments', 'Variable declaration']
    },
    {
      id: 'py-8',
      question: 'What does the append() method do?',
      correct_answer: 'Adds an item to the end of a list',
      incorrect_answers: ['Removes an item', 'Sorts the list', 'Clears the list']
    },
    {
      id: 'py-9',
      question: 'What is a tuple in Python?',
      correct_answer: 'An immutable ordered collection',
      incorrect_answers: ['A mutable list', 'A key-value pair', 'A number type']
    },
    {
      id: 'py-10',
      question: 'What does the print() function do?',
      correct_answer: 'Outputs text to the console',
      incorrect_answers: ['Creates variables', 'Defines functions', 'Imports modules']
    }
  ],
  created: new Date('2024-02-01')
};

// Web Development - Complete Set
const webDevSet: CardSet = {
  id: 'web-dev-basics',
  userId: '1',
  title: 'Web Development Fundamentals',
  description: 'HTML, CSS, and web development essentials',
  cards: [
    {
      id: 'web-1',
      question: 'What does HTML stand for?',
      correct_answer: 'HyperText Markup Language',
      incorrect_answers: ['High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language']
    },
    {
      id: 'web-2',
      question: 'What is CSS used for?',
      correct_answer: 'Styling and layout of web pages',
      incorrect_answers: ['Creating databases', 'Server-side logic', 'Data processing']
    },
    {
      id: 'web-3',
      question: 'What is a semantic HTML element?',
      correct_answer: 'An element that describes its meaning',
      incorrect_answers: ['A styled element', 'A JavaScript element', 'A deprecated element']
    },
    {
      id: 'web-4',
      question: 'What does the <div> tag represent?',
      correct_answer: 'A generic container for content',
      incorrect_answers: ['A division operator', 'A data table', 'A form input']
    },
    {
      id: 'web-5',
      question: 'What is the box model in CSS?',
      correct_answer: 'Content, padding, border, margin',
      incorrect_answers: ['Width and height only', 'Just borders', 'Color properties']
    },
    {
      id: 'web-6',
      question: 'What does display: flex do?',
      correct_answer: 'Creates a flexible layout container',
      incorrect_answers: ['Makes items disappear', 'Sets font size', 'Changes colors']
    },
    {
      id: 'web-7',
      question: 'What is the purpose of meta tags?',
      correct_answer: 'Provide metadata about the HTML document',
      incorrect_answers: ['Style the page', 'Create links', 'Add images']
    },
    {
      id: 'web-8',
      question: 'What does responsive design mean?',
      correct_answer: 'Design adapts to different screen sizes',
      incorrect_answers: ['Fast loading pages', 'Interactive elements', 'Colorful layouts']
    },
    {
      id: 'web-9',
      question: 'What is the z-index property?',
      correct_answer: 'Controls stacking order of elements',
      incorrect_answers: ['Sets zoom level', 'Defines height', 'Creates animations']
    },
    {
      id: 'web-10',
      question: 'What does the <a> tag do?',
      correct_answer: 'Creates a hyperlink',
      incorrect_answers: ['Adds animations', 'Aligns text', 'Creates audio']
    }
  ],
  created: new Date('2024-02-05')
};

// Database Concepts - Complete Set
const databaseSet: CardSet = {
  id: 'database-fundamentals',
  userId: '1',
  title: 'Database Fundamentals',
  description: 'Essential database and SQL concepts',
  cards: [
    {
      id: 'db-1',
      question: 'What is a primary key?',
      correct_answer: 'A unique identifier for table rows',
      incorrect_answers: ['A foreign key', 'A column name', 'A data type']
    },
    {
      id: 'db-2',
      question: 'What does SQL stand for?',
      correct_answer: 'Structured Query Language',
      incorrect_answers: ['Simple Query Language', 'Standard Query Language', 'Sequential Query Language']
    },
    {
      id: 'db-3',
      question: 'What is a foreign key?',
      correct_answer: 'A field that links to a primary key in another table',
      incorrect_answers: ['A unique identifier', 'An index', 'A column type']
    },
    {
      id: 'db-4',
      question: 'What does SELECT do in SQL?',
      correct_answer: 'Retrieves data from a database',
      incorrect_answers: ['Deletes data', 'Creates tables', 'Updates records']
    },
    {
      id: 'db-5',
      question: 'What is normalization in databases?',
      correct_answer: 'Organizing data to reduce redundancy',
      incorrect_answers: ['Making data bigger', 'Encrypting data', 'Backing up data']
    },
    {
      id: 'db-6',
      question: 'What does JOIN do in SQL?',
      correct_answer: 'Combines rows from multiple tables',
      incorrect_answers: ['Adds new columns', 'Deletes rows', 'Creates indexes']
    },
    {
      id: 'db-7',
      question: 'What is an index in a database?',
      correct_answer: 'A data structure that speeds up queries',
      incorrect_answers: ['A table name', 'A primary key', 'A foreign key']
    },
    {
      id: 'db-8',
      question: 'What does CRUD stand for?',
      correct_answer: 'Create, Read, Update, Delete',
      incorrect_answers: ['Connect, Run, Use, Deploy', 'Copy, Replace, Upload, Download', 'Code, Review, Update, Debug']
    },
    {
      id: 'db-9',
      question: 'What is a transaction in databases?',
      correct_answer: 'A sequence of operations performed as a single unit',
      incorrect_answers: ['A data type', 'A table relationship', 'A query result']
    },
    {
      id: 'db-10',
      question: 'What does WHERE clause do?',
      correct_answer: 'Filters records based on conditions',
      incorrect_answers: ['Orders results', 'Groups data', 'Joins tables']
    }
  ],
  created: new Date('2024-02-10')
};

// Git Version Control - Complete Set
const gitSet: CardSet = {
  id: 'git-basics',
  userId: '1',
  title: 'Git Version Control',
  description: 'Essential Git commands and workflows',
  cards: [
    {
      id: 'git-1',
      question: 'What is a Git commit?',
      correct_answer: 'A snapshot of changes with a message',
      incorrect_answers: ['A branch', 'A merge', 'A pull request']
    },
    {
      id: 'git-2',
      question: 'What does git clone do?',
      correct_answer: 'Creates a copy of a remote repository',
      incorrect_answers: ['Deletes a repository', 'Merges branches', 'Creates a branch']
    },
    {
      id: 'git-3',
      question: 'What is a branch in Git?',
      correct_answer: 'An independent line of development',
      incorrect_answers: ['A commit message', 'A file version', 'A merge conflict']
    },
    {
      id: 'git-4',
      question: 'What does git pull do?',
      correct_answer: 'Fetches and merges remote changes',
      incorrect_answers: ['Pushes local changes', 'Creates a branch', 'Deletes files']
    },
    {
      id: 'git-5',
      question: 'What is a merge conflict?',
      correct_answer: 'When Git cannot automatically merge changes',
      incorrect_answers: ['A deleted file', 'A syntax error', 'A network issue']
    },
    {
      id: 'git-6',
      question: 'What does git push do?',
      correct_answer: 'Uploads local commits to remote repository',
      incorrect_answers: ['Downloads changes', 'Creates branches', 'Merges code']
    },
    {
      id: 'git-7',
      question: 'What is the staging area in Git?',
      correct_answer: 'Where changes are prepared before committing',
      incorrect_answers: ['The remote repository', 'The working directory', 'The commit history']
    },
    {
      id: 'git-8',
      question: 'What does git status show?',
      correct_answer: 'Current state of working directory and staging area',
      incorrect_answers: ['Commit history', 'Remote branches', 'File contents']
    },
    {
      id: 'git-9',
      question: 'What is a pull request?',
      correct_answer: 'A request to merge code changes',
      incorrect_answers: ['A download request', 'A branch deletion', 'A file upload']
    },
    {
      id: 'git-10',
      question: 'What does git log display?',
      correct_answer: 'Commit history',
      incorrect_answers: ['File changes', 'Branch names', 'Remote repositories']
    }
  ],
  created: new Date('2024-02-12')
};

// TypeScript - Complete Set
const typescriptSet: CardSet = {
  id: 'typescript-basics',
  userId: '1',
  title: 'TypeScript Fundamentals',
  description: 'Type-safe JavaScript development',
  cards: [
    {
      id: 'ts-1',
      question: 'What is TypeScript?',
      correct_answer: 'A typed superset of JavaScript',
      incorrect_answers: ['A JavaScript framework', 'A database language', 'A CSS preprocessor']
    },
    {
      id: 'ts-2',
      question: 'What is a type annotation?',
      correct_answer: 'Explicit type declaration for variables',
      incorrect_answers: ['A comment', 'A function', 'A class']
    },
    {
      id: 'ts-3',
      question: 'What is an interface in TypeScript?',
      correct_answer: 'A contract defining object shape',
      incorrect_answers: ['A class', 'A function', 'A variable']
    },
    {
      id: 'ts-4',
      question: 'What does the "any" type mean?',
      correct_answer: 'Disables type checking for that variable',
      incorrect_answers: ['Accepts only numbers', 'Requires a string', 'Creates an array']
    },
    {
      id: 'ts-5',
      question: 'What is type inference?',
      correct_answer: 'TypeScript automatically determines types',
      incorrect_answers: ['Manual type declaration', 'Removing types', 'Converting types']
    },
    {
      id: 'ts-6',
      question: 'What is a union type?',
      correct_answer: 'A type that can be one of several types',
      incorrect_answers: ['A combined object', 'An array type', 'A class type']
    },
    {
      id: 'ts-7',
      question: 'What does "readonly" modifier do?',
      correct_answer: 'Makes a property immutable after initialization',
      incorrect_answers: ['Hides the property', 'Deletes the property', 'Makes it private']
    },
    {
      id: 'ts-8',
      question: 'What is a generic in TypeScript?',
      correct_answer: 'A way to create reusable components with type parameters',
      incorrect_answers: ['A default value', 'A class type', 'An error handler']
    },
    {
      id: 'ts-9',
      question: 'What does the enum keyword do?',
      correct_answer: 'Defines a set of named constants',
      incorrect_answers: ['Creates arrays', 'Enumerates objects', 'Counts items']
    },
    {
      id: 'ts-10',
      question: 'What is the difference between interface and type?',
      correct_answer: 'Interface can be extended, type cannot be reopened',
      incorrect_answers: ['No difference', 'Type is faster', 'Interface is deprecated']
    }
  ],
  created: new Date('2024-02-15')
};

// API Development - Complete Set
const apiSet: CardSet = {
  id: 'api-development',
  userId: '1',
  title: 'REST API Development',
  description: 'RESTful API design and best practices',
  cards: [
    {
      id: 'api-1',
      question: 'What does REST stand for?',
      correct_answer: 'Representational State Transfer',
      incorrect_answers: ['Remote State Transfer', 'Rapid Execution State Transfer', 'Real-time State Transfer']
    },
    {
      id: 'api-2',
      question: 'What HTTP method is used to retrieve data?',
      correct_answer: 'GET',
      incorrect_answers: ['POST', 'PUT', 'DELETE']
    },
    {
      id: 'api-3',
      question: 'What HTTP method creates a new resource?',
      correct_answer: 'POST',
      incorrect_answers: ['GET', 'PUT', 'PATCH']
    },
    {
      id: 'api-4',
      question: 'What is a RESTful endpoint?',
      correct_answer: 'A URL that represents a resource',
      incorrect_answers: ['A database connection', 'A server', 'A file path']
    },
    {
      id: 'api-5',
      question: 'What is JSON?',
      correct_answer: 'JavaScript Object Notation - data format',
      incorrect_answers: ['Java Server Object Notation', 'A programming language', 'A database']
    },
    {
      id: 'api-6',
      question: 'What does status code 404 mean?',
      correct_answer: 'Resource not found',
      incorrect_answers: ['Server error', 'Success', 'Unauthorized']
    },
    {
      id: 'api-7',
      question: 'What does status code 200 mean?',
      correct_answer: 'Success',
      incorrect_answers: ['Error', 'Not found', 'Redirect']
    },
    {
      id: 'api-8',
      question: 'What is an API key?',
      correct_answer: 'A credential for API authentication',
      incorrect_answers: ['A database password', 'A URL parameter', 'A function name']
    },
    {
      id: 'api-9',
      question: 'What does PUT method do?',
      correct_answer: 'Updates an existing resource',
      incorrect_answers: ['Creates a resource', 'Deletes a resource', 'Retrieves data']
    },
    {
      id: 'api-10',
      question: 'What is CORS?',
      correct_answer: 'Cross-Origin Resource Sharing',
      incorrect_answers: ['Code Organization Resource System', 'Central Object Resource Server', 'Client Origin Request System']
    }
  ],
  created: new Date('2024-02-18')
};

// Docker - Complete Set
const dockerSet: CardSet = {
  id: 'docker-basics',
  userId: '1',
  title: 'Docker Containerization',
  description: 'Docker fundamentals and container management',
  cards: [
    {
      id: 'docker-1',
      question: 'What is Docker?',
      correct_answer: 'A platform for developing, shipping, and running applications in containers',
      incorrect_answers: ['A database', 'A programming language', 'A web framework']
    },
    {
      id: 'docker-2',
      question: 'What is a Docker container?',
      correct_answer: 'A lightweight, standalone executable package',
      incorrect_answers: ['A virtual machine', 'A database', 'A programming language']
    },
    {
      id: 'docker-3',
      question: 'What is a Docker image?',
      correct_answer: 'A template for creating containers',
      incorrect_answers: ['A running container', 'A configuration file', 'A network setting']
    },
    {
      id: 'docker-4',
      question: 'What is a Dockerfile?',
      correct_answer: 'A text file with instructions to build an image',
      incorrect_answers: ['A container', 'A volume', 'A network']
    },
    {
      id: 'docker-5',
      question: 'What does "docker run" do?',
      correct_answer: 'Creates and starts a new container',
      incorrect_answers: ['Stops a container', 'Builds an image', 'Removes containers']
    },
    {
      id: 'docker-6',
      question: 'What is Docker Compose?',
      correct_answer: 'A tool for defining multi-container applications',
      incorrect_answers: ['A text editor', 'A database', 'An image registry']
    },
    {
      id: 'docker-7',
      question: 'What is a Docker volume?',
      correct_answer: 'Persistent data storage for containers',
      incorrect_answers: ['A container size', 'A network setting', 'An image layer']
    },
    {
      id: 'docker-8',
      question: 'What does "docker ps" show?',
      correct_answer: 'Running containers',
      incorrect_answers: ['All images', 'Docker version', 'Network settings']
    },
    {
      id: 'docker-9',
      question: 'What is Docker Hub?',
      correct_answer: 'A registry for Docker images',
      incorrect_answers: ['A monitoring tool', 'A container runtime', 'A build system']
    },
    {
      id: 'docker-10',
      question: 'What does container orchestration do?',
      correct_answer: 'Manages deployment and scaling of containers',
      incorrect_answers: ['Creates containers', 'Builds images', 'Writes code']
    }
  ],
  created: new Date('2024-02-20')
};

// Machine Learning - Complete Set
const mlSet: CardSet = {
  id: 'ml-basics',
  userId: '1',
  title: 'Machine Learning Basics',
  description: 'Introduction to ML concepts and terminology',
  cards: [
    {
      id: 'ml-1',
      question: 'What is supervised learning?',
      correct_answer: 'Learning with labeled training data',
      incorrect_answers: ['Learning without data', 'Learning with unlabeled data', 'Learning with test data']
    },
    {
      id: 'ml-2',
      question: 'What is unsupervised learning?',
      correct_answer: 'Learning patterns from unlabeled data',
      incorrect_answers: ['Learning with labels', 'Learning with supervision', 'Learning with answers']
    },
    {
      id: 'ml-3',
      question: 'What is a neural network?',
      correct_answer: 'A computing system inspired by biological neural networks',
      incorrect_answers: ['A database', 'A programming language', 'A web framework']
    },
    {
      id: 'ml-4',
      question: 'What is overfitting?',
      correct_answer: 'When a model performs well on training data but poorly on new data',
      incorrect_answers: ['When a model is too simple', 'When data is too large', 'When training is too fast']
    },
    {
      id: 'ml-5',
      question: 'What is a training set?',
      correct_answer: 'Data used to train the model',
      incorrect_answers: ['Data for testing', 'Data for validation', 'Data for deployment']
    },
    {
      id: 'ml-6',
      question: 'What is feature engineering?',
      correct_answer: 'Creating and selecting relevant input features',
      incorrect_answers: ['Building models', 'Testing data', 'Deploying systems']
    },
    {
      id: 'ml-7',
      question: 'What is a confusion matrix?',
      correct_answer: 'A table showing prediction performance',
      incorrect_answers: ['A neural network layer', 'A data structure', 'A training algorithm']
    },
    {
      id: 'ml-8',
      question: 'What is gradient descent?',
      correct_answer: 'An optimization algorithm to minimize loss',
      incorrect_answers: ['A data structure', 'A neural network', 'A data type']
    },
    {
      id: 'ml-9',
      question: 'What is a test set?',
      correct_answer: 'Data used to evaluate model performance',
      incorrect_answers: ['Data for training', 'Data for building', 'Data for preprocessing']
    },
    {
      id: 'ml-10',
      question: 'What is classification in ML?',
      correct_answer: 'Predicting categorical labels',
      incorrect_answers: ['Predicting numbers', 'Clustering data', 'Reducing dimensions']
    }
  ],
  created: new Date('2024-02-22')
};

// AWS Cloud - Complete Set
const awsSet: CardSet = {
  id: 'aws-basics',
  userId: '1',
  title: 'AWS Cloud Fundamentals',
  description: 'Amazon Web Services core concepts',
  cards: [
    {
      id: 'aws-1',
      question: 'What is Amazon EC2?',
      correct_answer: 'Elastic Compute Cloud - virtual servers',
      incorrect_answers: ['Elastic Container Cloud', 'Elastic Cache Cloud', 'Elastic Content Cloud']
    },
    {
      id: 'aws-2',
      question: 'What is Amazon S3?',
      correct_answer: 'Simple Storage Service - object storage',
      incorrect_answers: ['Server Service System', 'Security Storage Service', 'Scalable Server Solution']
    },
    {
      id: 'aws-3',
      question: 'What is AWS Lambda?',
      correct_answer: 'Serverless compute service',
      incorrect_answers: ['A database', 'A virtual machine', 'A storage service']
    },
    {
      id: 'aws-4',
      question: 'What is Amazon RDS?',
      correct_answer: 'Relational Database Service',
      incorrect_answers: ['Remote Data Storage', 'Real-time Data System', 'Resource Distribution Service']
    },
    {
      id: 'aws-5',
      question: 'What is an IAM role?',
      correct_answer: 'An identity with permissions for AWS resources',
      incorrect_answers: ['A user account', 'A server instance', 'A database table']
    },
    {
      id: 'aws-6',
      question: 'What is CloudWatch?',
      correct_answer: 'Monitoring and observability service',
      incorrect_answers: ['Storage service', 'Compute service', 'Database service']
    },
    {
      id: 'aws-7',
      question: 'What is an AWS Region?',
      correct_answer: 'A geographical area with multiple availability zones',
      incorrect_answers: ['A data center', 'A server', 'A network']
    },
    {
      id: 'aws-8',
      question: 'What is Amazon VPC?',
      correct_answer: 'Virtual Private Cloud - isolated network',
      incorrect_answers: ['Virtual Processing Center', 'Verified Public Cloud', 'Variable Performance Computing']
    },
    {
      id: 'aws-9',
      question: 'What is AWS CloudFormation?',
      correct_answer: 'Infrastructure as code service',
      incorrect_answers: ['A database', 'A monitoring tool', 'A deployment service']
    },
    {
      id: 'aws-10',
      question: 'What is Amazon DynamoDB?',
      correct_answer: 'NoSQL database service',
      incorrect_answers: ['SQL database', 'File storage', 'Cache service']
    }
  ],
  created: new Date('2024-02-25')
};

// CSS Advanced - Complete Set
const cssSet: CardSet = {
  id: 'css-advanced',
  userId: '1',
  title: 'Advanced CSS Techniques',
  description: 'Modern CSS layout and styling',
  cards: [
    {
      id: 'css-1',
      question: 'What is CSS Grid?',
      correct_answer: 'A two-dimensional layout system',
      incorrect_answers: ['A one-dimensional layout', 'A color scheme', 'A font family']
    },
    {
      id: 'css-2',
      question: 'What is Flexbox?',
      correct_answer: 'A one-dimensional layout method',
      incorrect_answers: ['A two-dimensional grid', 'A positioning system', 'A color model']
    },
    {
      id: 'css-3',
      question: 'What does position: absolute do?',
      correct_answer: 'Positions relative to nearest positioned ancestor',
      incorrect_answers: ['Positions relative to viewport', 'Creates fixed position', 'Removes from flow']
    },
    {
      id: 'css-4',
      question: 'What is a CSS variable?',
      correct_answer: 'A custom property defined with --name',
      incorrect_answers: ['A JavaScript variable', 'A class name', 'A selector']
    },
    {
      id: 'css-5',
      question: 'What does transform: translate() do?',
      correct_answer: 'Moves an element from its current position',
      incorrect_answers: ['Rotates an element', 'Scales an element', 'Skews an element']
    },
    {
      id: 'css-6',
      question: 'What is a media query?',
      correct_answer: 'Applies styles based on device characteristics',
      incorrect_answers: ['A database query', 'A JavaScript function', 'An HTML element']
    },
    {
      id: 'css-7',
      question: 'What does z-index control?',
      correct_answer: 'Stacking order of positioned elements',
      incorrect_answers: ['Element size', 'Text alignment', 'Color values']
    },
    {
      id: 'css-8',
      question: 'What is a pseudo-class?',
      correct_answer: 'A keyword that specifies element state (:hover, :active)',
      incorrect_answers: ['A fake class', 'A JavaScript class', 'A CSS framework']
    },
    {
      id: 'css-9',
      question: 'What does rem unit represent?',
      correct_answer: 'Relative to root element font size',
      incorrect_answers: ['Relative to parent', 'Fixed pixel size', 'Viewport percentage']
    },
    {
      id: 'css-10',
      question: 'What is CSS specificity?',
      correct_answer: 'Determines which style rules are applied',
      incorrect_answers: ['Code optimization', 'Performance metric', 'Browser compatibility']
    }
  ],
  created: new Date('2024-03-01')
};

// Example Sets Array
export const exampleSets: CardSet[] = [
  cppBasicsSet,
  jsSet,
  reactSet,
  pythonSet,
  webDevSet,
  databaseSet,
  gitSet,
  typescriptSet,
  apiSet,
  cssSet
];

// Keep yourSets for user-specific data
export const yourSets: CardSet[] = [];

// Demo users
export const demoUsers: User[] = [
  {
    id: '1',
    email: 'ali@example.com',
    name: 'Ali',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    email: 'john@example.com',
    name: 'John',
    createdAt: new Date('2024-01-03')
  }
];
