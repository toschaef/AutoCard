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
    "TIMER_SECONDS",
    ()=>TIMER_SECONDS,
    "buildAnswers",
    ()=>buildAnswers,
    "classNames",
    ()=>classNames,
    "splitSides",
    ()=>splitSides
]);
const TIMER_SECONDS = 20;
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
    const baseClasses = "w-full p-4 text-left font-medium rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[60px] flex items-center";
    const stateClasses = {
        idle: "hover:bg-slate-50",
        correct: "bg-green-600 text-white border-green-600",
        wrong: "bg-red-600 text-white border-red-600",
        "reveal-correct": "bg-white border-green-600 ring-2 ring-green-600"
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/AnswerButton.tsx [app-ssr] (ecmascript)");
;
;
function AnswerGrid({ answers, locked, chosenIndex, onChoose }) {
    const getButtonState = (index, isCorrect)=>{
        if (!locked) return "idle";
        if (isCorrect) return "correct";
        if (index === chosenIndex && !isCorrect) return "wrong";
        if (chosenIndex !== index && isCorrect) return "reveal-correct";
        return "idle";
    };
    // Layout patterns
    if (answers.length === 4) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4 max-w-4xl mx-auto",
            children: answers.map((answer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: answer.text,
                    disabled: locked,
                    state: getButtonState(index, answer.isCorrect),
                    onClick: ()=>onChoose(index),
                    "data-testid": `answer-${index}`
                }, index, false, {
                    fileName: "[project]/components/Play/AnswerGrid.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/Play/AnswerGrid.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    if (answers.length === 3) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 place-items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: answers[0].text,
                            disabled: locked,
                            state: getButtonState(0, answers[0].isCorrect),
                            onClick: ()=>onChoose(0),
                            "data-testid": "answer-0"
                        }, void 0, false, {
                            fileName: "[project]/components/Play/AnswerGrid.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Play/AnswerGrid.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Play/AnswerGrid.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: answers[1].text,
                            disabled: locked,
                            state: getButtonState(1, answers[1].isCorrect),
                            onClick: ()=>onChoose(1),
                            "data-testid": "answer-1"
                        }, void 0, false, {
                            fileName: "[project]/components/Play/AnswerGrid.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: answers[2].text,
                            disabled: locked,
                            state: getButtonState(2, answers[2].isCorrect),
                            onClick: ()=>onChoose(2),
                            "data-testid": "answer-2"
                        }, void 0, false, {
                            fileName: "[project]/components/Play/AnswerGrid.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Play/AnswerGrid.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Play/AnswerGrid.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    if (answers.length === 2) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4 max-w-4xl mx-auto",
            children: answers.map((answer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: answer.text,
                    disabled: locked,
                    state: getButtonState(index, answer.isCorrect),
                    onClick: ()=>onChoose(index),
                    "data-testid": `answer-${index}`
                }, index, false, {
                    fileName: "[project]/components/Play/AnswerGrid.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/Play/AnswerGrid.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    // Fallback for other lengths
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-4 max-w-4xl mx-auto",
        children: answers.map((answer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: answer.text,
                disabled: locked,
                state: getButtonState(index, answer.isCorrect),
                onClick: ()=>onChoose(index),
                "data-testid": `answer-${index}`
            }, index, false, {
                fileName: "[project]/components/Play/AnswerGrid.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/Play/AnswerGrid.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Play/TimerBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TimerBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function TimerBadge({ seconds }) {
    const isLow = seconds <= 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isLow ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'}`,
        children: seconds
    }, void 0, false, {
        fileName: "[project]/components/Play/TimerBadge.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Play/SubmitCounter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubmitCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function SubmitCounter({ count }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold",
        children: count
    }, void 0, false, {
        fileName: "[project]/components/Play/SubmitCounter.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Play/QuestionBox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function QuestionBox({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white shadow-sm p-6 md:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl md:text-3xl font-semibold text-center text-slate-900",
            children: text
        }, void 0, false, {
            fileName: "[project]/components/Play/QuestionBox.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Play/QuestionBox.tsx",
        lineNumber: 7,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$TimerBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/TimerBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$SubmitCounter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/SubmitCounter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$QuestionBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Play/QuestionBox.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
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
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMER_SECONDS"]);
    const [submitCount, setSubmitCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const currentCard = cardSet.cards[qIndex];
    const answers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAnswers"])(currentCard), [
        currentCard
    ]);
    // Timer effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (locked || qIndex === -1) return;
        const timer = setInterval(()=>{
            setTimeLeft((prev)=>{
                if (prev <= 1) {
                    // Timer expired - auto-lock as incorrect
                    setLocked(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return ()=>clearInterval(timer);
    }, [
        locked,
        qIndex
    ]);
    // Reset timer and submit count on new question
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (qIndex >= 0) {
            setTimeLeft(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMER_SECONDS"]);
            setSubmitCount(0);
            setLocked(false);
            setChosenIndex(null);
        }
    }, [
        qIndex
    ]);
    const handleChoose = (index)=>{
        if (locked) return;
        // If clicking the same answer, deselect it
        if (chosenIndex === index) {
            setChosenIndex(null);
            setSubmitCount(0);
            return;
        }
        // Otherwise, select the new answer
        setChosenIndex(index);
        setSubmitCount(1);
    };
    const handleNext = ()=>{
        if (chosenIndex === null && !locked) return; // Must have selected an answer or timer expired
        // Lock the question and show results
        setLocked(true);
        // Add score if correct
        if (chosenIndex !== null && answers[chosenIndex].isCorrect) {
            setScore((prev)=>prev + 100);
        }
        // Auto-advance after a short delay to show the correct answer
        setTimeout(()=>{
            if (qIndex < cardSet.cards.length - 1) {
                setQIndex((prev)=>prev + 1);
            } else {
                // Show results
                setQIndex(-1);
            }
        }, 2000); // 2 second delay to show correct answer
    };
    const handlePlayAgain = ()=>{
        setQIndex(0);
        setScore(0);
        setLocked(false);
        setChosenIndex(null);
        setTimeLeft(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMER_SECONDS"]);
        setSubmitCount(0);
    };
    const handleKeyPress = (e)=>{
        if ((e.key === 'Enter' || e.key === ' ') && (locked || chosenIndex !== null) && qIndex >= 0) {
            handleNext();
        }
    };
    // Results screen
    if (qIndex === -1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-50 flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-slate-900 mb-4",
                        children: "Quiz Complete!"
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl font-bold text-slate-900 mb-6",
                        children: score
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-slate-600 mb-8",
                        children: "Final Score"
                    }, void 0, false, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePlayAgain,
                                className: "w-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                                children: "Play Again"
                            }, void 0, false, {
                                fileName: "[project]/app/play/[id]/page.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: "inline-block w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/app/play/[id]/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/play/[id]/page.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/play/[id]/page.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/play/[id]/page.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 p-4 md:p-8",
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
                    lineNumber: 146,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$TimerBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            seconds: timeLeft
                        }, void 0, false, {
                            fileName: "[project]/app/play/[id]/page.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 mx-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$QuestionBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: currentCard.question
                            }, void 0, false, {
                                fileName: "[project]/app/play/[id]/page.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/play/[id]/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$SubmitCounter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            count: submitCount
                        }, void 0, false, {
                            fileName: "[project]/app/play/[id]/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Play$2f$AnswerGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    answers: answers,
                    locked: locked,
                    chosenIndex: chosenIndex,
                    onChoose: handleChoose
                }, void 0, false, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 text-center space-y-6",
                    children: [
                        !locked && chosenIndex === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500",
                            children: "Choose an answer..."
                        }, void 0, false, {
                            fileName: "[project]/app/play/[id]/page.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this),
                        (locked || chosenIndex !== null) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleNext,
                            className: "bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                            children: qIndex < cardSet.cards.length - 1 ? 'Next' : 'See Results'
                        }, void 0, false, {
                            fileName: "[project]/app/play/[id]/page.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/play/[id]/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/play/[id]/page.tsx",
            lineNumber: 145,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/play/[id]/page.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6a76747._.js.map