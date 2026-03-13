INSERT INTO users(email,password,role)
VALUES
('admin@betalente.com','$2b$10$hashfake','ADMIN');

INSERT INTO clients(name,email)
VALUES
('Maria Silva','maria@email.com'),
('João Souza','joao@email.com');

INSERT INTO products(name,price,stock)
VALUES
('Notebook Gamer',5500,10),
('Mouse Pro',150,50),
('Teclado Mecânico',300,30);

INSERT INTO gateways(name,priority,active)
VALUES
('Stripe',1,true),
('MercadoPago',2,true),
('PagSeguro',3,false);

INSERT INTO transactions(client_id,amount,status,gateway_id)
VALUES
(1,300,'APPROVED',1),
(2,150,'APPROVED',2);

INSERT INTO transaction_items(transaction_id,product_id,quantity,price)
VALUES
(1,2,2,150),
(2,2,1,150);