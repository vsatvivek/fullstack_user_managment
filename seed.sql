-- Seed admin user (password: admin123)
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@demo.com', '$2b$12$HIt/3OxiDctD79532w6d.uAAmODs6TbjixqC5afHc5JE0CaW0StsW', 'admin')
ON CONFLICT (email) DO NOTHING;