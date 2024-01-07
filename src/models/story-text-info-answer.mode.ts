import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { StoryTextInfoPage } from './story-text-info-page.model';

/**
 * @swagger
 * components:
 *   schemas:
 *     StoryTextInfoAnswer:
 *       type: object
 *       required:
 *         - answerId
 *         - answerIdHash
 *         - answerText
 *         - heroClass
 *       properties:
 *         answerId:
 *           type: integer
 *           description: Unique identifier for the answer.
 *           example: 1
 *         answerIdHash:
 *           type: string
 *           description: Hash for the answer ID.
 *           example: 'abc123'
 *         answerText:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               heroClass:
 *                 type: integer
 *                 description: Hero class associated with the answer.
 *                 example: 2
 *               text:
 *                 type: string
 *                 description: Text of the answer.
 *                 example: 'This is an answer.'
 *           description: Array of texts and associated hero classes.
 *         heroClass:
 *           type: integer
 *           description: Hero class for the answer.
 *           example: 2
 *         itemRequirements:
 *           type: object
 *           properties:
 *             requireItems:
 *               type: array
 *               items:
 *                 type: string
 *               description: List of required items.
 *             requireItemBurn:
 *               type: array
 *               items:
 *                 type: boolean
 *               description: Whether the item needs to be burned.
 *             requireItemEquipped:
 *               type: array
 *               items:
 *                 type: boolean
 *               description: Whether the item needs to be equipped.
 *           description: Requirements related to items.
 *         tokenRequirements:
 *           type: object
 *           properties:
 *             requireToken:
 *               type: array
 *               items:
 *                 type: string
 *               description: List of required tokens.
 *             requireAmount:
 *               type: array
 *               items:
 *                 type: string
 *               description: Required amounts for the tokens.
 *             requireTransfer:
 *               type: array
 *               items:
 *                 type: boolean
 *               description: Whether the tokens need to be transferred.
 *           description: Token related requirements.
 *         heroCustomDataRequirement:
 *           type: object
 *           properties:
 *             dataIndex:
 *               type: array
 *               items:
 *                 type: string
 *               description: Indexes of the custom data.
 *             dataValueMin:
 *               type: array
 *               items:
 *                 type: number
 *               description: Minimum values of the custom data.
 *             dataValueMax:
 *               type: array
 *               items:
 *                 type: number
 *               description: Maximum values of the custom data.
 *             mandatory:
 *               type: array
 *               items:
 *                 type: boolean
 *               description: Whether the custom data is mandatory.
 *             failNextPageIds:
 *               type: array
 *               items:
 *                 type: number
 *               description: Next page IDs if the requirement fails.
 *           description: Custom data requirements for the hero.
 *         globalCustomDataRequirement:
 *           type: object
 *           properties:
 *             dataIndex:
 *               type: array
 *               items:
 *                 type: string
 *               description: Indexes of the global custom data.
 *             dataValueMin:
 *               type: array
 *               items:
 *                 type: number
 *               description: Minimum values of the global custom data.
 *             dataValueMax:
 *               type: array
 *               items:
 *                 type: number
 *               description: Maximum values of the global custom data.
 *             mandatory:
 *               type: array
 *               items:
 *                 type: boolean
 *               description: Whether the global custom data is mandatory.
 *             failNextPageIds:
 *               type: array
 *               items:
 *                 type: number
 *               description: Next page IDs if the global requirement fails.
 *           description: Global custom data requirements.
 *         page:
 *           $ref: '#/components/schemas/StoryTextInfoPage'
 *           description: The page this answer belongs to.
 */
@Entity()
export class StoryTextInfoAnswer {
  @PrimaryColumn()
  answerId: number;

  @Column()
  answerIdHash: string;

  @Column("simple-json")
  answerText: {
    heroClass: number;
    text: string;
  }[];

  @Column()
  heroClass: number;

  // Дополнительные поля с условной логикой и требованиями
  @Column({ type: "simple-json", nullable: true })
  itemRequirements?: {
    requireItems: string[];
    requireItemBurn: boolean[];
    requireItemEquipped: boolean[];
  };

  @Column({ type: "simple-json", nullable: true })
  tokenRequirements?: {
    requireToken: string[];
    requireAmount: string[];
    requireTransfer: boolean[];
  };

  @Column({ type: "simple-json", nullable: true })
  heroCustomDataRequirement?: {
    dataIndex: string[];
    dataValueMin: number[];
    dataValueMax: number[];
    mandatory: boolean[];
    failNextPageIds: number[];
  };

  @Column({ type: "simple-json", nullable: true })
  globalCustomDataRequirement?: {
    dataIndex: string[];
    dataValueMin: number[];
    dataValueMax: number[];
    mandatory: boolean[];
    failNextPageIds: number[];
  };

  @ManyToOne(() => StoryTextInfoPage, page => page.answers)
  page: StoryTextInfoPage;


  constructor(
    answerId: number,
    answerIdHash: string,
    answerText: { heroClass: number; text: string }[],
    heroClass: number,
    itemRequirements: { requireItems: string[]; requireItemBurn: boolean[]; requireItemEquipped: boolean[] },
    tokenRequirements: { requireToken: string[]; requireAmount: string[]; requireTransfer: boolean[] },
    heroCustomDataRequirement: {
      dataIndex: string[];
      dataValueMin: number[];
      dataValueMax: number[];
      mandatory: boolean[];
      failNextPageIds: number[]
    },
    globalCustomDataRequirement: {
      dataIndex: string[];
      dataValueMin: number[];
      dataValueMax: number[];
      mandatory: boolean[];
      failNextPageIds: number[]
    },
    page: StoryTextInfoPage
  ) {
    this.answerId = answerId;
    this.answerIdHash = answerIdHash;
    this.answerText = answerText;
    this.heroClass = heroClass;
    this.itemRequirements = itemRequirements;
    this.tokenRequirements = tokenRequirements;
    this.heroCustomDataRequirement = heroCustomDataRequirement;
    this.globalCustomDataRequirement = globalCustomDataRequirement;
    this.page = page;
  }
}
