-- Создание таблицы для подписчиков рассылки
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribe_token VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_subscribed_at (subscribed_at),
    INDEX idx_is_active (is_active)
);

-- Добавление тестовых подписчиков
INSERT INTO newsletter_subscribers (email, unsubscribe_token) VALUES
('test@example.com', UUID()),
('admin@optstroy.shop', UUID()),
('manager@optstroy.shop', UUID())
ON DUPLICATE KEY UPDATE email = VALUES(email);
