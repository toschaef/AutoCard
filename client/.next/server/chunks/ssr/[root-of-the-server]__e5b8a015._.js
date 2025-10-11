module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/game.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAnswers",
    ()=>buildAnswers,
    "classNames",
    ()=>classNames,
    "splitSides",
    ()=>splitSides
]);
function buildAnswers(card) {
    const allAnswers = [
        card.correct_answer,
        ...card.incorrect_answers
    ];
    const answers = allAnswers.map((text, index)=>({
            text,
            isCorrect: index === 0
        }));
    // Fisher-Yates shuffle
    for(let i = answers.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [
            answers[j],
            answers[i]
        ];
    }
    return answers;
}
function splitSides(items) {
    const len = items.length;
    if (len === 2) {
        return {
            left: [
                items[0]
            ],
            right: [
                items[1]
            ]
        };
    }
    if (len === 3) {
        return {
            left: [
                items[0],
                items[1]
            ],
            right: [
                items[2]
            ]
        };
    }
    if (len === 4) {
        return {
            left: [
                items[0],
                items[1]
            ],
            right: [
                items[2],
                items[3]
            ]
        };
    }
    // For other lengths, balance as evenly as possible with left favoring extra
    const leftCount = Math.ceil(len / 2);
    return {
        left: items.slice(0, leftCount),
        right: items.slice(leftCount)
    };
}
function classNames(...parts) {
    return parts.filter(Boolean).join(' ');
}
}),
"[project]/lib/normalize.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeIncomingSet",
    ()=>normalizeIncomingSet
]);
function normalizeIncomingSet(input) {
    // If already a CardSet, return as-is
    if (isCardSet(input)) {
        return input;
    }
    // Check if it's the incoming format
    if (isIncomingSet(input)) {
        return {
            id: generateId(),
            title: input.setName,
            topic: input.setDescription,
            cards: input.cards.map((card)=>({
                    id: generateId(),
                    question: card.question,
                    correct_answer: card.correctAnswer,
                    incorrect_answers: card.incorrectAnswers
                })),
            created: new Date()
        };
    }
    throw new Error('Invalid input format');
}
function isCardSet(input) {
    return typeof input === 'object' && input !== null && 'id' in input && 'title' in input && 'topic' in input && 'cards' in input && 'created' in input;
}
function isIncomingSet(input) {
    return typeof input === 'object' && input !== null && 'setName' in input && 'setDescription' in input && 'cards' in input && Array.isArray(input.cards);
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
}),
"[project]/lib/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "draftSets",
    ()=>draftSets,
    "recentSets",
    ()=>recentSets,
    "rows",
    ()=>rows,
    "yourSets",
    ()=>yourSets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$normalize$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/normalize.ts [app-ssr] (ecmascript)");
