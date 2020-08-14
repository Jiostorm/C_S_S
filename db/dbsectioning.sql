-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2018 at 05:17 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbsectioning`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbadviser`
--

CREATE TABLE `tbadviser` (
  `Adviser_ID` varchar(50) NOT NULL,
  `Adviser_FN` varchar(100) NOT NULL,
  `Adviser_LN` varchar(100) NOT NULL,
  `Adviser_MI` varchar(100) NOT NULL,
  `Adviser_Gender` varchar(10) NOT NULL,
  `Specialization_ID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbadviser`
--

INSERT INTO `tbadviser` (`Adviser_ID`, `Adviser_FN`, `Adviser_LN`, `Adviser_MI`, `Adviser_Gender`, `Specialization_ID`) VALUES
('A-0001', 'Emmerson', 'Dumlao', 'C.', 'Male', 'S-001'),
('A-0002', 'Marvin', 'Marquez', 'A.', 'Male', 'S-001');

-- --------------------------------------------------------

--
-- Table structure for table `tbassigned`
--

CREATE TABLE `tbassigned` (
  `Assigned_ID` varchar(15) NOT NULL,
  `Student_LRN` varchar(100) NOT NULL,
  `Section_Name` varchar(100) NOT NULL,
  `School_Year` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblogs`
--

CREATE TABLE `tblogs` (
  `Username` varchar(100) NOT NULL,
  `Time_In` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbroom`
--

CREATE TABLE `tbroom` (
  `Room_No` varchar(50) NOT NULL,
  `Building_Name` varchar(50) NOT NULL,
  `Floor` int(11) NOT NULL,
  `Location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbroom`
--

INSERT INTO `tbroom` (`Room_No`, `Building_Name`, `Floor`, `Location`) VALUES
('7 - 14', 'Arts and Design', 2, 'Left of Student Pavilion'),
('7 - 15', 'Arts and Design', 2, 'Left of Student Pavilion');

-- --------------------------------------------------------

--
-- Table structure for table `tbsection`
--

CREATE TABLE `tbsection` (
  `Section_Name` varchar(100) NOT NULL,
  `Adviser_ID` varchar(50) NOT NULL,
  `Specialization_ID` varchar(50) NOT NULL,
  `Room_No` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbsection`
--

INSERT INTO `tbsection` (`Section_Name`, `Adviser_ID`, `Specialization_ID`, `Room_No`) VALUES
('12 - PROGRAMMING - 1', 'A-0001', 'S-001', '7 - 14');

-- --------------------------------------------------------

--
-- Table structure for table `tbsignup`
--

CREATE TABLE `tbsignup` (
  `Username` varchar(100) NOT NULL,
  `Email_Address` varchar(100) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbspecialization`
--

CREATE TABLE `tbspecialization` (
  `Specialization_ID` varchar(100) NOT NULL,
  `Track_Name` varchar(50) NOT NULL,
  `Strand_Name` varchar(50) NOT NULL,
  `Specialization_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbspecialization`
--

INSERT INTO `tbspecialization` (`Specialization_ID`, `Track_Name`, `Strand_Name`, `Specialization_Name`) VALUES
('S-001', 'TVL', 'ICT', 'PROGRAMMING'),
('S-002', 'TVL', 'ICT', 'CSS'),
('S-003', 'TVL', 'ICT', 'ELECTRONICS');

-- --------------------------------------------------------

--
-- Table structure for table `tbstudents_info`
--

CREATE TABLE `tbstudents_info` (
  `Student_LRN` varchar(12) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Middle_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Age` int(11) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Barangay` varchar(100) NOT NULL,
  `Municipality` varchar(100) NOT NULL,
  `Province` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbstudents_info`
--

INSERT INTO `tbstudents_info` (`Student_LRN`, `First_Name`, `Middle_Name`, `Last_Name`, `Age`, `Gender`, `Barangay`, `Municipality`, `Province`) VALUES
('112506060084', 'George William', 'Morales', 'Sison', 17, 'Male', 'Dinaga', 'Canaman', 'Camarines Sur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbadviser`
--
ALTER TABLE `tbadviser`
  ADD PRIMARY KEY (`Adviser_ID`),
  ADD KEY `FK_SPECIALIZATION2` (`Specialization_ID`);

--
-- Indexes for table `tbassigned`
--
ALTER TABLE `tbassigned`
  ADD PRIMARY KEY (`Assigned_ID`),
  ADD KEY `FK_STUDENT_ASSIGN` (`Student_LRN`),
  ADD KEY `FK_SECTION_ASSIGN` (`Section_Name`);

--
-- Indexes for table `tblogs`
--
ALTER TABLE `tblogs`
  ADD PRIMARY KEY (`Username`);

--
-- Indexes for table `tbroom`
--
ALTER TABLE `tbroom`
  ADD PRIMARY KEY (`Room_No`);

--
-- Indexes for table `tbsection`
--
ALTER TABLE `tbsection`
  ADD PRIMARY KEY (`Section_Name`),
  ADD KEY `FK_SECTION` (`Adviser_ID`),
  ADD KEY `FK_ROOM` (`Room_No`),
  ADD KEY `FK_SPECIALIZATION` (`Specialization_ID`);

--
-- Indexes for table `tbsignup`
--
ALTER TABLE `tbsignup`
  ADD PRIMARY KEY (`Username`);

--
-- Indexes for table `tbspecialization`
--
ALTER TABLE `tbspecialization`
  ADD PRIMARY KEY (`Specialization_ID`);

--
-- Indexes for table `tbstudents_info`
--
ALTER TABLE `tbstudents_info`
  ADD PRIMARY KEY (`Student_LRN`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbadviser`
--
ALTER TABLE `tbadviser`
  ADD CONSTRAINT `FK_SPECIALIZATION2` FOREIGN KEY (`Specialization_ID`) REFERENCES `tbspecialization` (`Specialization_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbassigned`
--
ALTER TABLE `tbassigned`
  ADD CONSTRAINT `FK_SECTION_ASSIGN` FOREIGN KEY (`Section_Name`) REFERENCES `tbsection` (`Section_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_STUDENT_ASSIGN` FOREIGN KEY (`Student_LRN`) REFERENCES `tbstudents_info` (`Student_LRN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbsection`
--
ALTER TABLE `tbsection`
  ADD CONSTRAINT `FK_ROOM` FOREIGN KEY (`Room_No`) REFERENCES `tbroom` (`Room_No`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_SECTION` FOREIGN KEY (`Adviser_ID`) REFERENCES `tbadviser` (`Adviser_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_SPECIALIZATION` FOREIGN KEY (`Specialization_ID`) REFERENCES `tbspecialization` (`Specialization_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
