-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2019 at 04:02 AM
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
-- Database: `dbgamefest`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbgamehighscores`
--

CREATE TABLE `tbgamehighscores` (
  `HighScoreID` varchar(7) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `RecordID` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbgamehighscores`
--

INSERT INTO `tbgamehighscores` (`HighScoreID`, `Username`, `RecordID`) VALUES
('H-00001', 'gg1', 'R-00001');

-- --------------------------------------------------------

--
-- Table structure for table `tbgamequestions`
--

CREATE TABLE `tbgamequestions` (
  `QuestionID` varchar(7) NOT NULL,
  `QuestionFile` varchar(30) NOT NULL,
  `CorrectAnswer` varchar(1) NOT NULL,
  `Difficulty` varchar(10) NOT NULL,
  `QuestionMode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbgamequestions`
--

INSERT INTO `tbgamequestions` (`QuestionID`, `QuestionFile`, `CorrectAnswer`, `Difficulty`, `QuestionMode`) VALUES
('Q-00001', '1.JPG', 'B', 'Normal', 'Choice'),
('Q-00002', '2.JPG', 'C', 'Normal', 'Choice'),
('Q-00003', '3.JPG', 'C', 'Normal', 'Choice'),
('Q-00004', '4.JPG', 'C', 'Normal', 'Choice'),
('Q-00005', '5.JPG', 'B', 'Normal', 'Choice'),
('Q-00006', '6.JPG', 'B', 'Normal', 'Choice'),
('Q-00007', '7.JPG', 'C', 'Normal', 'Choice'),
('Q-00008', '8.JPG', 'C', 'Normal', 'Choice'),
('Q-00009', '9.JPG', 'C', 'Normal', 'Choice'),
('Q-00010', '10.JPG', 'B', 'Insane', 'Choice'),
('Q-00011', '11.JPG', 'C', 'Normal', 'Choice'),
('Q-00012', '12.JPG', 'A', 'Normal', 'Choice'),
('Q-00013', '13.JPG', 'D', 'Normal', 'Choice'),
('Q-00014', '14.JPG', 'C', 'Normal', 'Choice'),
('Q-00015', '15.JPG', 'B', 'Normal', 'Choice'),
('Q-00016', '16.JPG', 'A', 'Normal', 'Choice'),
('Q-00017', '17.JPG', 'D', 'Normal', 'Choice'),
('Q-00018', '18.JPG', 'C', 'Normal', 'Choice'),
('Q-00019', '19.JPG', 'C', 'Easy', 'Choice'),
('Q-00020', '20.JPG', 'A', 'Normal', 'Choice'),
('Q-00021', '21.JPG', 'B', 'Easy', 'Choice'),
('Q-00022', '22.JPG', 'A', 'Normal', 'Choice'),
('Q-00023', '23.JPG', 'D', 'Normal', 'Choice'),
('Q-00024', '24.JPG', 'B', 'Normal', 'Choice'),
('Q-00025', '25.JPG', 'A', 'Normal', 'Choice'),
('Q-00026', '26.JPG', 'C', 'Easy', 'Choice'),
('Q-00027', '27.JPG', 'D', 'Normal', 'Choice'),
('Q-00028', '28.JPG', 'C', 'Normal', 'Choice'),
('Q-00029', '29.JPG', 'A', 'Normal', 'Choice'),
('Q-00030', '30.JPG', 'D', 'Normal', 'Choice'),
('Q-00031', '31.JPG', 'C', 'Normal', 'Choice'),
('Q-00032', '32.JPG', 'B', 'Normal', 'Choice'),
('Q-00033', '33.JPG', 'A', 'Normal', 'Choice'),
('Q-00034', '34.JPG', 'D', 'Normal', 'Choice'),
('Q-00035', '35.JPG', 'B', 'Easy', 'Choice'),
('Q-00036', '36.JPG', 'B', 'Easy', 'Choice'),
('Q-00037', '37.JPG', 'D', 'Easy', 'Choice'),
('Q-00038', '38.JPG', 'D', 'Easy', 'Choice'),
('Q-00039', '39.JPG', 'C', 'Easy', 'Choice'),
('Q-00040', '40.JPG', 'A', 'Insane', 'Choice'),
('Q-00041', '41.JPG', 'C', 'Insane', 'Choice'),
('Q-00042', '42.JPG', 'D', 'Insane', 'Choice'),
('Q-00043', '43.JPG', 'B', 'Insane', 'Choice'),
('Q-00044', '44.JPG', 'D', 'Insane', 'Choice'),
('Q-00045', '45.JPG', 'B', 'Insane', 'Choice'),
('Q-00046', '46.JPG', 'A', 'Insane', 'Choice'),
('Q-00047', '47.JPG', 'A', 'Insane', 'Choice'),
('Q-00048', '48.JPG', 'B', 'Insane', 'Choice'),
('Q-00049', '49.JPG', 'B', 'Insane', 'Choice'),
('Q-00050', '50.JPG', 'A', 'Hard', 'Choice'),
('Q-00051', '51.JPG', 'D', 'Hard', 'Choice'),
('Q-00052', '52.JPG', 'B', 'Hard', 'Choice'),
('Q-00053', '53.JPG', 'B', 'Hard', 'Choice'),
('Q-00054', '54.JPG', 'C', 'Hard', 'Choice'),
('Q-00055', '55.JPG', 'D', 'Hard', 'Choice'),
('Q-00056', '56.JPG', 'C', 'Hard', 'Choice'),
('Q-00057', '57.JPG', 'B', 'Hard', 'Choice'),
('Q-00058', '58.JPG', 'B', 'Hard', 'Choice'),
('Q-00059', '59.JPG', 'B', 'Hard', 'Choice');

-- --------------------------------------------------------

--
-- Table structure for table `tbgamerecords`
--

CREATE TABLE `tbgamerecords` (
  `RecordID` varchar(7) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Score` smallint(6) UNSIGNED NOT NULL,
  `Difficulty` varchar(10) NOT NULL,
  `DateRecorded` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbgamerecords`
--

INSERT INTO `tbgamerecords` (`RecordID`, `Username`, `Score`, `Difficulty`, `DateRecorded`) VALUES
('R-00001', 'gg1', 190, 'Insane', 'Friday, October 19, 2018'),
('R-00002', 'gg1', 147, 'Easy', 'Saturday, October 20, 2018'),
('R-00003', 'gg1', 70, 'Insane', 'Thursday, December 27, 2018'),
('R-00004', 'gg1', 38, 'Normal', 'Thursday, December 27, 2018'),
('R-00005', 'gg1', 149, 'Easy', 'Thursday, December 27, 2018'),
('R-00006', 'gg1', 60, 'Insane', 'Tuesday, February 19, 2019'),
('R-00007', 'gg1', 110, 'Insane', 'Tuesday, February 26, 2019');

-- --------------------------------------------------------

--
-- Table structure for table `tbgameusers`
--

CREATE TABLE `tbgameusers` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `SchoolCodeName` varchar(10) NOT NULL DEFAULT 'None',
  `AccessType` varchar(10) NOT NULL DEFAULT 'Player',
  `ProgressNumber` tinyint(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbgameusers`
--

INSERT INTO `tbgameusers` (`Username`, `Password`, `FirstName`, `LastName`, `SchoolCodeName`, `AccessType`, `ProgressNumber`) VALUES
('Geostorm', 'geologylol', 'George William', 'Sison', 'CSNHS', 'Player', 2),
('gg1', 'gggg', 'Gg', 'G', 'G', 'Player', 4),
('MasterAdmin', 'georgemaurag', 'George William', 'Sison', 'CSNHS', 'Admin', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbgamehighscores`
--
ALTER TABLE `tbgamehighscores`
  ADD PRIMARY KEY (`HighScoreID`),
  ADD KEY `tbgamehighscores_FK` (`Username`),
  ADD KEY `tbgamehighscores_FK2` (`RecordID`);

--
-- Indexes for table `tbgamequestions`
--
ALTER TABLE `tbgamequestions`
  ADD PRIMARY KEY (`QuestionID`);

--
-- Indexes for table `tbgamerecords`
--
ALTER TABLE `tbgamerecords`
  ADD PRIMARY KEY (`RecordID`),
  ADD KEY `fk_username` (`Username`);

--
-- Indexes for table `tbgameusers`
--
ALTER TABLE `tbgameusers`
  ADD PRIMARY KEY (`Username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbgamehighscores`
--
ALTER TABLE `tbgamehighscores`
  ADD CONSTRAINT `tbgamehighscores_FK` FOREIGN KEY (`Username`) REFERENCES `tbgameusers` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbgamehighscores_FK2` FOREIGN KEY (`RecordID`) REFERENCES `tbgamerecords` (`RecordID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbgamerecords`
--
ALTER TABLE `tbgamerecords`
  ADD CONSTRAINT `fk_username` FOREIGN KEY (`Username`) REFERENCES `tbgameusers` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
