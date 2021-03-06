-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: canvas_file_sync
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.17.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  `sync_time` timestamp NULL DEFAULT NULL,
  `sync_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'通用课程','VE202','2017-05-10 17:39:45',2);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `folder_id` int(11) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content-type` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `created_at` varchar(25) DEFAULT NULL,
  `updated_at` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (4,1,2,'20150309092807_34058.jpg','1492933388_108__20150309092807_34058.jpg','image/jpeg',379933,'2017-04-23T07:47:40Z','2017-04-24T08:44:50Z'),(5,1,2,'导入结果-20170407____.xls','1492933669_534__导入结果-20170407.xls','application/vnd.ms-excel',34816,'2017-04-23T07:47:48Z','2017-04-26T15:32:43Z'),(6,1,8,'学生信息导入模板.xls','1492934297_208__学生信息导入模板.xls','application/vnd.ms-excel',33280,'2017-04-23T07:58:16Z','2017-04-26T15:30:24Z'),(17,1,2,'Sleep Away.mp3','1493015300_321__Sleep_Away.mp3','audio/mp3',4842585,'2017-04-24T06:28:06Z','2017-04-24T08:44:50Z'),(37,1,2,'PreLab1.pdf','1493230151_811__PreLab1.pdf','application/pdf',123662,'2017-04-26T18:09:11Z','2017-04-27T14:46:19Z'),(38,1,2,'HW6.pdf','1493231741_224__HW6_(1).pdf','application/pdf',126022,'2017-04-26T18:35:41Z','2017-04-27T14:07:57Z'),(39,1,8,'clulster.txt','1493255743_182__clulster.txt','text/plain',1677,'2017-04-27T01:15:43Z','2017-04-27T01:15:43Z'),(40,1,8,'sitemap.xml','1493255782_74__sitemap.xml','text/xml',388,'2017-04-27T01:16:22Z','2017-04-27T01:16:23Z'),(41,1,8,'index.html','1493255792_557__index.html','text/html',19637,'2017-04-27T01:16:31Z','2017-04-27T01:16:32Z'),(42,1,2,'111.wav','1493306156_302__111.wav','audio/wav',900044,'2017-04-27T15:15:56Z','2017-04-27T15:15:56Z'),(44,1,8,'Abaqus软件安装说明_M.pdf','1493435407_223__Abaqus软件安装说明_M.pdf','application/pdf',3750807,'2017-04-29T03:09:56Z','2017-04-29T03:10:07Z'),(45,1,20,'hdImg_d3c65ba486d12947c3fff923e4d5cb8414601865327.jpg','1492935691_610__hdImg_d3c65ba486d12947c3fff923e4d5cb8414601865327.jpg','image/jpeg',15287,'2017-04-29T03:17:37Z','2017-04-29T03:17:37Z'),(46,1,21,'故乡山川.mp3','1493436383_427__故乡山川.mp3','audio/mp3',4669979,'2017-04-29T03:26:14Z','2017-04-29T03:26:23Z'),(47,1,21,'Yesterday Once More（生命因你而动听 电影主题曲） - Carpenters Gold.flac','1493436679_71__Yesterday_Once_More（生命因你而动听_电影主题曲）_-_Carpenters_Gold.flac','audio/flac',24354185,'2017-04-29T03:30:28Z','2017-04-29T03:31:19Z'),(48,1,2,'28_Apr_13-42_Grades-VR203.csv','1493454116_862__28_Apr_13-42_Grades-VR203.csv','application/vnd.ms-excel',8446,'2017-04-29T08:21:56Z','2017-04-29T08:21:56Z'),(49,1,2,'2016.5.16.450.flv','1493454184_288__2016.5.16.450.flv','application/x-flash-video',18890608,'2017-04-29T08:22:26Z','2017-04-29T08:23:04Z'),(50,1,8,'微信公众号交互流程.doc','1493537150_66__微信公众号交互流程.doc','application/msword',1241088,'2017-04-30T07:25:40Z','2017-04-30T07:25:50Z'),(51,1,8,'交大综合办公系统用户手册-公文系统(新).doc','1493537311_202__交大综合办公系统用户手册-公文系统(新).doc','application/msword',3983872,'2017-04-30T07:28:20Z','2017-04-30T07:28:31Z'),(53,1,8,'演示文稿1.pptx','1493537609_297__演示文稿1.pptx','application/vnd.openxmlformats-officedocument.presentationml.presentation',710363,'2017-04-30T07:33:28Z','2017-04-30T07:33:29Z'),(55,1,22,'先修课不满足的学生名单-20170430.xlsx','先修课不满足的学生名单-20170430.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',13537,'2017-05-01T05:48:58Z','2017-05-01T05:48:58Z'),(58,1,2,'导入结果-20170407 (2).xls','1493990118_884__导入结果-20170407_(2).xls','application/vnd.ms-excel',34816,'2017-05-05T13:15:18Z','2017-05-05T13:15:18Z');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folder`
--

DROP TABLE IF EXISTS `folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folder` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `parent_folder_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` varchar(25) DEFAULT NULL,
  `updated_at` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folder`
--

LOCK TABLES `folder` WRITE;
/*!40000 ALTER TABLE `folder` DISABLE KEYS */;
INSERT INTO `folder` VALUES (2,1,NULL,'course files','2017-04-23T07:46:08Z','2017-04-23T07:46:08Z'),(8,1,2,'测试文件夹','2017-04-23T15:27:52Z','2017-04-24T08:44:50Z'),(20,1,2,'course_image','2017-04-29T03:17:37Z','2017-04-29T03:17:37Z'),(21,1,2,'Music','2017-04-29T03:25:46Z','2017-04-29T03:25:46Z'),(22,1,2,'unfiled','2017-05-01T05:48:58Z','2017-05-01T05:48:58Z');
/*!40000 ALTER TABLE `folder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `queue`
--

DROP TABLE IF EXISTS `queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `queue` (
  `course_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queue`
--

LOCK TABLES `queue` WRITE;
/*!40000 ALTER TABLE `queue` DISABLE KEYS */;
/*!40000 ALTER TABLE `queue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `access_token` varchar(64) DEFAULT NULL,
  `refresh_token` varchar(64) DEFAULT NULL,
  `expires_in` int(11) DEFAULT NULL,
  `token_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Canvas User','KMly40tZpoK2lyCoaPN0b84JZo7kbsWfzLxOZVEaLdKfdQeeoO7OoCcWAD2dSsHI','8go7njnMecEA1yZlbNQ2r11MCEIfSkhbceVBocYTGs9OtlXhQceAAm5JK8ac7BoD',3600,'2017-05-10 16:52:50');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_course`
--

DROP TABLE IF EXISTS `user_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_course` (
  `course_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  KEY `course_id` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_course`
--

LOCK TABLES `user_course` WRITE;
/*!40000 ALTER TABLE `user_course` DISABLE KEYS */;
INSERT INTO `user_course` VALUES (1,2);
/*!40000 ALTER TABLE `user_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-11  1:41:08
