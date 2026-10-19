-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- New integer ids for categories
ALTER TABLE "categories" ADD COLUMN "new_id" INTEGER;

UPDATE "categories" c
SET "new_id" = r."rn" + 999
FROM (SELECT "id", row_number() OVER (ORDER BY "name") AS "rn" FROM "categories") r
WHERE r."id" = c."id";

-- Remap products
ALTER TABLE "products" ADD COLUMN "new_category_id" INTEGER;

UPDATE "products" p
SET "new_category_id" = c."new_id"
FROM "categories" c
WHERE c."id" = p."category_id";

ALTER TABLE "products" DROP COLUMN "category_id";
ALTER TABLE "products" RENAME COLUMN "new_category_id" TO "category_id";
ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;

-- Replace categories primary key
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey";
ALTER TABLE "categories" DROP COLUMN "id";
ALTER TABLE "categories" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "categories" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

CREATE SEQUENCE "categories_id_seq" START WITH 1000 OWNED BY "categories"."id";
SELECT setval('"categories_id_seq"', COALESCE((SELECT MAX("id") FROM "categories"), 999) + 1, false);
ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT nextval('"categories_id_seq"');

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
