import { CardSet, User } from '@/types';
import { normalizeIncomingSet } from './normalize';

// Example using the provided C++ JSON through normalizeIncomingSet
const cppExample = normalizeIncomingSet({
  "setName": "C++ Basics",
  "setDescription": "Fundamental concepts of the C++ programming language.",
  "cards": [
    {
      "question": "What is the entry point function of a C++ program?",
      "correctAnswer": "main()",
      "incorrectAnswers": ["start()", "run()", "execute()"]
    },
    {
      "question": "Which keyword is used to declare a variable in C++?",
      "correctAnswer": "int, char, float, etc.",
      "incorrectAnswers": ["var", "let", "const"]
    },
    {
      "question": "What does #include do in C++?",
      "correctAnswer": "Includes header files",
      "incorrectAnswers": ["Declares variables", "Defines functions", "Creates objects"]
    },
    {
      "question": "Which operator is used for pointer dereferencing?",
      "correctAnswer": "*",
      "incorrectAnswers": ["&", "->", "."]
    },
    {
      "question": "What is the size of an int in C++?",
      "correctAnswer": "4 bytes (typically)",
      "incorrectAnswers": ["2 bytes", "8 bytes", "Depends on compiler"]
    }
  ]
});

// Update the C++ example to have a stable ID and userId
const cppBasicsSet = {
  ...cppExample,
  id: "cpp-basics",
  userId: "1"
};

// Your Sets - 8 items
export const yourSets: CardSet[] = [
  cppBasicsSet,
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    userId: '1',
    topic: 'Core JavaScript concepts and syntax',
    cards: [
      {
        id: '1-1',
        question: 'What is the difference between let and var?',
        correct_answer: 'let has block scope, var has function scope',
        incorrect_answers: ['No difference', 'let is faster', 'var is deprecated']
      }
    ],
    created: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'React Hooks',
    userId: '1',
    topic: 'Modern React development with hooks',
    cards: [
      {
        id: '2-1',
        question: 'What does useEffect do?',
        correct_answer: 'Performs side effects in functional components',
        incorrect_answers: ['Creates components', 'Handles events', 'Manages state']
      }
    ],
    created: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'TypeScript Basics',
    userId: '1',
    topic: 'Type-safe JavaScript development',
    cards: [
      {
        id: '3-1',
        question: 'What is a type annotation?',
        correct_answer: 'Explicit type declaration for variables',
        incorrect_answers: ['A comment', 'A function', 'A class']
      }
    ],
    created: new Date('2024-01-25')
  },
  {
    id: '4',
    title: 'CSS Grid Layout',
    userId: '1',
    topic: 'Modern CSS layout techniques',
    cards: [
      {
        id: '4-1',
        question: 'What is CSS Grid?',
        correct_answer: 'A two-dimensional layout system',
        incorrect_answers: ['A one-dimensional layout', 'A color scheme', 'A font family']
      }
    ],
    created: new Date('2024-02-01')
  },
  {
    id: '5',
    title: 'Node.js Backend',
    userId: '1',
    topic: 'Server-side JavaScript development',
    cards: [
      {
        id: '5-1',
        question: 'What is Express.js?',
        correct_answer: 'A web framework for Node.js',
        incorrect_answers: ['A database', 'A frontend library', 'A testing framework']
      }
    ],
    created: new Date('2024-02-05')
  },
  {
    id: '6',
    title: 'Database Design',
    userId: '1',
    topic: 'Relational database concepts',
    cards: [
      {
        id: '6-1',
        question: 'What is a primary key?',
        correct_answer: 'A unique identifier for table rows',
        incorrect_answers: ['A foreign key', 'A column name', 'A data type']
      }
    ],
    created: new Date('2024-02-10')
  },
  {
    id: '7',
    title: 'API Development',
    userId: '1',
    topic: 'RESTful API design and implementation',
    cards: [
      {
        id: '7-1',
        question: 'What does REST stand for?',
        correct_answer: 'Representational State Transfer',
        incorrect_answers: ['Remote State Transfer', 'Representative State Transfer', 'Rapid State Transfer']
      }
    ],
    created: new Date('2024-02-15')
  }
];

