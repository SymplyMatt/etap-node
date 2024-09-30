import Subject from './Subject';
import Topic from './Topic';

Subject.hasMany(Topic, {
  foreignKey: 'subject',
  as: 'topics',
});

Topic.belongsTo(Subject, {
  foreignKey: 'subject',
  as: 'subjectDetails',
});
