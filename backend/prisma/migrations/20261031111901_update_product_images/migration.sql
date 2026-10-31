-- Update product images
UPDATE "products" p
SET "image_url" = m."url"
FROM (VALUES
    ('Rastreador inteligente compacto', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80'),
    ('Auriculares inalámbricos Pro de alta fidelidad', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80'),
    ('Tablet multimedia de 10 pulgadas', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80'),
    ('Reloj inteligente deportivo con GPS', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80'),
    ('Altavoz Bluetooth portátil de 20W', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'),
    ('Altavoz inteligente de asistencia por voz', 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&q=80'),
    ('Lector de libros electrónicos de 16 GB', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'),
    ('Monitor plano FHD de 23.8 pulgadas', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80'),
    ('Smart TV 4K de 55 pulgadas', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80'),
    ('Cámara digital compacta de 16MP', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80'),
    ('Tarjeta de memoria SDHC de 32 GB', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80'),
    ('Cable HDMI de alta velocidad 8K', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'),
    ('Tocadiscos de vinilo con Bluetooth', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80'),
    ('Monitor de 24 pulgadas Full HD', 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80'),
    ('Teléfono inteligente Andrus liberado 5G', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'),
    ('Teléfono inteligente avanzado 5G de 512 GB', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80'),
    ('Cable de carga USB-C a USB-C de 2m', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80'),
    ('Auriculares inalámbricos de diadema', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'),
    ('Enchufe inteligente compatible con asistentes', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80')
) AS m("name", "url")
WHERE p."name" = m."name";
