-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2020 a las 07:31:56
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tallao`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `custommessages`
--

CREATE TABLE `custommessages` (
  `laundryInitials` varchar(6) NOT NULL,
  `id` varchar(50) NOT NULL COMMENT 'id of the message',
  `colorTag` varchar(50) NOT NULL COMMENT 'Specifies the background color of the tag',
  `tag` text NOT NULL,
  `message` text NOT NULL,
  `status` text NOT NULL COMMENT 'Shows if it''s removable or not.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Will store all the custom fast messages that superuser need';

--
-- Volcado de datos para la tabla `custommessages`
--

INSERT INTO `custommessages` (`laundryInitials`, `id`, `colorTag`, `tag`, `message`, `status`) VALUES
('CAMINO', '5f4dc2ae652782.47745756', 'white', 'Sin pliegue / 不折', 'Sin pliegue / 不折', 'blocked'),
('CAMINO', '5f4dc4a302d749.04409433', 'white', 'Sin pliegue / 不折', 'Sin pliegue / 不折', 'blocked'),
('CAMINO', '5f4dc4e2908fd4.16462744', 'white', 'Sin pliegue / 不折', 'Sin pliegue / 不折', 'blocked'),
('CRUC2', 'CRUC21', 'white', 'Sin pliegue / 不折', 'Sin pliegue', 'blocked'),
('DADAI', '5f4dc214b98a53.05316358', 'white', 'Sin pliegue / 不折', 'Sin pliegue / 不折', 'blocked'),
('DADAI', '5f4dc214b99154.85907104', 'white', 'Sin pliegue / 不折', 'Sin pliegue / 不折', 'blocked'),
('VICAT', 'VICAT1', 'white', 'Sin pliegue / 不折', 'Sin pliegue', 'blocked'),
('VICNT', '6p77y0c4wtn', '#7a3c8b', 'Planchar la basta', 'Planchar la basta del pantalón', ''),
('VICNT', 'VICNT2', '#5bc2bc', 'Sin pliegue', 'Sin pliegue', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lastorderid`
--

