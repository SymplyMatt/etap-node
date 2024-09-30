// src/models/associations.ts
import Subject from './Subject';
import Topic from './Topic';

// Define the associations here
Subject.hasMany(Topic, {
  foreignKey: 'subject',
  as: 'topics',
});

Topic.belongsTo(Subject, {
  foreignKey: 'subject',
  as: 'subjectDetails',
});
