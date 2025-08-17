-- Создание тестового администратора для доступа к админ-панели
-- Логин: admin@optstroy.shop
-- Пароль: admin123

INSERT INTO users (
    first_name,
    last_name,
    email,
    password_hash,
    phone,
    role,
    status,
    created_at,
    updated_at
) VALUES (
    'Администратор',
    'ОптСтрой',
    'admin@optstroy.shop',
    '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qV', -- admin123
    '+7 (901) 040-09-77',
    'admin',
    'active',
    NOW(),
    NOW()
) ON DUPLICATE KEY UPDATE
    role = 'admin',
    status = 'active',
    updated_at = NOW();

-- Создание дополнительного тестового пользователя
INSERT INTO users (
    first_name,
    last_name,
    email,
    password_hash,
    phone,
    role,
    status,
    created_at,
    updated_at
) VALUES (
    'Тест',
    'Пользователь',
    'user@optstroy.shop',
    '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qV', -- admin123
    '+7 (901) 040-09-78',
    'user',
    'active',
    NOW(),
    NOW()
) ON DUPLICATE KEY UPDATE
    updated_at = NOW();
