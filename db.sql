CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_picture VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    publishDate DATETIME NOT NULL,
    author INT NOT NULL,
    description TEXT,
    imgSrc VARCHAR(255),
    likes_count INT DEFAULT 0,
    content TEXT,
    FOREIGN KEY (author) REFERENCES users(id)
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    articleId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (articleId) REFERENCES articles(id)
);

DELIMITER //
CREATE TRIGGER increment_likes_count
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
    UPDATE articles
    SET likes_count = likes_count + 1
    WHERE id = NEW.articleId;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER decrement_likes_count
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
    UPDATE articles
    SET likes_count = likes_count - 1
    WHERE id = OLD.articleId;
END;
//
DELIMITER ;