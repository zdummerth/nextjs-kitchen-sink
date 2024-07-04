DROP TABLE IF EXISTS transaction_categories;

DROP TABLE IF EXISTS transactions;

DROP TABLE IF EXISTS budget_categories;

DROP TABLE IF EXISTS budgets;

DROP TABLE IF EXISTS categories;

CREATE TABLE
  categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL,
    CHECK (type IN ('expense', 'income'))
  );

CREATE TABLE
  transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255),
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );

CREATE TABLE
  transaction_categories (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (transaction_id) REFERENCES transactions (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );

CREATE TABLE
  budgets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    CHECK (start_date < end_date)
  );

CREATE TABLE
  budget_categories (
    id SERIAL PRIMARY KEY,
    budget_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (budget_id) REFERENCES budgets (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );

SELECT
  *
from
  transactions
LIMIT
  10;