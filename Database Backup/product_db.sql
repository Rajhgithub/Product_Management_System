-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: product_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(150) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Wireless Mouse',200.00,10),(2,'Mechanical Keyboard',2000.00,10),(3,'HD Monitor',199.99,20),(6,'Computer 3',65000.50,2),(8,'Computer 2',65000.00,1),(12,'Computer',65000.00,3),(15,'Wireless Mouse',2000.00,5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `PASS` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bob','bob@example.com','mypassword123'),(2,'tab_3','rajendramrajhkumar@gmail.com','$2b$08$vOAwTuvbBJhJlC2ZETF2OeCfuCSHO956q8z/81XnCvowtBBbC36r.'),(3,'tab_4','ramkumaran2@gmail.com','$2b$08$lmmidP6aSjkqoUve5JWn7eU.AOG0Ng6a7a6NkovHX64qXATHoUpVW'),(4,'tab_3','ramkumaran3@gmail.com','$2b$08$VsqkCR1SZSJvYzuGnpKyBecBuhlp6VcDpQtOXumr6y1J6sc9eroSG'),(5,'tab_3','ramkumaran4@gmail.com','$2b$08$ITahZG2rL6uqX9j8nfFjz.0G9vxY6sLiquNrURJt8.aWMIG2N5a9u'),(6,'Rajhkumar','ramkumaran5@gmail.com','$2b$08$PaU0KFP2AaoqQbdnEZeamOZXMVB9OVcuvD3BljL5d7AcDOJzyugy.'),(7,'tab_4','ramkumaran6@gmail.com','$2b$08$nguSgehPj2xwvyHLo21CEO26ogW/MjsJ5QJYwhXiEHB9Wm.y7HXfy'),(8,'','','$2b$08$zQV1cHN.lNZV8.TxApWsoORfUkqWPzd8wV9LttlypZJyNQGi9peK6'),(9,'Ramkumar','ramkumaran7@gmail.com','$2b$08$7A3Rvu9YKl4QvsnOi.L50ufQx1uw8Z0BBgpAG9gSJhzS3zzppumMm');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16  7:34:28
