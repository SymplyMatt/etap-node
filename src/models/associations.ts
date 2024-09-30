import Subject from './Subject';
import Topic from './Topic';
import UserLesson from './UserLesson';
import Student from './Student';

Subject.hasMany(Topic, {
  foreignKey: 'subject',
  as: 'topics',
});

Topic.belongsTo(Subject, {
  foreignKey: 'subject',
  as: 'subjectDetails',
});


UserLesson.belongsTo(Student, { 
  foreignKey: 'student', 
  as: 'studentDetails' 
});

UserLesson.belongsTo(Topic, { 
  foreignKey: 'topic', 
  as: 'topicDetails' 
});

Student.hasMany(UserLesson, {
  foreignKey: 'student',
  as: 'userLessons',
});

Topic.hasMany(UserLesson, {
  foreignKey: 'topic',
  as: 'userLessons',
});


