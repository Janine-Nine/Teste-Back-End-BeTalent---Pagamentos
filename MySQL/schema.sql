CREATE TABLE clients(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(120) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(120) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  price DECIMAL(10,2),
  stock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE gateways(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  priority INT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE transactions(
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  amount DECIMAL(10,2),
  status VARCHAR(50),
  gateway_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(client_id) REFERENCES clients(id),
  FOREIGN KEY(gateway_id) REFERENCES gateways(id)
);
CREATE TABLE transaction_items(
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10,2),

  FOREIGN KEY(transaction_id) REFERENCES transactions(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE refunds(
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_id INT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(transaction_id) REFERENCES transactions(id)
);