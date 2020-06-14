-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2020 a las 06:41:53
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
  `laundryInitials` text NOT NULL,
  `id` text NOT NULL COMMENT 'id of the message',
  `colortag` text NOT NULL COMMENT 'Specifies the background color of the tag',
  `tag` text NOT NULL,
  `message` text NOT NULL,
  `status` text NOT NULL COMMENT 'Shows if it''s removable or not.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Will store all the custom fast messages that superuser need';

--
-- Volcado de datos para la tabla `custommessages`
--

INSERT INTO `custommessages` (`laundryInitials`, `id`, `colortag`, `tag`, `message`, `status`) VALUES
('VICNT', 'VICNT1', '#DCA2E8', 'Buenos día123', 'Buenos díaas!', ''),
('VICAT', 'VICAT1', 'white', 'Sin pliegue / 不折', 'Sin pliegue', 'blocked');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `laundryInitials` text NOT NULL,
  `customerID` text NOT NULL,
  `customerName` text NOT NULL,
  `id` text NOT NULL,
  `status` text NOT NULL COMMENT 'Show the state of the order',
  `elementsQuantity` text NOT NULL,
  `elementsPrice` text NOT NULL,
  `hookQuantity` int(11) NOT NULL,
  `dateReceive` datetime NOT NULL COMMENT 'Format: Y-M-D 24h',
  `dateAssign` datetime NOT NULL COMMENT 'Format: Y-M-D 24h',
  `totalprice` text NOT NULL,
  `indications` text NOT NULL COMMENT 'Text in which the user specifies some specific order to be done.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores the orders data';

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`laundryInitials`, `customerID`, `customerName`, `id`, `status`, `elementsQuantity`, `elementsPrice`, `hookQuantity`, `dateReceive`, `dateAssign`, `totalprice`, `indications`) VALUES
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-36', 'status-wait', 'shirt-iron=1,pants-iron=1', 'shirt-iron=0.65,pants-iron=0.65', 2, '2020-05-13 00:00:00', '2020-05-16 00:01:00', '1.3', ' FLASH'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-37', 'status-wait', 'shirt-iron=1,overall-iron=1', 'shirt-iron=0.65,overall-iron=1.3', 2, '2020-05-21 22:00:00', '2020-05-23 22:24:00', '1.95', ' Buenos díaas!'),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-38', 'status-wait', 'pants-iron=1,custom1-iron*Colcha*Pantalón con pliegue=1', 'pants-iron=0.65,custom1-iron*Colcha*Pantalón con pliegue=1.5', 2, '2020-05-21 22:00:00', '2020-05-29 14:23:00', '2.15', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-39', 'status-wait', 'pants-iron=1,skirt-iron=1', 'pants-iron=0.65,skirt-iron=0.65', 2, '2020-05-24 21:00:00', '2020-05-29 21:45:00', '1.3', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-40', 'status-wait', 'pants-iron=1,pleatedSkirt-iron=1,blouse-iron=1', 'pants-iron=0.65,pleatedSkirt-iron=1.3,blouse-iron=1', 3, '2020-05-24 21:00:00', '2020-05-29 16:44:00', '2.95', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-41', 'status-wait', 'jumper-iron=1,quilt-iron=1', 'jumper-iron=1.5,quilt-iron=8', 2, '2020-05-24 21:00:00', '2020-06-06 15:44:00', '9.5', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-42', 'status-wait', 'jumper-iron=3', 'jumper-iron=1.5', 3, '2020-05-24 21:00:00', '2020-07-01 21:46:00', '4.5', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-43', 'status-wait', 'shirt-iron=15,pants-iron=1', 'shirt-iron=0.65,pants-iron=0.65', 16, '2020-05-24 21:00:00', '2020-05-28 21:50:00', '10.4', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-44', 'status-wait', 'pants-iron=1,skirt-iron=1', 'pants-iron=0.65,skirt-iron=0.65', 2, '2020-05-24 21:00:00', '2020-05-29 21:49:00', '1.3', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-45', 'status-wait', 'pants-iron=1', 'pants-iron=0.65', 1, '2020-05-24 21:00:00', '2020-05-29 21:49:00', '0.65', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-46', 'status-wait', 'coat-iron=1,sweater-iron=1', 'coat-iron=1.3,sweater-iron=0.65', 2, '2020-05-24 21:00:00', '2020-06-05 21:49:00', '1.95', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-47', 'status-wait', 'skirt-washiron=1,coat-washiron=1', 'skirt-washiron=1.5,coat-washiron=3.5', 2, '2020-05-24 21:00:00', '2020-05-30 21:48:00', '5', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-48', 'status-wait', 'skirt-washiron=1,pleatedSkirt-washiron=1', 'skirt-washiron=1.5,pleatedSkirt-washiron=4', 2, '2020-05-24 21:00:00', '2020-06-06 12:46:00', '5.5', ''),
('VICNT', 'GUQ13', 'Robert Lu Zheng', 'B-49', 'status-wait', 'coat-washiron=1,overall-washiron=1', 'coat-washiron=3.5,overall-washiron=2.5', 2, '2020-05-24 21:00:00', '2020-06-06 23:47:00', '6', ''),
('VICNT', 'GUQ13', 'Robert  Lu Zheng ', 'B-50', 'status-wait', 'shirt-iron=1', 'shirt-iron=0.65', 1, '2020-05-31 00:00:00', '2020-06-04 01:43:00', '0.65', ''),
('VICNT', 'GUQ13', 'Robert  Lu Zheng ', 'B-51', 'status-wait', 'pants-iron=1,shirt-iron=1', 'pants-iron=0.65,shirt-iron=0.65', 2, '2020-05-31 00:00:00', '2020-06-04 01:47:00', '1.3', ' Buenos díaas!'),
('VICNT', 'GUQ13', 'Robert  Lu Zheng ', 'B-52', 'status-wait', 'shirt-iron=1,pants-iron=1', 'shirt-iron=0.65,pants-iron=0.65', 2, '2020-05-31 00:00:00', '2020-06-04 01:49:00', '1.3', ''),
('VICNT', 'GUQ13', 'Robert  Lu Zheng ', 'B-53', 'status-wait', 'shirt-iron=1,pants-iron=1', 'shirt-iron=0.65,pants-iron=0.65', 2, '2020-05-31 00:00:00', '2020-06-04 01:50:00', '1.3', ''),
('VICNT', 'none', 'none', 'B-54', 'status-wait', 'pants-iron=1,shirt-iron=1,coat-iron=1,skirt-iron=1', 'pants-iron=0.65,shirt-iron=0.65,coat-iron=1.3,skirt-iron=0.65', 4, '2020-06-10 00:00:00', '2020-06-12 13:49:00', '3.25', ''),
('VICNT', 'none', 'none', 'B-55', 'status-wait', 'coat-iron=1,sweater-iron=1', 'coat-iron=1.3,sweater-iron=0.65', 2, '2020-06-11 21:00:00', '2020-06-13 22:31:00', '1.95', ''),
('VICNT', 'none', 'none', 'B-56', 'status-wait', 'shirt-iron=1,pants-iron=1', 'shirt-iron=0.65,pants-iron=0.65', 2, '2020-06-12 22:00:00', '2020-06-13 23:48:00', '1.3', ' Buenos díaas!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pricechart`
--

CREATE TABLE `pricechart` (
  `hashcode` text NOT NULL,
  `iron` text NOT NULL,
  `wash` text NOT NULL,
  `washiron` text NOT NULL,
  `dryclean` text NOT NULL,
  `hook` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table to store the data of the prices';

--
-- Volcado de datos para la tabla `pricechart`
--

INSERT INTO `pricechart` (`hashcode`, `iron`, `wash`, `washiron`, `dryclean`, `hook`) VALUES
('8XMqSGzajxRRQiyLZj8m', 'shirt=0.65,pants=0.65,skirt=0.65,coat=1.30,sweater=0.65,pleatedSkirt=1.30,overall=1.30,jumper=1.50,blouse=1.00,largeSuit=1.75,quilt=8.00', '', 'shirt=1.50,pants=1.50,skirt=1.50,coat=3.5,sweater=1.5,pleatedSkirt=4,overall=2.5,jumper=3,blouse=2,largeSuit=5,quilt=8', '', '0.10'),
('11bx2Vousqzzu4QV13ia', '', '', '', '', ''),
('hBpNXOiqeYB9pW1sXURM', '', '', '', '', ''),
('PZFswEZnDH6eEPJ0ZXW7', '', '', '', '', ''),
('VwuiIEd74WMUPPNLRrgu', '', '', '', '', ''),
('XyLc6PHXgAREDy9FZtQ7', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superusers`
--

CREATE TABLE `superusers` (
  `initials` text NOT NULL,
  `hashcode` text NOT NULL,
  `laundryName` text NOT NULL,
  `location` text NOT NULL,
  `schedule` text NOT NULL,
  `serviceOffer` text NOT NULL,
  `legalreprName` text NOT NULL,
  `legalreprLastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `lastReceiptID` text NOT NULL COMMENT 'Shows the last receipt id in which will be the point reference to the next receipt id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `superusers`
--

INSERT INTO `superusers` (`initials`, `hashcode`, `laundryName`, `location`, `schedule`, `serviceOffer`, `legalreprName`, `legalreprLastname`, `email`, `password`, `lastReceiptID`) VALUES
('VICNT', '8XMqSGzajxRRQiyLZj8m', 'Lavandería Vicente', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', 'monday/8:00*AM-8:30*PM,tuesday/8:00*AM-8:30*PM,wednesday/8:00*AM-8:30*PM,thursday/8:00*AM-8:30*PM,friday/8:00*AM-3:00*PM,saturday/8:00*AM-8:30*PM,sunday/8:00*AM-8:30*PM', 'iron,washiron,wash,dryclean', 'Robert ', 'Lu Zheng ', 'wardinpro123@gmail.com', '$2y$12$6B2W38vJ5y5hFN75BSBEsuZMyWdhaCx/9eQAcrxM//abvAR6KTUxO', 'B-56'),
('VICAT', 'XyLc6PHXgAREDy9FZtQ7', 'Lavandería Vicente #2', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', '', 'Robert ', 'Lu Zheng ', 'robert_lu20@hotmail.com', '$2y$12$duBXbwmPwP87cWTQpjAXDeA3ioqmjSS9vshKoIlJYN4ghwNuhHx.i', '');

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
(37, 'internet-advertisement');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` text NOT NULL,
  `hashcode` text NOT NULL,
  `name` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `orders` text NOT NULL COMMENT 'These are the receipts id that the user is affiliated to',
  `accountVerified` text NOT NULL COMMENT 'Check that the user has verified the email.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='MAIN';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `hashcode`, `name`, `lastname`, `email`, `password`, `orders`, `accountVerified`) VALUES
('GUQ13', 'QTEBQqu9zz5G9e8Ir9DC', 'Robert ', 'Lu Zheng ', 'wardinpro123@gmail.com', '$2y$12$v61fhL2sZcS5JU4ZOROaAud1tMDJJQZGUPH.MZCIAVIP1QiTtCWuC', 'B-12,B-13,B-14,B-15,B-16,B-17,B-50,B-51,B-52,B-53', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `targetmarket`
--
ALTER TABLE `targetmarket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `targetmarket`
--
ALTER TABLE `targetmarket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
