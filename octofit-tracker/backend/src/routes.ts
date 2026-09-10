import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models';

type ResourceModel = Model<any>;

function createResourceRouter(model: ResourceModel): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    response.json(await model.find().lean());
  });

  router.post('/', async (request, response) => {
    const resource = await model.create(request.body);
    response.status(201).json(resource);
  });

  router.get('/:id', async (request, response) => {
    const resource = await model.findById(request.params.id).lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.patch('/:id', async (request, response) => {
    const resource = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.delete('/:id', async (request, response) => {
    const resource = await model.findByIdAndDelete(request.params.id).lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.status(204).send();
  });

  return router;
}

export const usersRouter = createResourceRouter(User);
export const teamsRouter = createResourceRouter(Team);
export const activitiesRouter = createResourceRouter(Activity);
export const workoutsRouter = createResourceRouter(Workout);

export const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ points: -1 }).lean());
});
leaderboardRouter.post('/', async (request, response) => {
  const entry = await Leaderboard.create(request.body);
  response.status(201).json(entry);
});