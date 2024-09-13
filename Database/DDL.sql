CREATE DATABASE FRUITBOX;
USE FRUITBOX;

CREATE TABLE Vendors (
    vendorID INT PRIMARY KEY,
    vendorPassword VARCHAR(255) NOT NULL,
    vendorName VARCHAR(100) NOT NULL,
    vendorPhoneNumber VARCHAR(15),
    vendorAddress VARCHAR(255)
);

CREATE TABLE user (
    userID VARCHAR(10),
    userName VARCHAR(30), 
    userEmail VARCHAR(30), 
    userPassword  VARCHAR(20),
    userPhoneNumber INT(10), 
    PRIMARY KEY (userID),
     userAddress VARCHAR(255)
);

CREATE TABLE Orders (
    orderID INT PRIMARY KEY,
    userID VARCHAR(10),
    vendorID INT,
    quantity INT,
    price FLOAT,
    OrderDate DATE NOT NULL,
    DeliveryDate DATE,
    Status  VARCHAR(50),
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID)
        ON DELETE CASCADE
);

CREATE TABLE payment (
    userID VARCHAR(10),
    paymentID VARCHAR(10), 
    orderID INT, 
    paymentDate DATE,
    amount FLOAT, 
    paymentMode VARCHAR(15) CHECK (paymentMode IN ('Cash on Delivery', 'UPI', 'Debit Card')),
    PRIMARY KEY (paymentID),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID)
        ON DELETE CASCADE
);

CREATE TABLE product (
    productID VARCHAR(10),
    vendorID INT,
    productName VARCHAR(30),
    price FLOAT,
    PRIMARY KEY (productID),
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID)
        ON DELETE CASCADE
);

CREATE TABLE Subscription (
    subs_ID INT PRIMARY KEY,
    subs_Type VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    userID VARCHAR(10),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE
);

CREATE TABLE Cart (
    cartID INT PRIMARY KEY,
    userID VARCHAR(10),
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (userID) REFERENCES user(userID)
        ON DELETE CASCADE
);

CREATE TABLE SearchProduct (
    vendorID INT,
    productID VARCHAR(10),
    PRIMARY KEY (vendorID, productID),
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID)
        ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES product(productID)
        ON DELETE CASCADE
);