CREATE TABLE `lastorderid` (
  `laundryInitials` varchar(6) NOT NULL,
  `idChar` varchar(50) NOT NULL,
  `idNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores the last ids of orders.';

--
-- Volcado de datos para la tabla `lastorderid`
--

INSERT INTO `lastorderid` (`laundryInitials`, `idChar`, `idNumber`) VALUES
('CAMINO', 'A', 0),
('VICNT', 'A', 787);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laundries`
--

CREATE TABLE `laundries` (
  `initials` varchar(6) NOT NULL,
  `hashcode` varchar(70) NOT NULL,
  `name` text NOT NULL,
  `location` text NOT NULL,
  `schedule` text NOT NULL,
  `serviceOffer` text NOT NULL,
  `legalReprName` text NOT NULL,
  `legalReprSurname` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `laundries`
--

INSERT INTO `laundries` (`initials`, `hashcode`, `name`, `location`, `schedule`, `serviceOffer`, `legalReprName`, `legalReprSurname`, `email`, `password`) VALUES
('', 'TeTWbE9JXz9vM8UzErAl', 'Lavandería Los Caobos', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Yeyo ', 'Clack ', 'yeyo@clack.com', '$2y$12$1.XD0YNu3OePr4p5E2Zrq.ZRq9MVtYXsbOePlcdHfrKm/dod0223S'),
('CAMINO', '5x32cnvpoDLgpJ2Gf422', 'Lavandería Los Caminos', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Robert ', 'Zheng ', 'robert.lu@utp.ac.pa', '$2y$12$uowM/Bc82PpsXABeZyxyeOdgatxb2CnoNtdj36rOTbJwhRAk2txCK'),
('CRUC2', 'boPiwN5TrarZWYO0w80j', 'Lavandería El Cruce #2312', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Yeyo ', 'Fren ', 'yeyo@fren.com', '$2y$12$C3fNiM1.bVGF5e.qs5TBgunNZuG.31rUJfA636XqKlOYBpLHHgBA2'),
('VICAT', 'XyLc6PHXgAREDy9FZtQ7', 'Lavandería Vicente #2', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Robert ', 'Lu Zheng ', 'robert_lu20@hotmail.com', '$2y$12$duBXbwmPwP87cWTQpjAXDeA3ioqmjSS9vshKoIlJYN4ghwNuhHx.i'),
('VICNT', '8XMqSGzajxRRQiyLZj8m', 'Lavandería Vicente', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '{\"monday\":{\"startHour\":\"08:04\",\"endHour\":\"19:04\"},\"tuesday\":{\"startHour\":\"08:00\",\"endHour\":\"03:04\"},\"wednesday\":{\"startHour\":\"05:04\",\"endHour\":\"00:09\"},\"thursday\":{\"startHour\":\"05:04\",\"endHour\":\"00:08\"},\"friday\":{\"startHour\":\"03:04\",\"endHour\":\"00:07\"},\"saturday\":{\"startHour\":\"05:07\",\"endHour\":\"00:09\"},\"sunday\":{\"startHour\":\"00:06\",\"endHour\":\"12:06\"}}', 'iron,wash,dryClean,washIron', 'Robert ', 'Lu Zheng ', 'wardinpro123@gmail.com', '$2y$12$QsUBHnXI2fXVpHS3/Bg7dOvaSeBSb7kEnD3RHtR/zfpsz2QCdsaS.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `laundryInitials` varchar(6) NOT NULL,
  `customerID` text NOT NULL,
  `customerName` text NOT NULL,
  `idChar` varchar(50) NOT NULL,
  `idNumber` int(11) NOT NULL,
  `status` text NOT NULL COMMENT 'Show the state of the order',
  `elementsDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`elementsDetails`)),
  `hookQuantity` int(11) NOT NULL,
  `dateReceive` datetime NOT NULL COMMENT 'Format: Y-M-D 24h',
  `dateAssign` datetime NOT NULL COMMENT 'Format: Y-M-D 24h',
  `totalPrice` text NOT NULL,
  `indications` text NOT NULL COMMENT 'Text in which the user specifies some specific order to be done.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores the orders data';

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`laundryInitials`, `customerID`, `customerName`, `idChar`, `idNumber`, `status`, `elementsDetails`, `hookQuantity`, `dateReceive`, `dateAssign`, `totalPrice`, `indications`) VALUES
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 162, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 163, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 164, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 165, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 166, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 167, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 168, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 169, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 170, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 171, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 172, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 173, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 174, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 175, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 176, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 177, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 178, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 179, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 180, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 181, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 182, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 183, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 184, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 185, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 186, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 187, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 188, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 189, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 190, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 191, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 192, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 193, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 194, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 195, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 196, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 197, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 198, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 199, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 200, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 201, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 202, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 203, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 204, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 205, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 206, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 207, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 208, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 209, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 210, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 211, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 212, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 213, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 214, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 215, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 216, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 217, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 218, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 219, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 220, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 221, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 222, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 223, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 224, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 225, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 226, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 227, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 228, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 229, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 230, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 231, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 232, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 233, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 234, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 235, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 236, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 237, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 238, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 239, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 240, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 241, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 242, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 243, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 244, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 245, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 246, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 247, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 248, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 249, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 250, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 251, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 252, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 253, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 254, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 255, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 256, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 257, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 258, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 259, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 260, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 261, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 262, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 263, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 264, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 265, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 266, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 267, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 268, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 269, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 270, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 271, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 272, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 273, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 274, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 275, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 276, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 277, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 278, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 279, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 280, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 281, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 282, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 283, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 284, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 285, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 286, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 287, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 288, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 289, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 290, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 291, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 292, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 293, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 294, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 295, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 296, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 297, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 298, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 299, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 300, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 301, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 302, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 303, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 304, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 305, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 306, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 307, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 308, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 309, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 310, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 311, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 312, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 313, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 314, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 315, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 316, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 317, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 318, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 319, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 320, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 321, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 322, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 323, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 324, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 325, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 326, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 327, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 328, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 329, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 330, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 331, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 332, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 333, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 334, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 335, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 336, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 337, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 338, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 339, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 340, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 341, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 342, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 343, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 344, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 345, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 346, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 347, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 348, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 349, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 350, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 351, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 352, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 353, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 354, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 355, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 356, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 357, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 358, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 359, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 360, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 361, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 362, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 363, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 364, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 365, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 366, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 367, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 368, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 369, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 370, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue');
INSERT INTO `orders` (`laundryInitials`, `customerID`, `customerName`, `idChar`, `idNumber`, `status`, `elementsDetails`, `hookQuantity`, `dateReceive`, `dateAssign`, `totalPrice`, `indications`) VALUES
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 371, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 372, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 373, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 374, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 375, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 376, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 377, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 378, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 379, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 380, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 381, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 382, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 383, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 384, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 385, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 386, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 387, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 388, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 389, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 390, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 391, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 392, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 393, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 394, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 395, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 396, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 397, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 398, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 399, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 400, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 401, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 402, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 403, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 404, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 405, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 406, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 407, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 408, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 409, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 410, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 411, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 412, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 413, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 414, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 415, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 416, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 417, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 418, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 419, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 420, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 421, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 422, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 423, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 424, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 425, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 426, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 427, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 428, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 429, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 430, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 431, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 432, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 433, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 434, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 435, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 436, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 437, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 438, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 439, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 440, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 441, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 442, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 443, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 444, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 445, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 446, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 447, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 448, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 449, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 450, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 451, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 452, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 453, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 454, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 455, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 456, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 457, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 458, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 459, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 460, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 461, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 462, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 463, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 464, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 465, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 466, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 467, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 468, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 469, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 470, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 471, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 472, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 473, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 474, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 475, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 476, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 477, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 478, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 479, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 480, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 481, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 482, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 483, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 484, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 485, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 486, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 487, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 488, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 489, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 490, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 491, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 492, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 493, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 494, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 495, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 496, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 497, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 498, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 499, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 500, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 501, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 502, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 503, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 504, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 505, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 506, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 507, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 508, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 509, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 510, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 511, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 512, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 513, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 514, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 515, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 516, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 517, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 518, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 519, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 520, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 521, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 522, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 523, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 524, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 525, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 526, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 527, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 528, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 529, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 530, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 531, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 532, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 533, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 534, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 535, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 536, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 537, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 538, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 539, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 540, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 541, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 542, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 543, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 544, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 545, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 546, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 547, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 548, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 549, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 550, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 551, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 552, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 553, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 554, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 555, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 556, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 557, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 558, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 559, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 560, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 561, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 562, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 563, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 564, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 565, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 566, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 567, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 568, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 569, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 570, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 571, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 572, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 573, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 574, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 575, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 576, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 577, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 578, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 579, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue');
INSERT INTO `orders` (`laundryInitials`, `customerID`, `customerName`, `idChar`, `idNumber`, `status`, `elementsDetails`, `hookQuantity`, `dateReceive`, `dateAssign`, `totalPrice`, `indications`) VALUES
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 580, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 581, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 582, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 583, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 584, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 585, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 586, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 587, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 588, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 589, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 590, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 591, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 592, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 593, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 594, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 595, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 596, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 597, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 598, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 599, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 600, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 601, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 602, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 603, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 604, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 605, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 606, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 607, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 608, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 609, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 610, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 611, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 612, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 613, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 614, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 615, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 616, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 617, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 618, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 619, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 620, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 621, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 622, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 623, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 624, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 625, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 626, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 627, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 628, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 629, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 630, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 631, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 632, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 633, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 634, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 635, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 636, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 637, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 638, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 639, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 640, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 641, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 642, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 643, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 644, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 645, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 646, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 647, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 648, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 649, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 650, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 651, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 652, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 653, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 654, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 655, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 656, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 657, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 658, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 659, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 660, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 661, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":4,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":4,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 662, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-08-17 20:51:00', '2020-08-21 21:54:00', '3.35', ' Sin pliegue'),
('VICNT', '', '', 'A', 663, 'wait', '{\"pants\":{\"iron\":{\"quantity\":2,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":2,\"price\":0.65}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"overall\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 7, '2020-08-17 20:52:00', '2020-08-21 21:56:00', '5.2', ' Sin pliegue'),
('VICNT', '', '', 'A', 664, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":2,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 4, '2020-08-17 20:59:00', '2020-08-21 21:01:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 665, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:07:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 666, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:08:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 667, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:09:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 668, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:10:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 669, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:13:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 670, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:13:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 671, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:18:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 672, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:19:00', '0000-00-00 00:00:00', '1', '1'),
('VICNT', '', '', 'A', 673, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:21:00', '2020-08-20 22:25:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 674, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:22:00', '2020-08-20 22:25:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 675, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:32:00', '2020-08-19 22:27:00', '1.3', ''),
('VICNT', '', '', 'A', 676, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:43:00', '2020-08-22 22:45:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 677, 'wait', '{}', 0, '2020-08-17 21:43:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 678, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 21:46:00', '2020-08-20 22:49:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 679, 'wait', '{}', 0, '2020-08-17 21:48:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 680, 'wait', '{}', 0, '2020-08-17 21:48:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 681, 'wait', '{}', 0, '2020-08-17 21:48:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 682, 'wait', '{}', 0, '2020-08-17 21:48:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 683, 'wait', '{}', 0, '2020-08-17 21:49:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 684, 'wait', '{}', 0, '2020-08-17 21:49:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 685, 'wait', '{}', 0, '2020-08-17 21:49:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 686, 'wait', '{}', 0, '2020-08-17 21:50:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 687, 'wait', '{}', 0, '2020-08-17 21:50:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 688, 'wait', '{}', 0, '2020-08-17 21:50:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 689, 'wait', '{}', 0, '2020-08-17 21:52:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 690, 'wait', '{}', 0, '2020-08-17 21:56:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 691, 'wait', '{}', 0, '2020-08-17 21:58:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 692, 'wait', '{}', 0, '2020-08-17 21:59:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 693, 'wait', '{}', 0, '2020-08-17 21:59:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 694, 'wait', '{}', 0, '2020-08-17 22:00:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 695, 'wait', '{}', 0, '2020-08-17 22:01:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 696, 'wait', '{}', 0, '2020-08-17 22:01:00', '0000-00-00 00:00:00', '0', ''),
('VICNT', '', '', 'A', 697, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:03:00', '2020-08-20 23:07:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 698, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:06:00', '2020-08-21 23:08:00', '1.3', ''),
('VICNT', '', '', 'A', 699, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:06:00', '2020-08-21 23:09:00', '1.3', ''),
('VICNT', '', '', 'A', 700, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:08:00', '2020-08-21 23:11:00', '1.3', ''),
('VICNT', '', '', 'A', 701, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:09:00', '2020-08-22 23:11:00', '1.3', ''),
('VICNT', '', '', 'A', 702, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:10:00', '2020-08-21 23:14:00', '1.3', ''),
('VICNT', '', '', 'A', 703, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:10:00', '2020-08-21 23:13:00', '1.3', ''),
('VICNT', '', '', 'A', 704, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:10:00', '2020-08-21 23:14:00', '1.3', ''),
('VICNT', '', '', 'A', 705, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:12:00', '2020-08-19 23:15:00', '1.3', ''),
('VICNT', '', '', 'A', 706, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:13:00', '2020-08-29 23:16:00', '1.3', ''),
('VICNT', '', '', 'A', 707, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:15:00', '2020-08-29 23:16:00', '1.3', ''),
('VICNT', '', '', 'A', 708, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:15:00', '2020-08-21 23:18:00', '1.3', ''),
('VICNT', '', '', 'A', 709, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:15:00', '2020-08-21 23:18:00', '1.3', ''),
('VICNT', '', '', 'A', 710, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-17 22:21:00', '2020-08-22 23:24:00', '1.3', ''),
('VICNT', '', '', 'A', 711, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-18 21:55:00', '2020-08-22 22:59:00', '1.3', ''),
('VICNT', '', '', 'A', 712, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-18 22:04:00', '2020-08-22 23:07:00', '1.3', ''),
('VICNT', '', '', 'A', 713, 'wait', '{\"pleatedSkirt\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"overall\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 2, '2020-08-20 21:58:00', '2020-08-21 13:59:00', '2.6', ''),
('VICNT', '', '', 'A', 714, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-12 00:01:00', '2020-09-12 01:04:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 715, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-12 00:01:00', '2020-09-12 01:04:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 716, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-12 00:01:00', '2020-09-12 01:04:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 718, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-15 14:56:00', '2020-09-15 00:00:00', '2.6', ''),
('VICNT', '', '', 'A', 719, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-15 14:56:00', '2020-09-16 00:00:00', '2.6', ''),
('VICNT', '', '', 'A', 720, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-18 23:27:00', '2020-09-18 00:00:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 721, 'processing', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pleatedSkirt\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"overall\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"quilt\":{\"iron\":{\"quantity\":1,\"price\":8}}}', 7, '2020-09-19 21:27:00', '2020-09-19 22:26:00', '13.85', ' Sin pliegue'),
('VICNT', '', '', 'A', 723, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-20 00:04:00', '2020-09-20 13:08:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 724, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-21 21:39:00', '2020-09-21 10:39:00', '2.6', ''),
('VICNT', '', '', 'A', 725, 'processing', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-21 21:39:00', '2020-09-21 10:43:00', '2.6', ''),
('VICNT', '', '', 'A', 726, 'processing', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-21 21:39:00', '2020-09-21 14:43:00', '2.6', ''),
('VICNT', '', '', 'A', 727, 'ready', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-21 21:39:00', '2020-09-21 19:48:00', '2.6', ''),
('VICNT', '', '', 'A', 728, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-22 22:31:00', '2020-09-22 23:29:00', '1.95', ' Sin pliegue, Camisa bien plancha'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 729, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"pleatedSkirt\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-25 21:46:00', '2020-09-25 22:49:00', '3.25', ' Sin pliegue'),
('VICNT', '', '', 'A', 730, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"pleatedSkirt\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-25 21:46:00', '2020-09-25 22:49:00', '3.25', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 731, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-26 00:08:00', '2020-09-26 13:11:00', '1.3', ' Sin pliegue'),
('VICNT', 'XKN78', 'Robert Lu Zheng', 'A', 732, 'ready', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65},\"wash\":{\"quantity\":1,\"price\":1}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-26 00:24:00', '2020-09-26 00:38:00', '2.95', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 733, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-26 20:54:00', '2020-09-26 21:57:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 734, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-26 21:03:00', '2020-09-26 22:09:00', '1.95', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 735, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-26 21:07:00', '2020-09-26 23:16:00', '1.95', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 736, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-27 00:01:00', '2020-09-27 13:06:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 737, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-27 21:41:00', '2020-09-28 22:44:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 738, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-27 22:00:00', '2020-09-27 23:03:00', '1.3', ''),
('VICNT', '', '', 'A', 739, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 2, '2020-09-27 22:01:00', '2020-09-27 23:04:00', '1.95', ' Sin pliegue'),
('VICNT', '', '', 'A', 740, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-27 22:04:00', '2020-09-27 23:08:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 741, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 2, '2020-09-27 22:07:00', '2020-09-27 23:09:00', '1.95', ' Sin pliegue'),
('VICNT', '', '', 'A', 742, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-27 22:09:00', '2020-09-27 23:12:00', '1.3', ''),
('VICNT', '', '', 'A', 743, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-27 22:10:00', '2020-09-27 23:13:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 744, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-27 22:11:00', '2020-09-27 23:15:00', '1.95', ' Sin pliegue Sin pliegue Sin pliegue Sin pliegue'),
('VICNT', '', '', 'A', 745, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-27 22:18:00', '2020-09-27 23:21:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 746, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-27 22:19:00', '2020-09-27 23:22:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 747, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:52:00', '2020-09-28 22:56:00', '1.95', ' Sin pliegue Sin pliegue'),
('VICNT', '', '', 'A', 748, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:54:00', '2020-09-28 22:57:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 749, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 0, '2020-09-28 21:54:00', '2020-09-28 13:54:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 750, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:55:00', '2020-09-28 22:59:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 751, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:56:00', '2020-09-28 22:00:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 752, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:57:00', '2020-09-28 22:00:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 753, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:58:00', '2020-09-28 22:01:00', '0.65', ' Sin pliegue'),
('VICNT', '', '', 'A', 754, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:58:00', '2020-09-28 22:02:00', '1.3', ''),
('VICNT', '', '', 'A', 755, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 21:59:00', '2020-09-28 22:03:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 756, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 0, '2020-09-28 22:04:00', '2020-09-28 23:08:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 757, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pleatedSkirt\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 0, '2020-09-28 22:16:00', '2020-09-28 23:19:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 758, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-09-28 22:26:00', '2020-10-01 23:30:00', '2.6', ''),
('VICNT', '', '', 'A', 759, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"sweater\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pleatedSkirt\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 3, '2020-09-28 22:28:00', '2020-09-28 23:31:00', '2.6', ' Sin pliegue'),
('VICNT', '', '', 'A', 760, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-09-28 22:29:00', '2020-09-28 23:33:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 764, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 22:59:00', '2020-10-17 23:01:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 765, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:00:00', '2020-10-18 00:04:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 766, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:03:00', '2020-10-18 00:04:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 767, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:04:00', '2020-10-18 00:07:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 768, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:05:00', '2020-10-18 00:08:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 769, 'wait', '{\"custom1\":{\"iron\":{\"quantity\":1,\"price\":1,\"name\":{\"dispatchConfig\":null,\"_targetInst\":null,\"_dispatchListeners\":null,\"_dispatchInstances\":null,\"nativeEvent\":null,\"type\":null,\"target\":null,\"eventPhase\":null,\"bubbles\":null,\"cancelable\":null,\"defaultPrevented\":null,\"isTrusted\":null}}},\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-10-17 23:06:00', '2020-10-18 00:03:00', '2.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 770, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 3, '2020-10-17 23:16:00', '2020-10-18 00:19:00', '1.95', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 771, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:24:00', '2020-10-18 00:27:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 772, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:41:00', '2020-10-17 00:44:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 773, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:42:00', '2020-10-18 00:45:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 774, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:42:00', '0000-00-00 00:00:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 775, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:43:00', '2020-10-18 00:46:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 776, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:45:00', '2020-10-18 00:48:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 777, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:46:00', '2020-10-18 00:49:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 778, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-17 23:53:00', '2020-10-18 00:55:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 779, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 2, '2020-10-17 23:59:00', '2020-10-18 00:02:00', '1.95', ' Sin pliegue'),
('VICNT', '', '', 'A', 780, 'wait', '{\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"coat\":{\"iron\":{\"quantity\":1,\"price\":1.3}}}', 2, '2020-10-18 00:01:00', '2020-10-18 01:03:00', '1.95', ' Sin pliegue'),
('VICNT', '', '', 'A', 781, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-18 00:02:00', '2020-10-18 01:05:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 782, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-18 00:02:00', '2020-10-18 01:08:00', '1.3', ' Sin plieguedadadawdadw Sin pliegue'),
('VICNT', '', '', 'A', 783, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-18 00:05:00', '2020-10-18 01:12:00', '1.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 784, 'wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65},\"wash\":{\"quantity\":1,\"price\":1}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65},\"wash\":{\"quantity\":1,\"price\":1}}}', 3, '2020-10-18 00:05:00', '2020-10-18 01:11:00', '3.4', ' Sin pliegue Sin pliegue Sin pliegue'),
('VICNT', '', '', 'A', 785, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-10-18 00:27:00', '2020-10-18 01:30:00', '1.3', 'Sin pliegue pantalón'),
('VICNT', '', '', 'A', 786, 'wait', '{\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"skirt\":{\"iron\":{\"quantity\":1,\"price\":0.65},\"wash\":{\"quantity\":1,\"price\":1}},\"shirt\":{\"wash\":{\"quantity\":1,\"price\":1}}}', 4, '2020-10-18 00:28:00', '2020-10-19 01:31:00', '3.3', ' Sin pliegue'),
('VICNT', '', '', 'A', 787, 'wait', '{\"shirt\":{\"wash\":{\"quantity\":1,\"price\":1},\"washIron\":{\"quantity\":1,\"price\":1}},\"coat\":{\"wash\":{\"quantity\":1,\"price\":1}},\"pants\":{\"washIron\":{\"quantity\":1,\"price\":1}}}', 4, '2020-10-18 00:29:00', '2020-10-18 01:33:00', '4', 'Planchar la basta del pantalón');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pricechart`
--

CREATE TABLE `pricechart` (
  `laundryInitials` varchar(6) NOT NULL,
  `iron` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`iron`)),
  `washIron` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`washIron`)),
  `wash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`wash`)),
  `dryClean` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`dryClean`)),
  `hook` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores the price of each element of a laundry';

--
-- Volcado de datos para la tabla `pricechart`
--

INSERT INTO `pricechart` (`laundryInitials`, `iron`, `washIron`, `wash`, `dryClean`, `hook`) VALUES
('CAMINO', '{}', '{}', '{}', '{}', '0.00'),
('VICNT', '{\"shirt\":0.65,\"pants\":0.65,\"skirt\":0.65,\"coat\":1.3,\"sweater\":0.65,\"pleatedSkirt\":1.3,\"overall\":1.3,\"jumper\":1.5,\"blouse\":1,\"largeSuit\":1.5,\"quilt\":8}', '{}', '{}', '{}', '0.10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `targetmarket`
--

CREATE TABLE `targetmarket` (
  `id` int(11) NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `targetmarket`
--

INSERT INTO `targetmarket` (`id`, `reason`) VALUES
(1, 'internet-advertisement'),
(2, 'internet-advertisement'),
(3, 'internet-advertisement'),
(4, 'internet-advertisement'),
(5, 'internet-advertisement'),
(6, 'Escoge una opción'),
(7, 'Escoge una opción'),
(8, 'Escoge una opción'),
(9, 'none'),
(10, 'none'),
(11, 'none'),
(12, 'none'),
(13, 'social-media'),
(14, 'internet-advertisement'),
(15, 'real-advertisement'),
(16, 'internet-advertisement'),
(17, 'internet-advertisement'),
(18, ''),
(19, ''),
(20, ''),
(21, ''),
(22, ''),
(23, 'social-media'),
(24, 'internet-advertisement'),
(25, 'people-recommendation'),
(26, ''),
(27, ''),
(28, ''),
(29, ''),
(30, ''),
(31, ''),
(32, ''),
(33, ''),
(34, ''),
(35, ''),
(36, 'social-media'),
(37, 'internet-advertisement'),
(38, 'internet-advertisement');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(6) NOT NULL,
  `hashcode` text NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `accountVerified` text NOT NULL COMMENT 'Check that the user has verified the email.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='MAIN';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `hashcode`, `name`, `surname`, `email`, `password`, `accountVerified`) VALUES
('GUQ13', 'QTEBQqu9zz5G9e8Ir9DC', 'Robert', 'Lu Zheng', 'wardinpro123@gmail.com', '$2y$12$v61fhL2sZcS5JU4ZOROaAud1tMDJJQZGUPH.MZCIAVIP1QiTtCWuC', ''),
('XKN78', '7YV3BHTck52yv4Om4zgA', 'Robert', 'Lu Zheng', 'robert_lu20@hotmail.com', '$2y$12$fdiFVpNjQBhMqhH4dfRJmOM25pQlCEeoWuoXnMpLdfu9KMz97IKDO', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `custommessages`
--
ALTER TABLE `custommessages`
  ADD PRIMARY KEY (`laundryInitials`,`id`);

--
-- Indices de la tabla `lastorderid`
--
ALTER TABLE `lastorderid`
  ADD PRIMARY KEY (`laundryInitials`);

--
-- Indices de la tabla `laundries`
--
ALTER TABLE `laundries`
  ADD PRIMARY KEY (`initials`,`hashcode`,`email`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`laundryInitials`,`idChar`,`idNumber`);

--
-- Indices de la tabla `pricechart`
--
ALTER TABLE `pricechart`
  ADD PRIMARY KEY (`laundryInitials`);

--
-- Indices de la tabla `targetmarket`
--
ALTER TABLE `targetmarket`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `targetmarket`
--
ALTER TABLE `targetmarket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