// Recent Sets - 6 items
export const recentSets: CardSet[] = [
  {
    id: '8',
    title: 'Python Data Structures',
    userId: '2',
    topic: 'Lists, dictionaries, and tuples in Python',
    cards: [
      {
        id: '8-1',
        question: 'What is a Python list?',
        correct_answer: 'An ordered, mutable collection',
        incorrect_answers: ['An unordered collection', 'An immutable collection', 'A key-value pair']
      }
    ],
    created: new Date('2024-02-20')
  },
  {
    id: '9',
    title: 'Machine Learning Basics',
    userId: '2',
    topic: 'Introduction to ML concepts',
    cards: [
      {
        id: '9-1',
        question: 'What is supervised learning?',
        correct_answer: 'Learning with labeled training data',
        incorrect_answers: ['Learning without data', 'Learning with unlabeled data', 'Learning with test data']
      }
    ],
    created: new Date('2024-02-18')
  },
  {
    id: '10',
    title: 'Docker Containers',
    userId: '2',
    topic: 'Containerization and deployment',
    cards: [
      {
        id: '10-1',
        question: 'What is Docker?',
        correct_answer: 'A containerization platform',
        incorrect_answers: ['A database', 'A programming language', 'A web framework']
      }
    ],
    created: new Date('2024-02-16')
  },
  {
    id: '11',
    title: 'Git Version Control',
    userId: '2',
    topic: 'Source code management',
    cards: [
      {
        id: '11-1',
        question: 'What is a Git commit?',
        correct_answer: 'A snapshot of changes',
        incorrect_answers: ['A branch', 'A merge', 'A pull request']
      }
    ],
    created: new Date('2024-02-14')
  },
  {
    id: '12',
    title: 'AWS Cloud Services',
    userId: '2',
    topic: 'Amazon Web Services fundamentals',
    cards: [
      {
        id: '12-1',
        question: 'What is EC2?',
        correct_answer: 'Elastic Compute Cloud',
        incorrect_answers: ['Elastic Container Cloud', 'Elastic Cache Cloud', 'Elastic Content Cloud']
      }
    ],
    created: new Date('2024-02-12')
  },
  {
    id: '13',
    title: 'GraphQL APIs',
    userId: '2',
    topic: 'Query language for APIs',
    cards: [
      {
        id: '13-1',
        question: 'What is GraphQL?',
        correct_answer: 'A query language for APIs',
        incorrect_answers: ['A database', 'A programming language', 'A web framework']
      }
    ],
    created: new Date('2024-02-10')
  }
];

// Drafts - 7 items
export const draftSets: CardSet[] = [
  {
    id: '14',
    title: 'Vue.js Components',
    userId: '3',
    topic: 'Component-based architecture in Vue',
    cards: [],
    created: new Date('2024-02-22')
  },
  {
    id: '15',
    title: 'MongoDB NoSQL',
    userId: '3',
    topic: 'Document-based database concepts',
    cards: [],
    created: new Date('2024-02-21')
  },
  {
    id: '16',
    title: 'Redis Caching',
    userId: '3',
    topic: 'In-memory data structure store',
    cards: [],
    created: new Date('2024-02-20')
  },
  {
    id: '17',
    title: 'Kubernetes Orchestration',
    userId: '3',
    topic: 'Container orchestration platform',
    cards: [],
    created: new Date('2024-02-19')
  },
  {
    id: '18',
    title: 'Microservices Architecture',
    userId: '3',
    topic: 'Distributed system design patterns',
    cards: [],
    created: new Date('2024-02-18')
  },
  {
    id: '19',
    title: 'Security Best Practices',
    userId: '3',
    topic: 'Web application security fundamentals',
    cards: [],
    created: new Date('2024-02-17')
  },
  {
    id: '20',
    title: 'Performance Optimization',
    userId: '3',
    topic: 'Web performance and optimization techniques',
    cards: [],
    created: new Date('2024-02-16')
  }
];

export const rows: { title: string; items: CardSet[] }[] = [
  { title: "Your Sets", items: yourSets },
  { title: "Recent", items: recentSets },
  { title: "Drafts", items: draftSets },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'ali@example.com',
    name: 'Ali',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    email: 'ethan@example.com',
    name: 'Ethan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-02-01')
  }
];

// Mock login credentials (in real app, this would be hashed passwords)
export const mockCredentials = {
  'ali@example.com': 'password123',
  'sarah@example.com': 'password123',
  'ethan@example.com': 'password123'
};
