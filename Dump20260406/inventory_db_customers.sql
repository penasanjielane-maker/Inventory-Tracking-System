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
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Tech Corp International','procurement@techcorp.com','+1-555-0101','123 Innovation Drive, Silicon Valley, CA','2026-04-06 07:38:58'),(2,'Global Retail Solutions','info@globalretail.com','+1-555-0202','456 Market St, New York, NY','2026-04-06 07:38:58'),(3,'City Public School District','supplies@cityschools.edu','+1-555-0303','789 Education Lane, Chicago, IL','2026-04-06 07:38:58'),(4,'Metro General Hospital','logistics@metrohospital.org','+1-555-0404','101 Wellness Blvd, Houston, TX','2026-04-06 07:38:58'),(5,'Sunshine Cafe & Bistro','orders@sunshinecafe.com','+1-555-0505','202 Main St, Miami, FL','2026-04-06 07:38:58'),(6,'Build-It Construction Group','purchasing@buildit.com','+1-555-0606','303 Industry Way, Denver, CO','2026-04-06 07:38:58'),(7,'Alice Johnson','alice.j@email.com','+1-555-0707','404 Residential Ave, Seattle, WA','2026-04-06 07:38:58'),(8,'Bob Smith','bob.smith@email.com','+1-555-0808','505 Quiet Rd, Portland, OR','2026-04-06 07:38:58'),(9,'Office Hub Coworking','manager@officehub.com','+1-555-0909','606 Collaboration St, Austin, TX','2026-04-06 07:38:58'),(10,'Elite Fitness Center','frontdesk@elitefitness.com','+1-555-1010','707 Strength Blvd, Las Vegas, NV','2026-04-06 07:38:58');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
