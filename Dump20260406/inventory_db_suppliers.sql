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
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Tech Solutions Inc.','John Tech','contact@techsolutions.com',NULL,NULL,'2026-04-06 07:38:58'),(2,'Global Office Supplies','Sarah Office','sales@globaloffice.com',NULL,NULL,'2026-04-06 07:38:58'),(3,'Modern Living Furniture','Mike Wood','info@modernliving.com',NULL,NULL,'2026-04-06 07:38:58'),(4,'Hygiene & Maintenance Pro','Clean Team','support@hygienepro.com',NULL,NULL,'2026-04-06 07:38:58'),(5,'Industrial Tools & Hardware','Iron Mike','orders@industrialtools.com',NULL,NULL,'2026-04-06 07:38:58'),(6,'Gourmet & General Goods','Chef G','supply@gourmetgoods.com',NULL,NULL,'2026-04-06 07:38:58'),(7,'Health & Safety First','Dr. Safe','safety@healthfirst.com',NULL,NULL,'2026-04-06 07:38:58'),(8,'Global Logistics & Raw Materials','Logistics Pro','raw@globallogistics.com',NULL,NULL,'2026-04-06 07:38:58'),(9,'Precision Parts Co.','Gear Head','parts@precisionparts.com',NULL,NULL,'2026-04-06 07:38:58'),(10,'Style & Brand Co.','Logo Larry','branding@styleandbrand.com',NULL,NULL,'2026-04-06 07:38:58'),(11,'Auto & Transport Solutions','Van Vin','fleet@autosolutions.com',NULL,NULL,'2026-04-06 07:38:58'),(12,'General Trading Co.','Trade Tom','misc@generaltrading.com',NULL,NULL,'2026-04-06 07:38:58');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-06 15:40:22
