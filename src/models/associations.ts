import Subject from './Subject';
import Topic from './Topic';
import UserLesson from './UserLesson';
import Student from './Student';

// Subject and Topic Associations
Subject.hasMany(Topic, {
  foreignKey: 'subject',
  as: 'topics',
});
Topic.belongsTo(Subject, {
  foreignKey: 'subject',
  as: 'subjectDetails',
});

// UserLesson Associations
UserLesson.belongsTo(Student, { 
  foreignKey: 'student', 
  as: 'studentDetails' 
});
UserLesson.belongsTo(Topic, { 
  foreignKey: 'topic', 
  as: 'topicDetails' 
});

// Student Associations
Student.hasMany(UserLesson, {
  foreignKey: 'student',
  as: 'userLessons',
});

// Topic Associations
Topic.hasMany(UserLesson, {
  foreignKey: 'topic',
  as: 'userLessons',
});
