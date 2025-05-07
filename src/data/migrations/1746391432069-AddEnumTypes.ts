import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnumTypes1746391432069 implements MigrationInterface {
    name = 'AddEnumTypes1746391432069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, modify existing columns to remove enum constraints
        await queryRunner.query(`
            ALTER TABLE IF EXISTS "members" 
            ALTER COLUMN "membershipTier" TYPE VARCHAR;
        `);

        await queryRunner.query(`
            ALTER TABLE IF EXISTS "book_copies" 
            ALTER COLUMN "status" TYPE VARCHAR;
        `);

        await queryRunner.query(`
            ALTER TABLE IF EXISTS "reservations" 
            ALTER COLUMN "status" TYPE VARCHAR;
        `);

        // Drop existing enum types if they exist
        await queryRunner.query(`
            DROP TYPE IF EXISTS "public"."members_membershiptier_enum";
            DROP TYPE IF EXISTS "public"."book_copies_status_enum";
            DROP TYPE IF EXISTS "public"."reservations_status_enum";
        `);

        // Create enum types
        await queryRunner.query(`
            CREATE TYPE "public"."members_membershiptier_enum" AS ENUM('BASIC', 'PREMIUM', 'VIP');
            CREATE TYPE "public"."book_copies_status_enum" AS ENUM('AVAILABLE', 'LOANED', 'RESERVED', 'MAINTENANCE', 'LOST');
            CREATE TYPE "public"."reservations_status_enum" AS ENUM('PENDING', 'FULFILLED', 'CANCELLED', 'EXPIRED');
        `);

        // Update columns to use the new enum types
        await queryRunner.query(`
            ALTER TABLE IF EXISTS "members" 
            ALTER COLUMN "membershipTier" TYPE "public"."members_membershiptier_enum" 
            USING membershipTier::"public"."members_membershiptier_enum";
        `);

        await queryRunner.query(`
            ALTER TABLE IF EXISTS "book_copies" 
            ALTER COLUMN "status" TYPE "public"."book_copies_status_enum" 
            USING status::"public"."book_copies_status_enum";
        `);

        await queryRunner.query(`
            ALTER TABLE IF EXISTS "reservations" 
            ALTER COLUMN "status" TYPE "public"."reservations_status_enum" 
            USING status::"public"."reservations_status_enum";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // First convert enum columns back to varchar
        await queryRunner.query(`
            ALTER TABLE IF EXISTS "members" 
            ALTER COLUMN "membershipTier" TYPE VARCHAR;
        `);

        await queryRunner.query(`
            ALTER TABLE IF EXISTS "book_copies" 
            ALTER COLUMN "status" TYPE VARCHAR;
        `);

        await queryRunner.query(`
            ALTER TABLE IF EXISTS "reservations" 
            ALTER COLUMN "status" TYPE VARCHAR;
        `);

        // Drop the enum types
        await queryRunner.query(`
            DROP TYPE IF EXISTS "public"."members_membershiptier_enum";
            DROP TYPE IF EXISTS "public"."book_copies_status_enum";
            DROP TYPE IF EXISTS "public"."reservations_status_enum";
        `);
    }
} 