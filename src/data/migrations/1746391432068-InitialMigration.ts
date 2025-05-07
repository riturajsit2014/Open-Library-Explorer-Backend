import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746391432068 implements MigrationInterface {
    name = 'InitialMigration1746391432068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying,
                "isbn" character varying,
                "publishedAt" date,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "hold_request" (
                "id" SERIAL NOT NULL,
                "requestedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "notified" boolean NOT NULL DEFAULT false,
                "copyId" integer,
                "memberId" integer,
                CONSTRAINT "PK_6b8c189ecc870bb52b1b7849f2f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "copy" (
                "id" SERIAL NOT NULL,
                "available" boolean NOT NULL DEFAULT true,
                "bookId" integer,
                CONSTRAINT "PK_bb60241fcdd659825ef1ff0fd84" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "loan" (
                "id" SERIAL NOT NULL,
                "loanedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "dueDate" date NOT NULL,
                "returnedAt" date,
                "copyId" integer,
                "memberId" integer,
                CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."member_role_enum" AS ENUM('patron', 'librarian', 'admin')
        `);
        await queryRunner.query(`
            CREATE TABLE "member" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "role" "public"."member_role_enum" NOT NULL DEFAULT 'patron',
                "passwordHash" character varying NOT NULL,
                CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email"),
                CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "hold_request"
            ADD CONSTRAINT "FK_6031daabd66776a86b7d6927468" FOREIGN KEY ("copyId") REFERENCES "copy"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "hold_request"
            ADD CONSTRAINT "FK_2f0bd29257e90be4b8c74ac7600" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "copy"
            ADD CONSTRAINT "FK_44d6d67dc1ede6e03367413c6bf" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "loan"
            ADD CONSTRAINT "FK_55c622101f2332d4a65de4e7170" FOREIGN KEY ("copyId") REFERENCES "copy"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "loan"
            ADD CONSTRAINT "FK_12f68be39258f2440220105a862" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "loan" DROP CONSTRAINT "FK_12f68be39258f2440220105a862"
        `);
        await queryRunner.query(`
            ALTER TABLE "loan" DROP CONSTRAINT "FK_55c622101f2332d4a65de4e7170"
        `);
        await queryRunner.query(`
            ALTER TABLE "copy" DROP CONSTRAINT "FK_44d6d67dc1ede6e03367413c6bf"
        `);
        await queryRunner.query(`
            ALTER TABLE "hold_request" DROP CONSTRAINT "FK_2f0bd29257e90be4b8c74ac7600"
        `);
        await queryRunner.query(`
            ALTER TABLE "hold_request" DROP CONSTRAINT "FK_6031daabd66776a86b7d6927468"
        `);
        await queryRunner.query(`
            DROP TABLE "member"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."member_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "loan"
        `);
        await queryRunner.query(`
            DROP TABLE "copy"
        `);
        await queryRunner.query(`
            DROP TABLE "hold_request"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
    }

}
