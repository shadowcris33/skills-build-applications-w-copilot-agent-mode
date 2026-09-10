import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya-chen', email: 'maya.chen@example.com', name: 'Maya Chen' },
      { username: 'jordan-rivera', email: 'jordan.rivera@example.com', name: 'Jordan Rivera' },
      { username: 'sam-okafor', email: 'sam.okafor@example.com', name: 'Sam Okafor' },
    ]);

    await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on consistent running and hiking.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility sessions for everyday athletes.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'Trail run', durationMinutes: 42, points: 84, completedAt: new Date('2026-09-08') },
      { userId: users[1]._id, type: 'Strength training', durationMinutes: 35, points: 70, completedAt: new Date('2026-09-07') },
      { userId: users[2]._id, type: 'Yoga', durationMinutes: 30, points: 45, completedAt: new Date('2026-09-06') },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id, points: 840 },
      { userId: users[1]._id, points: 760 },
      { userId: users[2]._id, points: 615 },
    ]);

    await Workout.insertMany([
      {
        name: 'Steady State Run',
        description: 'A conversational-pace run to build aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced circuit using bodyweight and light dumbbells.',
        difficulty: 'intermediate',
        durationMinutes: 40,
      },
      {
        name: 'Hill Power Session',
        description: 'Short uphill intervals for experienced runners.',
        difficulty: 'advanced',
        durationMinutes: 35,
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