;
// Example using the provided C++ JSON through normalizeIncomingSet
const cppExample = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$normalize$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeIncomingSet"])({
    "setName": "C++ Basics",
    "setDescription": "Fundamental concepts of the C++ programming language.",
    "cards": [
        {
            "question": "What is the entry point function of a C++ program?",
            "correctAnswer": "main()",
            "incorrectAnswers": [
                "start()",
                "run()",
                "execute()"
            ]
        },
        {
            "question": "Which keyword is used to declare a variable in C++?",
            "correctAnswer": "int, char, float, etc.",
            "incorrectAnswers": [
                "var",
                "let",
                "const"
            ]
        },
        {
            "question": "What does #include do in C++?",
            "correctAnswer": "Includes header files",
            "incorrectAnswers": [
                "Declares variables",
                "Defines functions",
                "Creates objects"
            ]
        },
        {
            "question": "Which operator is used for pointer dereferencing?",
            "correctAnswer": "*",
            "incorrectAnswers": [
                "&",
                "->",
                "."
            ]
        },
        {
            "question": "What is the size of an int in C++?",
            "correctAnswer": "4 bytes (typically)",
            "incorrectAnswers": [
                "2 bytes",
                "8 bytes",
                "Depends on compiler"
            ]
        }
    ]
});
// Update the C++ example to have a stable ID
const cppBasicsSet = {
    ...cppExample,
    id: "cpp-basics"
};
const yourSets = [
    cppBasicsSet,
    {
        id: '1',
        title: 'JavaScript Fundamentals',
        topic: 'Core JavaScript concepts and syntax',
        cards: [
            {
                id: '1-1',
                question: 'What is the difference between let and var?',
                correct_answer: 'let has block scope, var has function scope',
                incorrect_answers: [
                    'No difference',
                    'let is faster',
                    'var is deprecated'
                ]
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
                incorrect_answers: [
                    'Creates components',
                    'Handles events',
                    'Manages state'
                ]
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
                incorrect_answers: [
                    'A comment',
                    'A function',
                    'A class'
                ]
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
                incorrect_answers: [
                    'A one-dimensional layout',
                    'A color scheme',
                    'A font family'
                ]
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
                incorrect_answers: [
                    'A database',
                    'A frontend library',
                    'A testing framework'
                ]
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
                incorrect_answers: [
                    'A foreign key',
                    'A column name',
                    'A data type'
                ]
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
                incorrect_answers: [
                    'Remote State Transfer',
                    'Representative State Transfer',
                    'Rapid State Transfer'
                ]
            }
        ],
        created: new Date('2024-02-15')
    }
];
const recentSets = [
    {
        id: '8',
        title: 'Python Data Structures',
        topic: 'Lists, dictionaries, and tuples in Python',
        cards: [
            {
                id: '8-1',
                question: 'What is a Python list?',
                correct_answer: 'An ordered, mutable collection',
                incorrect_answers: [
                    'An unordered collection',
                    'An immutable collection',
                    'A key-value pair'
                ]
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
                incorrect_answers: [
                    'Learning without data',
                    'Learning with unlabeled data',
                    'Learning with test data'
                ]
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
                incorrect_answers: [
                    'A database',
                    'A programming language',
                    'A web framework'
                ]
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
                incorrect_answers: [
                    'A branch',
                    'A merge',
                    'A pull request'
                ]
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
                incorrect_answers: [
                    'Elastic Container Cloud',
                    'Elastic Cache Cloud',
                    'Elastic Content Cloud'
                ]
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
                incorrect_answers: [
                    'A database',
                    'A programming language',
                    'A web framework'
                ]
            }
        ],
        created: new Date('2024-02-10')
    }
];
const draftSets = [
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
const rows = [
    {
        title: "Your Sets",
        items: yourSets
    },
    {
        title: "Recent",
        items: recentSets
    },
    {
        title: "Drafts",
        items: draftSets
    }
];
}),
"[project]/components/Play/ScoreBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScoreBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ScoreBar({ current, total, score }) {
    const progress = current / total * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-slate-600",
                        children: [
                            "Question ",
                            current,
                            " of ",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Play/ScoreBar.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-slate-900",
                        children: [
                            "Score: ",
                            score
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Play/ScoreBar.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Play/ScoreBar.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-slate-200 rounded-full h-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
                    style: {
                        width: `${progress}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/Play/ScoreBar.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Play/ScoreBar.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Play/ScoreBar.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Play/AnswerButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnswerButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function AnswerButton({ label, disabled = false, state = "idle", onClick, "data-testid": dataTestId }) {
    const baseClasses = "w-full p-6 text-left font-semibold text-lg text-black rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[80px] flex items-center";
    const stateClasses = {
        idle: "bg-white border-3 border-slate-300 hover:border-blue-400 hover:bg-blue-50 focus:ring-blue-500 shadow-md hover:shadow-lg",
        correct: "bg-green-500 text-white border-3 border-green-500 shadow-lg",
        wrong: "bg-red-500 text-white border-3 border-red-500 shadow-lg",
        "reveal-correct": "bg-white border-3 border-green-500 ring-4 ring-green-200 shadow-lg"
    };
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${baseClasses} ${stateClasses[state]} ${disabledClasses}`,
        disabled: disabled,
        onClick: onClick,
        "data-testid": dataTestId,
        children: label
    }, void 0, false, {
        fileName: "[project]/components/Play/AnswerButton.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Play/AnswerGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnswerGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/AnswerButton.tsx [app-ssr] (ecmascript)");
;
;
;
function AnswerGrid({ answers, locked, chosenIndex, onChoose }) {
    const { left, right } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitSides"])(answers);
    const getButtonState = (index, isCorrect)=>{
        if (!locked) {
            // Show selection state when not locked
            return index === chosenIndex ? "idle" : "idle";
        }
        // When locked, show feedback
        if (isCorrect) return "correct";
        if (index === chosenIndex && !isCorrect) return "wrong";
        if (chosenIndex !== index && isCorrect) return "reveal-correct";
        return "idle";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: left.map((answer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: answer.text,
                        disabled: locked,
                        state: getButtonState(index, answer.isCorrect),
                        onClick: ()=>onChoose(index),
                        "data-testid": `answer-${index}`
                    }, `left-${index}`, false, {
                        fileName: "[project]/components/Play/AnswerGrid.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/Play/AnswerGrid.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: right.map((answer, index)=>{
                    const globalIndex = left.length + index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: answer.text,
                        disabled: locked,
                        state: getButtonState(globalIndex, answer.isCorrect),
                        onClick: ()=>onChoose(globalIndex),
                        "data-testid": `answer-${globalIndex}`
                    }, `right-${index}`, false, {
                        fileName: "[project]/components/Play/AnswerGrid.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/Play/AnswerGrid.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Play/AnswerGrid.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/play/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlayPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$ScoreBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/ScoreBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/AnswerGrid.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function PlayPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const setId = params.id;
    // Find the card set by ID, fallback to cpp-basics
    const allSets = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["yourSets"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recentSets"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["draftSets"]
    ];
    const cardSet = allSets.find((set)=>set.id === setId) || allSets.find((set)=>set.id === 'cpp-basics') || allSets[0];
    const [qIndex, setQIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [locked, setLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chosenIndex, setChosenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const currentCard = cardSet.cards[qIndex];
    const answers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAnswers"])(currentCard), [
        currentCard
    ]);
    const handleChoose = (index)=>{
        if (locked) return;
        // If clicking the same answer, deselect it
        if (chosenIndex === index) {
            setChosenIndex(null);
            return;
        }
        // Otherwise, select the new answer
        setChosenIndex(index);
    };
    const handleNext = ()=>{
        if (chosenIndex === null) return; // Must have selected an answer
        // Lock the question and show results
        setLocked(true);
        // Add score if correct
        if (answers[chosenIndex].isCorrect) {
            setScore((prev)=>prev + 100);
        }
        // Auto-advance after a short delay to show the correct answer
        setTimeout(()=>{
            if (qIndex < cardSet.cards.length - 1) {
                setQIndex((prev)=>prev + 1);
                setLocked(false);
                setChosenIndex(null);
            } else {
                // Show results
                setQIndex(-1);
            }
        }, 2000); // 2 second delay to show correct answer
    };
    const handleKeyPress = (e)=>{
        if ((e.key === 'Enter' || e.key === ' ') && !locked && chosenIndex !== null && qIndex >= 0) {
            handleNext();
        }
    };
    // Results screen
    if (qIndex === -1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-50 flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-slate-900 mb-4",
                        children: "Quiz Complete!"
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl font-bold text-blue-600 mb-6",
                        children: score
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-slate-600 mb-8",
                        children: "Final Score"
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard",
                        className: "inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        children: "Back to Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/[id]/page.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/[id]/page.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 p-4",
        onKeyDown: handleKeyPress,
        tabIndex: 0,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$ScoreBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    current: qIndex + 1,
                    total: cardSet.cards.length,
                    score: score
                }, void 0, false, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-bold text-slate-900 mb-6",
                        children: currentCard.question
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    answers: answers,
                    locked: locked,
                    chosenIndex: chosenIndex,
                    onChoose: handleChoose
                }, void 0, false, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 text-center",
                    children: !locked && chosenIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleNext,
                        className: "bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        children: qIndex < cardSet.cards.length - 1 ? 'Next' : 'See Results'
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 117,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/[id]/page.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/[id]/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e5b8a015._.js.map