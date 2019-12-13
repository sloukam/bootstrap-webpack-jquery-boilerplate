-- Dropping guitars table...
DROP TABLE IF EXISTS dogs;

-- Create dogs table...
CREATE TABLE IF NOT EXISTS dogs (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , breed varchar(4) NOT NULL
    , dogname varchar(50) NOT NULL
    , clp int NOT NULL
);
