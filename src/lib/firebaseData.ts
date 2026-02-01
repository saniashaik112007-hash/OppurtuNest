import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Seed data for all sections
export async function seedFirebaseData() {
  try {
    // 1. Opportunities (Internships, Hackathons, Workshops, Events)
    const opportunities = [
      {
        id: 'intern-1',
        title: 'Software Engineering Intern',
        company: 'Google',
        type: 'internship',
        location: 'Mountain View, CA',
        description: 'Join our team as a software engineering intern and work on cutting-edge projects.',
        requirements: ['Python', 'JavaScript', 'React'],
        deadline: '2024-03-15',
        salary: '$6000/month',
        duration: '3 months',
        createdAt: serverTimestamp(),
      },
      {
        id: 'intern-2',
        title: 'Data Science Intern',
        company: 'Microsoft',
        type: 'internship',
        location: 'Seattle, WA',
        description: 'Work with big data and machine learning models.',
        requirements: ['Python', 'SQL', 'Machine Learning'],
        deadline: '2024-03-20',
        salary: '$5500/month',
        duration: '4 months',
        createdAt: serverTimestamp(),
      },
      {
        id: 'hackathon-1',
        title: 'AI Innovation Hackathon',
        company: 'TechCorp',
        type: 'hackathon',
        location: 'San Francisco, CA',
        description: 'Build innovative AI solutions in 48 hours.',
        prize: '$10,000',
        date: '2024-04-01',
        teamSize: '2-4 members',
        createdAt: serverTimestamp(),
      },
      {
        id: 'hackathon-2',
        title: 'Web3 Development Challenge',
        company: 'Blockchain Inc',
        type: 'hackathon',
        location: 'Online',
        description: 'Create decentralized applications using Web3 technologies.',
        prize: '$15,000',
        date: '2024-04-15',
        teamSize: '1-5 members',
        createdAt: serverTimestamp(),
      },
      {
        id: 'workshop-1',
        title: 'React Masterclass',
        company: 'Tech Academy',
        type: 'workshop',
        location: 'Online',
        description: 'Learn React from basics to advanced concepts.',
        instructor: 'John Doe',
        date: '2024-03-10',
        duration: '4 hours',
        price: 'Free',
        createdAt: serverTimestamp(),
      },
      {
        id: 'workshop-2',
        title: 'Machine Learning Fundamentals',
        company: 'Data Science Institute',
        type: 'workshop',
        location: 'New York, NY',
        description: 'Introduction to ML algorithms and practical applications.',
        instructor: 'Jane Smith',
        date: '2024-03-20',
        duration: '6 hours',
        price: '$50',
        createdAt: serverTimestamp(),
      },
      {
        id: 'event-1',
        title: 'Tech Career Fair 2024',
        company: 'Career Connect',
        type: 'event',
        location: 'Los Angeles, CA',
        description: 'Meet top tech companies and explore career opportunities.',
        date: '2024-04-05',
        attendees: '500+',
        createdAt: serverTimestamp(),
      },
      {
        id: 'event-2',
        title: 'Developer Conference 2024',
        company: 'DevConf',
        type: 'event',
        location: 'Austin, TX',
        description: 'Annual conference for developers featuring talks and networking.',
        date: '2024-05-10',
        attendees: '1000+',
        createdAt: serverTimestamp(),
      },
    ];

    // 2. Courses
    const courses = [
      {
        id: 'course-1',
        name: 'B.Tech (Bachelor of Technology)',
        branches: [
          'Computer Science Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electronics & Communication',
          'Information Technology',
        ],
        duration: '4 years',
        description: 'Comprehensive engineering program with multiple specializations.',
        createdAt: serverTimestamp(),
      },
      {
        id: 'course-2',
        name: 'Pharmacy',
        branches: ['B.Pharmacy', 'D.Pharmacy', 'PharmD'],
        duration: '4 years',
        description: 'Pharmaceutical sciences and drug development programs.',
        createdAt: serverTimestamp(),
      },
      {
        id: 'course-3',
        name: 'B.Sc (Bachelor of Science)',
        branches: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Biology'],
        duration: '3 years',
        description: 'Science programs with various specializations.',
        createdAt: serverTimestamp(),
      },
      {
        id: 'course-4',
        name: 'BBA (Bachelor of Business Administration)',
        branches: ['Marketing', 'Finance', 'Human Resources', 'International Business'],
        duration: '3 years',
        description: 'Business administration and management programs.',
        createdAt: serverTimestamp(),
      },
      {
        id: 'course-5',
        name: 'BCA (Bachelor of Computer Applications)',
        branches: ['Software Development', 'Data Science', 'Web Development'],
        duration: '3 years',
        description: 'Computer applications and software development programs.',
        createdAt: serverTimestamp(),
      },
      {
        id: 'course-6',
        name: 'B.Com (Bachelor of Commerce)',
        branches: ['Accounting', 'Banking', 'Finance', 'Taxation'],
        duration: '3 years',
        description: 'Commerce and finance programs.',
        createdAt: serverTimestamp(),
      },
    ];

    // 3. Subject PDFs
    const subjects = [
      {
        id: 'subject-1-1',
        semester: '1-1',
        course: 'B.Tech',
        branch: 'Computer Science',
        subjects: [
          { name: 'Mathematics I', pdfUrl: 'https://example.com/math1.pdf' },
          { name: 'Physics', pdfUrl: 'https://example.com/physics.pdf' },
          { name: 'Chemistry', pdfUrl: 'https://example.com/chemistry.pdf' },
          { name: 'Programming Fundamentals', pdfUrl: 'https://example.com/prog.pdf' },
        ],
        createdAt: serverTimestamp(),
      },
      {
        id: 'subject-1-2',
        semester: '1-2',
        course: 'B.Tech',
        branch: 'Computer Science',
        subjects: [
          { name: 'Mathematics II', pdfUrl: 'https://example.com/math2.pdf' },
          { name: 'Data Structures', pdfUrl: 'https://example.com/ds.pdf' },
          { name: 'Digital Electronics', pdfUrl: 'https://example.com/de.pdf' },
        ],
        createdAt: serverTimestamp(),
      },
      {
        id: 'subject-2-1',
        semester: '2-1',
        course: 'B.Tech',
        branch: 'Computer Science',
        subjects: [
          { name: 'Object-Oriented Programming', pdfUrl: 'https://example.com/oop.pdf' },
          { name: 'Database Management Systems', pdfUrl: 'https://example.com/dbms.pdf' },
          { name: 'Computer Networks', pdfUrl: 'https://example.com/cn.pdf' },
        ],
        createdAt: serverTimestamp(),
      },
    ];

    // 4. Quizzes
    const quizzes = [
      {
        id: 'quiz-1',
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics',
        category: 'Programming',
        questions: [
          {
            id: 'q1',
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
            correctAnswer: 0,
          },
          {
            id: 'q2',
            question: 'Which method is used to add an element to the end of an array?',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correctAnswer: 0,
          },
          {
            id: 'q3',
            question: 'What does === mean in JavaScript?',
            options: ['Assignment', 'Loose equality', 'Strict equality', 'Not equal'],
            correctAnswer: 2,
          },
          {
            id: 'q4',
            question: 'What is the output of: typeof null?',
            options: ['null', 'undefined', 'object', 'number'],
            correctAnswer: 2,
          },
          {
            id: 'q5',
            question: 'Which keyword is used to declare a constant in JavaScript?',
            options: ['const', 'let', 'var', 'constant'],
            correctAnswer: 0,
          },
        ],
        timeLimit: 15,
        difficulty: 'Easy',
        points: 100,
        createdAt: serverTimestamp(),
      },
      {
        id: 'quiz-2',
        title: 'React Advanced Concepts',
        description: 'Advanced React patterns and hooks',
        category: 'Web Development',
        questions: [
          {
            id: 'q1',
            question: 'What is the purpose of useEffect hook?',
            options: ['To manage state', 'To perform side effects', 'To create components', 'To handle events'],
            correctAnswer: 1,
          },
          {
            id: 'q2',
            question: 'What does useMemo hook do?',
            options: ['Memoizes components', 'Memoizes values', 'Memoizes functions', 'Memoizes state'],
            correctAnswer: 1,
          },
          {
            id: 'q3',
            question: 'What is the correct way to pass props to a component?',
            options: ['<Component props={data} />', '<Component {...data} />', '<Component data={data} />', 'All of the above'],
            correctAnswer: 3,
          },
        ],
        timeLimit: 20,
        difficulty: 'Hard',
        points: 200,
        createdAt: serverTimestamp(),
      },
      {
        id: 'quiz-3',
        title: 'Data Structures & Algorithms',
        description: 'Test your DSA knowledge',
        category: 'Computer Science',
        questions: [
          {
            id: 'q1',
            question: 'What is the time complexity of binary search?',
            options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
            correctAnswer: 1,
          },
          {
            id: 'q2',
            question: 'Which data structure follows LIFO principle?',
            options: ['Queue', 'Stack', 'Array', 'Linked List'],
            correctAnswer: 1,
          },
          {
            id: 'q3',
            question: 'What is the time complexity of accessing an element in an array by index?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
            correctAnswer: 2,
          },
        ],
        timeLimit: 30,
        difficulty: 'Medium',
        points: 150,
        createdAt: serverTimestamp(),
      },
    ];

    // 5. Assignments
    const assignments = [
      {
        id: 'assign-1',
        title: 'Build a Todo App',
        description: 'Create a full-stack todo application using React and Node.js',
        course: 'Web Development',
        dueDate: '2024-03-15',
        points: 100,
        difficulty: 'Medium',
        createdAt: serverTimestamp(),
      },
      {
        id: 'assign-2',
        title: 'Implement Binary Search Tree',
        description: 'Write a complete implementation of BST with all operations',
        course: 'Data Structures',
        dueDate: '2024-03-20',
        points: 150,
        difficulty: 'Hard',
        createdAt: serverTimestamp(),
      },
      {
        id: 'assign-3',
        title: 'Database Design Project',
        description: 'Design and implement a database for an e-commerce system',
        course: 'Database Management',
        dueDate: '2024-03-25',
        points: 200,
        difficulty: 'Hard',
        createdAt: serverTimestamp(),
      },
    ];

    // Seed all data
    console.log('Seeding Firebase data...');

    // Seed Opportunities
    for (const opp of opportunities) {
      await setDoc(doc(db, 'opportunities', opp.id), opp);
    }
    console.log(`✓ Seeded ${opportunities.length} opportunities`);

    // Seed Courses
    for (const course of courses) {
      await setDoc(doc(db, 'courses', course.id), course);
    }
    console.log(`✓ Seeded ${courses.length} courses`);

    // Seed Subjects
    for (const subject of subjects) {
      await setDoc(doc(db, 'subjects', subject.id), subject);
    }
    console.log(`✓ Seeded ${subjects.length} subject groups`);

    // Seed Quizzes
    for (const quiz of quizzes) {
      await setDoc(doc(db, 'quizzes', quiz.id), quiz);
    }
    console.log(`✓ Seeded ${quizzes.length} quizzes`);

    // Seed Assignments
    for (const assignment of assignments) {
      await setDoc(doc(db, 'assignments', assignment.id), assignment);
    }
    console.log(`✓ Seeded ${assignments.length} assignments`);

    console.log('✅ All data seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    return false;
  }
}

