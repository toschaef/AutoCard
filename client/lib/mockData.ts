import { CardSet } from './types';
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
    }
  ]
});

// Your Sets - 8 items
export const yourSets: CardSet[] = [
  cppExample,
  {
    id: '1',
    title: 'JavaScript Fundamentals',
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
    topic: 'Component-based architecture in Vue',
    cards: [],
    created: new Date('2024-02-22')
  },
  {
    id: '15',
    title: 'MongoDB NoSQL',
    topic: 'Document-based database concepts',
    cards: [],
    created: new Date('2024-02-21')
  },
  {
    id: '16',
    title: 'Redis Caching',
    topic: 'In-memory data structure store',
    cards: [],
    created: new Date('2024-02-20')
  },
  {
    id: '17',
    title: 'Kubernetes Orchestration',
    topic: 'Container orchestration platform',
    cards: [],
    created: new Date('2024-02-19')
  },
  {
    id: '18',
    title: 'Microservices Architecture',
    topic: 'Distributed system design patterns',
    cards: [],
    created: new Date('2024-02-18')
  },
  {
    id: '19',
    title: 'Security Best Practices',
    topic: 'Web application security fundamentals',
    cards: [],
    created: new Date('2024-02-17')
  },
  {
    id: '20',
    title: 'Performance Optimization',
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
