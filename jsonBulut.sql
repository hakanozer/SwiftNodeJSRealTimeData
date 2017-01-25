/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50505
 Source Host           : localhost
 Source Database       : jsonBulut

 Target Server Type    : MySQL
 Target Server Version : 50505
 File Encoding         : utf-8

 Date: 01/25/2017 15:56:16 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `kisiler`
-- ----------------------------
DROP TABLE IF EXISTS `kisiler`;
CREATE TABLE `kisiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adi` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `soyadi` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tarih` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- ----------------------------
--  Records of `kisiler`
-- ----------------------------
BEGIN;
INSERT INTO `kisiler` VALUES ('1', 'Hakan', 'ÖZER', '2017-01-23 05:14:17'), ('2', 'Ahmet', 'ÖZER', '2017-01-23 07:26:21'), ('45', 'Ali', 'Bilmem', '2017-01-25 14:51:36'), ('46', 'Serkan', 'Bilirim', '2017-01-25 14:51:45');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
