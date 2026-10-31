-- Fix duplicated HDMI cable image
UPDATE "products"
SET "image_url" = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'
WHERE "name" = 'Cable HDMI de alta velocidad 8K';
