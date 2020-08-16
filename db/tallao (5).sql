-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-08-2020 a las 07:51:28
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
  `colortag` text NOT NULL COMMENT 'Specifies the background color of the tag',
  `tag` text NOT NULL,
  `message` text NOT NULL,
  `status` text NOT NULL COMMENT 'Shows if it''s removable or not.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Will store all the custom fast messages that superuser need';

--
-- Volcado de datos para la tabla `custommessages`
--

INSERT INTO `custommessages` (`laundryInitials`, `id`, `colortag`, `tag`, `message`, `status`) VALUES
('CRUC2', 'CRUC21', 'white', 'Sin pliegue / 不折', 'Sin pliegue', 'blocked'),
('VICAT', 'VICAT1', 'white', 'Sin pliegue / 不折', 'Sin pliegue', 'blocked'),
('VICNT', 'VICNT2', '#EBAB28', 'Sin pliegue', 'Sin pliegue', '');

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
('VICNT', 'A', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laundries`
--

CREATE TABLE `laundries` (
  `initials` varchar(6) NOT NULL,
  `hashcode` text NOT NULL,
  `name` text NOT NULL,
  `location` text NOT NULL,
  `schedule` text NOT NULL,
  `serviceOffer` text NOT NULL,
  `legalreprName` text NOT NULL,
  `legalreprLastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `laundries`
--

INSERT INTO `laundries` (`initials`, `hashcode`, `name`, `location`, `schedule`, `serviceOffer`, `legalreprName`, `legalreprLastname`, `email`, `password`) VALUES
('', 'TeTWbE9JXz9vM8UzErAl', 'Lavandería Los Caobos', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Yeyo ', 'Clack ', 'yeyo@clack.com', '$2y$12$1.XD0YNu3OePr4p5E2Zrq.ZRq9MVtYXsbOePlcdHfrKm/dod0223S'),
('CRUC2', 'boPiwN5TrarZWYO0w80j', 'Lavandería El Cruce #2312', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Yeyo ', 'Fren ', 'yeyo@fren.com', '$2y$12$C3fNiM1.bVGF5e.qs5TBgunNZuG.31rUJfA636XqKlOYBpLHHgBA2'),
('VICAT', 'XyLc6PHXgAREDy9FZtQ7', 'Lavandería Vicente #2', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Robert ', 'Lu Zheng ', 'robert_lu20@hotmail.com', '$2y$12$duBXbwmPwP87cWTQpjAXDeA3ioqmjSS9vshKoIlJYN4ghwNuhHx.i'),
('VICNT', '8XMqSGzajxRRQiyLZj8m', 'Lavandería Vicente', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', 'monday/8:00*AM-8:30*PM,tuesday/8:00*AM-8:30*PM,wednesday/8:00*AM-8:30*PM,thursday/8:00*AM-8:30*PM,friday/8:00*AM-3:00*PM,saturday/8:00*AM-8:30*PM,sunday/8:00*AM-8:30*PM', 'iron,washiron,wash,dryclean', 'Robert ', 'Lu Zheng ', 'wardinpro123@gmail.com', '$2y$12$6B2W38vJ5y5hFN75BSBEsuZMyWdhaCx/9eQAcrxM//abvAR6KTUxO');

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
  `totalprice` text NOT NULL,
  `indications` text NOT NULL COMMENT 'Text in which the user specifies some specific order to be done.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores the orders data';

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`laundryInitials`, `customerID`, `customerName`, `idChar`, `idNumber`, `status`, `elementsDetails`, `hookQuantity`, `dateReceive`, `dateAssign`, `totalprice`, `indications`) VALUES
('VICNT', '', '', 'A', 2, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 3, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 4, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 5, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 6, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 7, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 8, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 9, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 10, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'A', 11, 'status-wait', '{\"shirt\":{\"iron\":{\"quantity\":1,\"price\":0.65}},\"pants\":{\"iron\":{\"quantity\":1,\"price\":0.65}}}', 2, '2020-08-14 21:34:00', '2020-08-15 22:39:00', '1.3', ' Sin pliegue');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pricechart`
--

CREATE TABLE `pricechart` (
  `laundryInitials` text NOT NULL,
  `iron` text NOT NULL,
  `wash` text NOT NULL,
  `washiron` text NOT NULL,
  `dryclean` text NOT NULL,
  `hook` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table to store the data of the prices';

--
-- Volcado de datos para la tabla `pricechart`
--

INSERT INTO `pricechart` (`laundryInitials`, `iron`, `wash`, `washiron`, `dryclean`, `hook`) VALUES
('8XMqSGzajxRRQiyLZj8m', 'shirt=0.65,pants=0.65,skirt=0.65,coat=1.30,sweater=0.65,pleatedSkirt=1.30,overall=1.30,jumper=1.50,blouse=1.00,largeSuit=1.75,quilt=8.00', '', 'shirt=1.50,pants=1.50,skirt=1.50,coat=3.5,sweater=1.5,pleatedSkirt=4,overall=2.5,jumper=3,blouse=2,largeSuit=5,quilt=8', '', '0.10'),
('11bx2Vousqzzu4QV13ia', '', '', '', '', ''),
('hBpNXOiqeYB9pW1sXURM', '', '', '', '', ''),
('PZFswEZnDH6eEPJ0ZXW7', '', '', '', '', ''),
('VwuiIEd74WMUPPNLRrgu', '', '', '', '', ''),
('XyLc6PHXgAREDy9FZtQ7', '', '', '', '', ''),
('boPiwN5TrarZWYO0w80j', '', '', '', '', ''),
('TeTWbE9JXz9vM8UzErAl', '', '', '', '', '');

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
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `accountVerified` text NOT NULL COMMENT 'Check that the user has verified the email.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='MAIN';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `hashcode`, `name`, `lastname`, `email`, `password`, `accountVerified`) VALUES
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
  ADD PRIMARY KEY (`initials`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`laundryInitials`,`idChar`,`idNumber`);

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
