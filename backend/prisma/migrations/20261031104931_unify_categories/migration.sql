-- Create frontend categories
INSERT INTO "categories" ("name") VALUES
    ('Gaming'),
    ('Home Office'),
    ('Periféricos'),
    ('Audio'),
    ('Monitores'),
    ('Accesorios')
ON CONFLICT ("name") DO NOTHING;

-- Remap products
UPDATE "products" p
SET "category_id" = dest."id"
FROM "categories" src
JOIN (VALUES
    ('Monitores y TV', 'Monitores'),
    ('Wearables', 'Accesorios'),
    ('Tablets y e-readers', 'Home Office'),
    ('Hogar inteligente', 'Home Office'),
    ('Smartphones', 'Home Office'),
    ('Cámaras', 'Periféricos')
) AS m("from", "to") ON m."from" = src."name"
JOIN "categories" dest ON dest."name" = m."to"
WHERE p."category_id" = src."id";

-- Drop replaced categories
DELETE FROM "categories" c
WHERE c."name" IN ('Monitores y TV', 'Wearables', 'Tablets y e-readers', 'Hogar inteligente', 'Smartphones', 'Cámaras')
  AND NOT EXISTS (SELECT 1 FROM "products" p WHERE p."category_id" = c."id");
