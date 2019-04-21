/*
 Navicat Premium Data Transfer

 Source Server         : localhost--1234
 Source Server Type    : MySQL
 Source Server Version : 100310
 Source Host           : localhost:3306
 Source Schema         : ums

 Target Server Type    : MySQL
 Target Server Version : 100310
 File Encoding         : 65001

 Date: 21/04/2019 07:23:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `department_id` int(2) NOT NULL,
  `department_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`department_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
