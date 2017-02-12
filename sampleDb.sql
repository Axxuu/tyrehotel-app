-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2017 at 05:17 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demodata`
--
CREATE DATABASE IF NOT EXISTS `demodata` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `demodata`;

-- --------------------------------------------------------

--
-- Table structure for table `autot`
--

DROP TABLE IF EXISTS `autot`;
CREATE TABLE `autot` (
  `id` int(11) NOT NULL,
  `koko` varchar(30) NOT NULL,
  `kunto` varchar(30) NOT NULL,
  `sijainti` varchar(30) NOT NULL,
  `reknro` varchar(30) DEFAULT NULL,
  `auto` varchar(60) DEFAULT NULL,
  `tyyppi` varchar(40) NOT NULL,
  `maara` varchar(11) NOT NULL,
  `pultit` varchar(30) DEFAULT NULL,
  `lisatiedot` varchar(120) DEFAULT NULL,
  `hylly` varchar(30) DEFAULT NULL,
  `muokkaaja` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `autot`
--

INSERT INTO `autot` (`id`, `koko`, `kunto`, `sijainti`, `reknro`, `auto`, `tyyppi`, `maara`, `pultit`, `lisatiedot`, `hylly`, `muokkaaja`) VALUES
(4, '215/55R16', 'Uudenveroinen', 'Mikkeli, Hotelli', 'MMG-141', 'Skoda Felicia', 'Kesärenkaat, alumiinivanteilla', '4', 'Ei tiedossa', NULL, 'B', 'Sample User'),
(5, '245/65R18', 'Hyvä', 'Mikkeli, Hotelli', 'TES-71', 'Nissan Patrol', 'Kesärenkaat, irto', '4', '', '', 'A', 'Sample User'),
(10, '165/60R14', 'Tyydyttävä', 'Renkaat auton kyydissä', 'FFG-332', 'Citroen Saxo', 'Kesärenkaat, peltivanteilla', '4', 'Autossa', NULL, '', 'Sample User'),
(11, '195/55R15', 'Uudenveroinen', 'Mikkeli, Hotelli', 'RTG-133', 'Ford Fiesta', 'Kesärenkaat, irto', '4', NULL, 'Hyvät misukat', 'F', 'Sample User'),
(12, '205/55R15', 'Tyydyttävä', 'Mikkeli, Fiksaamo', 'RRT-988', 'Ford Sierra', 'Kesärenkaat, alumiinivanteilla', '4', 'Autossa', 'Hienot alut', NULL, 'Sample User'),
(13, '225/45R17', 'Ajokelvoton', 'Savonlinna, Hotelli', 'OOY-455', 'Fiat Punto', 'Kesärenkaat, alumiinivanteilla', '4', 'Ei tiedossa', 'Laittomat renkaat, pintaa alle sallitun', 'D', 'Sample User'),
(14, '215/40R18', 'Hyvä', 'Savonlinna, Hotelli', 'EET-367', 'Seat Leon', 'Kesärenkaat, alumiinivanteilla', '4', 'Samat kesä / talvi', 'Alkuperäiset alut', 'A', 'Sample User');

-- --------------------------------------------------------

--
-- Table structure for table `kayttajat`
--

DROP TABLE IF EXISTS `kayttajat`;
CREATE TABLE `kayttajat` (
  `id` int(11) NOT NULL,
  `tunnus` varchar(11) NOT NULL,
  `nimi` varchar(60) NOT NULL,
  `salasana` varchar(62) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kayttajat`
--

INSERT INTO `kayttajat` (`id`, `tunnus`, `nimi`, `salasana`) VALUES
(1, 'user', 'Sample User', 'sha1$c3fb18af$1$ab65f369a5cbe2ae6580012dc4068449d5caa61c');

-- --------------------------------------------------------

--
-- Table structure for table `luovutetut`
--

