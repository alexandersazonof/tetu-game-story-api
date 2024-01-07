import { MigrationInterface, QueryRunner } from "typeorm";

export class StoryMigrate1704395836772 implements MigrationInterface {
    name = 'StoryMigrate1704395836772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "story" ("storyId" SERIAL NOT NULL, "storyName" character varying NOT NULL, CONSTRAINT "PK_d2f215d7d69f7ea2b100e10dec9" PRIMARY KEY ("storyId"))`);
        await queryRunner.query(`CREATE TABLE "story_text_info_answer" ("answerId" SERIAL NOT NULL, "answerIdHash" character varying NOT NULL, "answerText" text NOT NULL, "heroClass" integer NOT NULL, "itemRequirements" text, "tokenRequirements" text, "heroCustomDataRequirement" text, "globalCustomDataRequirement" text, "pagePageId" integer, CONSTRAINT "PK_9f17ec324ba6c75b9f030d261b3" PRIMARY KEY ("answerId"))`);
        await queryRunner.query(`CREATE TABLE "story_text_info_page" ("pageId" SERIAL NOT NULL, "mainText" character varying NOT NULL, "storyStoryId" integer, CONSTRAINT "PK_9b090164c12c2e32aab62e9673a" PRIMARY KEY ("pageId"))`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" ADD CONSTRAINT "FK_081a31bd123e423b4593eac8ea7" FOREIGN KEY ("pagePageId") REFERENCES "story_text_info_page"("pageId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_text_info_page" ADD CONSTRAINT "FK_714e31da9f5540b2e694d17b895" FOREIGN KEY ("storyStoryId") REFERENCES "story"("storyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_text_info_page" DROP CONSTRAINT "FK_714e31da9f5540b2e694d17b895"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" DROP CONSTRAINT "FK_081a31bd123e423b4593eac8ea7"`);
        await queryRunner.query(`DROP TABLE "story_text_info_page"`);
        await queryRunner.query(`DROP TABLE "story_text_info_answer"`);
        await queryRunner.query(`DROP TABLE "story"`);
    }

}
