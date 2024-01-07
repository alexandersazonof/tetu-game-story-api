import { NextFunction, Request, Response } from 'express';
import { Story } from '../models/story.model';
import dataSource from '../migrations/db.source';

class StoryController {
  public async getAllStories(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const storyRepository = dataSource.getRepository(Story);
      const stories = await storyRepository.find({
        relations: ["pages", "pages.answers"]
      });
      res.json(stories);
    } catch (error) {
      next(error);
    }
  }

  public async addStory(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const storyRepository = dataSource.getRepository(Story);
      const newStory = storyRepository.create(req.body);
      // TODO check if exist storyId
      await storyRepository.save(newStory);
      res.status(201).json(newStory);
    } catch (error) {
      next(error);
    }
  }
}

export default new StoryController();
