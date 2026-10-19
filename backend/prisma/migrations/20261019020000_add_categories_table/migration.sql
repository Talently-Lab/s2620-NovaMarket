-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- Seed categories
INSERT INTO "categories" ("id", "name") VALUES
    (gen_random_uuid()::text, 'Wearables'),
    (gen_random_uuid()::text, 'Monitores y TV'),
    (gen_random_uuid()::text, 'Audio'),
    (gen_random_uuid()::text, 'Tablets y e-readers'),
    (gen_random_uuid()::text, 'Hogar inteligente'),
    (gen_random_uuid()::text, 'Cámaras'),
    (gen_random_uuid()::text, 'Accesorios'),
    (gen_random_uuid()::text, 'Smartphones');

INSERT INTO "categories" ("id", "name")
SELECT gen_random_uuid()::text, "category"
FROM (SELECT DISTINCT "category" FROM "products") AS p
ON CONFLICT ("name") DO NOTHING;

-- AlterTable
ALTER TABLE "products" ADD COLUMN "category_id" TEXT;

UPDATE "products" p
SET "category_id" = c."id"
FROM "categories" c
WHERE c."name" = p."category";

ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;

ALTER TABLE "products" DROP COLUMN "category";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
