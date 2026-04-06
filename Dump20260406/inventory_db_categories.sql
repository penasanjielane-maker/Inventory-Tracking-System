-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventory_db
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
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics','Electronics category'),(2,'Office Supplies','Office Supplies category'),(3,'Furniture','Furniture category'),(4,'Stationery','Stationery category'),(5,'Cleaning Supplies','Cleaning Supplies category'),(6,'Tools & Equipment','Tools & Equipment category'),(7,'IT Equipment','IT Equipment category'),(8,'Kitchen Supplies','Kitchen Supplies category'),(9,'Medical Supplies','Medical Supplies category'),(10,'Safety Equipment','Safety Equipment category'),(11,'Packaging Materials','Packaging Materials category'),(12,'Raw Materials','Raw Materials category'),(13,'Finished Goods','Finished Goods category'),(14,'Spare Parts','Spare Parts category'),(15,'Maintenance Supplies','Maintenance Supplies category'),(16,'Consumables','Consumables category'),(17,'Clothing & Uniforms','Clothing & Uniforms category'),(18,'Food & Beverages','Food & Beverages category'),(19,'Books & Educational Materials','Books & Educational Materials category'),(20,'Hardware','Hardware category'),(21,'Software Licenses','Software Licenses category'),(22,'Vehicles & Transport','Vehicles & Transport category'),(23,'Outdoor Equipment','Outdoor Equipment category'),(24,'Promotional Items','Promotional Items category'),(25,'Miscellaneous','Miscellaneous category');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-06 15:40:21
