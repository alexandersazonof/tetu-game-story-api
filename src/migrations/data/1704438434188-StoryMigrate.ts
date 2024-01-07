import { MigrationInterface, QueryRunner } from "typeorm";

export class StoryMigrate1704438434188 implements MigrationInterface {
    name = 'StoryMigrate1704438434188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "permissions" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "story_text_info_page" DROP CONSTRAINT "FK_714e31da9f5540b2e694d17b895"`);
        await queryRunner.query(`ALTER TABLE "story" ALTER COLUMN "storyId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "story_storyId_seq"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" ALTER COLUMN "answerId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "story_text_info_answer_answerId_seq"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" DROP CONSTRAINT "FK_081a31bd123e423b4593eac8ea7"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_page" ALTER COLUMN "pageId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "story_text_info_page_pageId_seq"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" ADD CONSTRAINT "FK_081a31bd123e423b4593eac8ea7" FOREIGN KEY ("pagePageId") REFERENCES "story_text_info_page"("pageId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_text_info_page" ADD CONSTRAINT "FK_714e31da9f5540b2e694d17b895" FOREIGN KEY ("storyStoryId") REFERENCES "story"("storyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_text_info_page" DROP CONSTRAINT "FK_714e31da9f5540b2e694d17b895"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" DROP CONSTRAINT "FK_081a31bd123e423b4593eac8ea7"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "story_text_info_page_pageId_seq" OWNED BY "story_text_info_page"."pageId"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_page" ALTER COLUMN "pageId" SET DEFAULT nextval('"story_text_info_page_pageId_seq"')`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" ADD CONSTRAINT "FK_081a31bd123e423b4593eac8ea7" FOREIGN KEY ("pagePageId") REFERENCES "story_text_info_page"("pageId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "story_text_info_answer_answerId_seq" OWNED BY "story_text_info_answer"."answerId"`);
        await queryRunner.query(`ALTER TABLE "story_text_info_answer" ALTER COLUMN "answerId" SET DEFAULT nextval('"story_text_info_answer_answerId_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "story_storyId_seq" OWNED BY "story"."storyId"`);
        await queryRunner.query(`ALTER TABLE "story" ALTER COLUMN "storyId" SET DEFAULT nextval('"story_storyId_seq"')`);
        await queryRunner.query(`ALTER TABLE "story_text_info_page" ADD CONSTRAINT "FK_714e31da9f5540b2e694d17b895" FOREIGN KEY ("storyStoryId") REFERENCES "story"("storyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
