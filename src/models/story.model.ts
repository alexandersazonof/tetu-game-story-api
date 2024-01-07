import { Entity, Column, OneToMany, BaseEntity, PrimaryColumn } from 'typeorm';
import { StoryTextInfoPage } from './story-text-info-page.model';

/**
 * @swagger
 * components:
 *   schemas:
 *     Story:
 *       type: object
 *       required:
 *         - storyId
 *         - storyName
 *       properties:
 *         storyId:
 *           type: integer
 *           description: Unique identifier for the story.
 *           example: 1
 *         storyName:
 *           type: string
 *           description: Name of the story.
 *           example: 'My Amazing Story'
 *         pages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StoryTextInfoPage'
 *           description: List of pages associated with the story.
 */
@Entity()
export class Story extends BaseEntity {
  @PrimaryColumn()
  storyId: number;

  @Column()
  storyName: string;

  @OneToMany(() => StoryTextInfoPage, page => page.story, {
    cascade: true,
  })
  pages: StoryTextInfoPage[];

  constructor(storyId: number, storyName: string, pages: StoryTextInfoPage[]) {
    super();
    this.storyId = storyId;
    this.storyName = storyName;
    this.pages = pages;
  }
}