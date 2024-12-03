-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2024 at 03:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ojt_exercise`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `suffix_name` varchar(255) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `birthday` date NOT NULL,
  `contact` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Project Manager','Assistant Manager','Software Developer','Human Resources','Secretary','UI/UX Design','Junior Staffer','Trainee') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `last_name`, `first_name`, `middle_name`, `suffix_name`, `sex`, `birthday`, `contact`, `email`, `role`) VALUES
(1, 'Marbrid', 'Hvaryy', '', '', 'Male', '1995-10-11', '9123-231-231', 'hvaryy@gmail.com', 'Trainee'),
(2, 'Lonton', 'Grandcrown', '', '', 'Male', '1995-10-11', '9123-231-231', 'hvaryy@gmail.com', 'Human Resources'),
(3, 'Lakad', 'James', 'Matatag', 'Sr.', 'Male', '1998-10-22', '9123-231-231', 'jameslakadmatatag@gmail.com', 'Assistant Manager'),
(4, 'James', 'Moriarty', '', '', 'Male', '1995-10-11', '9123-231-231', 'james@gmail.com', 'Trainee'),
(6, 'Thomas', 'Patricia', '', '', 'Female', '1995-10-11', '9123-231-231', 'patriciathomas@gmail.com', 'Software Developer'),
(8, 'Lonton', 'Hvaryy', '', '', 'Male', '1995-10-11', '9123-231-231', 'hvaryy@gmail.com', 'Software Developer'),
(9, 'Jackal', 'Hvaryy', '', '', 'Male', '1995-10-11', '9123-231-231', 'jackal@gmail.com', 'Trainee'),
(13, 'Lonton', 'Hvaryy', '', '', 'Male', '1995-10-11', '9123-231-231', 'hvaryy@gmail.com', 'Software Developer'),
(15, 'Karlson', 'Maverick', '', '', 'Male', '1995-10-11', '9123-231-231', 'karlson@gmail.com', 'Human Resources'),
(16, 'Lonton', 'Hvaryy', '', '', 'Male', '1995-10-11', '9123-231-231', 'hvaryy@gmail.com', 'Software Developer'),
(24, 'Maclaren', 'Clarence', 'Dias', '', 'Male', '2024-08-08', '1316-612-313', 'clarence@gmail.com', 'Project Manager'),
(25, 'Wilson', 'Jennifer', '', '', 'Female', '2001-07-24', '6543-100-645', 'jenniferwilson@gmail.com', 'Project Manager'),
(26, 'Thomas', 'Patricia', '', '', 'Female', '2024-08-13', '9843-218-545', 'patriciathomas@gmail.com', 'Human Resources'),
(27, 'Sung', 'Jinwoo', '', '', 'Male', '1991-07-11', '8932-189-435', 'hishim@gmail.com', 'Project Manager'),
(28, 'Houston', 'Jimmy', 'Maschevis', 'Sr.', 'Male', '2000-08-23', '9723-192-132', 'jimmyhouston@gmail.com', 'UI/UX Design');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
