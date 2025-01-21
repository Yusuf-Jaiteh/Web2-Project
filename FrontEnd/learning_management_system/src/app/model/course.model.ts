export interface Course {
    _id: string;
    courseTitle: string;
    description: string;
    instructor: User;
}

export interface Lesson{
    id: string;
    course: Course;
    lessonTitle: string;
    content: string;
    orderNumber: number;
    previousLessonId: string;
    nextLessonId: string;
    createdAt: string;
    updatedAt: string;
}

export interface User{
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
}

export interface Assignment{
    id: string;
    course: Course;
    assignmentTitle: string;
    description: string;
    dueDate: Date;
    pointsPossible: string;
    submissions: Submission[];
}

export interface Enrollment{
    
    user: User;
    course: Course;
    enrollmentDate: Date;
}

export interface Submission{
    id: Id;
    user: User;
    assignment: Assignment;
    submissionDate: Date;
    grade: number;
    content: string;
    course: Course;
}

export interface Id{
    courseId: string,
    userId: string
}