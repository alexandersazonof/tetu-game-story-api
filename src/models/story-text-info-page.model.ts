import { Entity, Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Story } from './story.model';
import { StoryTextInfoAnswer } from './story-text-info-answer.mode';

/**
 * @swagger
 * components:
 *   schemas:
 *     StoryTextInfoPage:
 *       type: object
 *       required:
 *         - pageId
 *         - mainText
 *         - story
 *         - answers
 *       properties:
 *         pageId:
 *           type: integer
 *           description: Unique identifier for the page.
 *           example: 100
 *         mainText:
 *           type: string
 *           description: Main text content of the page.
 *           example: 'Once upon a time...'
 *         story:
 *           $ref: '#/components/schemas/Story'
 *           description: The story this page belongs to.
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StoryTextInfoAnswer'
 *           description: List of answers associated with the page.
 */
@Entity()
export class StoryTextInfoPage {
  @PrimaryColumn()
  pageId: number;

  @Column()
  mainText: string;

  @ManyToOne(() => Story, story => story.pages)
  story: Story;

  @OneToMany(() => StoryTextInfoAnswer, answer => answer.page, {
    cascade: true
  })
  answers: StoryTextInfoAnswer[];


  constructor(pageId: number, mainText: string, story: Story, answers: StoryTextInfoAnswer[]) {
    this.pageId = pageId;
    this.mainText = mainText;
    this.story = story;
    this.answers = answers;
  }
}
