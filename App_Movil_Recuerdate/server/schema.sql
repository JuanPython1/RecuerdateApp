CREATE DATABASE Recordatorio_App;

USE Recordatorio_App;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE recordatorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_hora DATETIME NOT NULL,
    completado BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_recordatorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recordatorios_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recordatorios_id) REFERENCES recordatorios(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert two users into the users table
-- Insertar dos usuarios en la tabla users
INSERT INTO users (name, email, password) VALUES ('Juan', 'kamilo201025@gmail.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Pedro', 'pedro@gmail.com', 'password2');


-- insertar un recordatorio al usuario con id 1 (juan)
INSERT INTO recordatorios (titulo, descripcion, fecha_hora, user_id)
VALUES ('Parcial 1 calculo 2', 'Debo estudiar las derivadas un dia antes para el parcial', '2024-02-12 00:17:00', 1);

-- Insertar recordatorio a un usuario con otro usuario mediante el share (compartir)
INSERT INTO shared_recordatorios (recordatorios_id, user_id, shared_with_id) VALUES (1,1,2);

-- obtenet recordatorios incluido shared_recordatorios con el id
SELECT recordatorios.*, shared_recordatorios.shared_with_id
FROM recordatorios
LEFT JOIN shared_recordatorios ON recordatorios.id = shared_recordatorios.recordatorios_id
WHERE recordatorios.user_id = 2 OR shared_recordatorios.shared_with_id = 2;


