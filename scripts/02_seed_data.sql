-- Заполнение тестовыми данными
USE optstroy_shop;

-- Создание администратора
INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES
('admin@optstroy.shop', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Администратор', 'Системы', '+7(999)123-45-67', 'admin');

-- Категории товаров
INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
('Строительные материалы', 'stroitelnye-materialy', 'Основные строительные материалы для любых работ', '/categories/materials.jpg', 1),
('Инструменты', 'instrumenty', 'Профессиональные и бытовые инструменты', '/categories/tools.jpg', 2),
('Электрика', 'elektrika', 'Электротехническое оборудование и материалы', '/categories/electrical.jpg', 3),
('Сантехника', 'santekhnika', 'Сантехническое оборудование и комплектующие', '/categories/plumbing.jpg', 4),
('Отделочные материалы', 'otdelochnye-materialy', 'Материалы для внутренней и внешней отделки', '/categories/finishing.jpg', 5),
('Крепеж', 'krepezh', 'Метизы, крепежные элементы и фурнитура', '/categories/fasteners.jpg', 6);

-- Подкатегории
INSERT INTO categories (name, slug, description, parent_id, sort_order) VALUES
('Цемент', 'cement', 'Различные виды цемента', 1, 1),
('Кирпич', 'kirpich', 'Строительный и облицовочный кирпич', 1, 2),
('Электроинструмент', 'elektroinstrument', 'Профессиональный электроинструмент', 2, 1),
('Ручной инструмент', 'ruchnoy-instrument', 'Ручные инструменты для строительства', 2, 2);

-- Товары
INSERT INTO products (name, slug, description, short_description, price, old_price, sku, stock_quantity, category_id, brand, specifications, is_featured) VALUES
('Цемент М500 50кг', 'cement-m500-50kg', 'Высококачественный портландцемент марки М500 в мешках по 50кг. Идеально подходит для строительных и ремонтных работ.', 'Портландцемент М500, мешок 50кг', 450.00, 520.00, 'CEM-M500-50', 150, 7, 'ЕвроЦемент', '{"марка": "М500", "вес": "50кг", "тип": "Портландцемент"}', TRUE),
('Дрель ударная Bosch GSB 13 RE', 'drill-bosch-gsb-13-re', 'Профессиональная ударная дрель мощностью 600Вт с функцией удара. Надежный инструмент для сверления в различных материалах.', 'Ударная дрель Bosch 600Вт', 8500.00, 9200.00, 'BSH-GSB13RE', 25, 9, 'Bosch', '{"мощность": "600Вт", "патрон": "13мм", "удар": "да"}', TRUE),
('Кирпич керамический рядовой', 'kirpich-keramicheskiy', 'Керамический рядовой кирпич полнотелый. Высокое качество, морозостойкость F50.', 'Кирпич керамический рядовой', 12.50, NULL, 'KIR-KER-RYD', 5000, 8, 'КирпичСтрой', '{"размер": "250x120x65мм", "морозостойкость": "F50"}', FALSE),
('Молоток слесарный 500г', 'molotok-slesarnyy-500g', 'Слесарный молоток с деревянной рукояткой, вес 500г. Закаленный боек, удобная эргономичная ручка.', 'Молоток слесарный 500г', 850.00, NULL, 'MOL-SLES-500', 80, 10, 'Зубр', '{"вес": "500г", "материал_рукоятки": "дерево"}', FALSE);