DROP TABLE IF EXISTS `luovutetut`;
CREATE TABLE `luovutetut` (
  `id` int(11) NOT NULL,
  `koko` varchar(30) NOT NULL,
  `kunto` varchar(30) NOT NULL,
  `sijainti` varchar(30) NOT NULL,
  `reknro` varchar(30) DEFAULT NULL,
  `auto` varchar(60) DEFAULT NULL,
  `tyyppi` varchar(40) NOT NULL,
  `maara` varchar(11) NOT NULL,
  `pultit` varchar(30) DEFAULT NULL,
  `lisatiedot` varchar(120) DEFAULT NULL,
  `hylly` varchar(30) DEFAULT NULL,
  `muokkaaja` varchar(30) NOT NULL,
  `pvm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `luovutetut`
--

INSERT INTO `luovutetut` (`id`, `koko`, `kunto`, `sijainti`, `reknro`, `auto`, `tyyppi`, `maara`, `pultit`, `lisatiedot`, `hylly`, `muokkaaja`, `pvm`) VALUES
(1, '195/65R15', 'Uudenveroinen', 'Mikkeli, Hotelli', 'TES-71', 'VW Golf', 'Kesärenkaat, irto', '4', '', '', '', 'Sample User', '2017-02-08 09:27:34'),
(2, '205/50R17', 'Käyttämätön', 'Savonlinna, Hotelli', 'KOE-744', 'Toyota Corolla', 'Kesärenkaat, alumiinivanteilla', '4', 'Samat kesä / talvi', 'Uudet vanteet ja kumit!', '', 'Sample User', '2017-02-09 10:17:30');

-- --------------------------------------------------------

--
-- Table structure for table `vapaat`
--

DROP TABLE IF EXISTS `vapaat`;
CREATE TABLE `vapaat` (
  `id` int(11) NOT NULL,
  `koko` varchar(30) NOT NULL,
  `kunto` varchar(30) NOT NULL,
  `sijainti` varchar(30) NOT NULL,
  `reknro` varchar(30) DEFAULT NULL,
  `auto` varchar(60) DEFAULT NULL,
  `tyyppi` varchar(40) NOT NULL,
  `maara` varchar(11) NOT NULL,
  `pultit` varchar(30) DEFAULT NULL,
  `lisatiedot` varchar(120) DEFAULT NULL,
  `hylly` varchar(30) DEFAULT NULL,
  `muokkaaja` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vapaat`
--

INSERT INTO `vapaat` (`id`, `koko`, `kunto`, `sijainti`, `reknro`, `auto`, `tyyppi`, `maara`, `pultit`, `lisatiedot`, `hylly`, `muokkaaja`) VALUES
(1, '195/65R15', 'Tyydyttävä', 'Savonlinna, Hotelli', NULL, NULL, 'Kesärenkaat, irto', '2', NULL, 'Michelin, 4mm pintaa', '', 'Sample User'),
(3, '205/55R16', 'Uudenveroinen', 'Mikkeli, Hotelli', NULL, NULL, 'Kitkarenkaat, irto', '2', NULL, NULL, 'E', 'Sample User'),
(4, '155/35R14', 'Uudenveroinen', 'Mikkeli, Hotelli', NULL, 'Nissan Primera', 'Nastarenkaat, alumiinivanteilla', '4', 'Ei tiedossa', 'Jääneet ylimääräiseksi', 'A', 'Sample User'),
(10, '195/75R15', 'Huono', 'Mikkeli, Hotelli', NULL, 'Toyota Hiace', 'Kesärenkaat, peltivanteilla', '4', 'Ei tiedossa', 'Ruosteiset vanteet. Renkaissa pintaa, mutta valmistettu -05', 'D', 'Sample User'),
(11, '195/55R15', 'Uudenveroinen', 'Mikkeli, Hotelli', NULL, NULL, 'Kesärenkaat, irto', '2', NULL, 'Hyvät Bridgestonet', 'D', 'Sample User'),
(12, '215/45R17', 'Hyvä', 'Savonlinna, Hotelli', '', NULL, 'Nastarenkaat, irto', '2', NULL, 'Nastat tallella ja pintaa on', 'E', 'Sample User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autot`
--
ALTER TABLE `autot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kayttajat`
--
ALTER TABLE `kayttajat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `luovutetut`
--
ALTER TABLE `luovutetut`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vapaat`
--
ALTER TABLE `vapaat`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autot`
--
ALTER TABLE `autot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `kayttajat`
--
ALTER TABLE `kayttajat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `luovutetut`
--
ALTER TABLE `luovutetut`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `vapaat`
--
ALTER TABLE `vapaat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
