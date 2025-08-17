-- Обновление таблицы пользователей для расширенной системы ролей
ALTER TABLE users 
ADD COLUMN phone VARCHAR(20),
ADD COLUMN address TEXT,
ADD COLUMN status ENUM('active', 'blocked') DEFAULT 'active',
ADD COLUMN last_login TIMESTAMP NULL;

-- Обновление существующих ролей
UPDATE users SET role = 'user' WHERE role NOT IN ('admin', 'user');

-- Добавление индексов для оптимизации
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_email ON users(email);

-- Вставка тестовых данных администратора
INSERT INTO users (name, email, password_hash, role, phone, created_at, status) 
VALUES 
('Администратор', 'admin@optstroy.shop', '$2y$10$example_hash', 'admin', '+7 (999) 000-00-00', NOW(), 'active')
ON DUPLICATE KEY UPDATE role = 'admin';
